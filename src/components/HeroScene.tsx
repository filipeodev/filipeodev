"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Pulse = { from: number; to: number; t: number; speed: number };

export default function HeroScene({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const startRef = useRef<() => void>(undefined);

  // pausa e retoma sem recriar a cena
  useEffect(() => {
    pausedRef.current = paused;
    if (!paused) startRef.current?.();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const group = new THREE.Group();
    scene.add(group);
    const accent = new THREE.Color(0x34d399);

    // vértices e arestas únicas da esfera de nós
    const geo = new THREE.IcosahedronGeometry(1.9, 1);
    const pos = geo.attributes.position;
    const verts: THREE.Vector3[] = [];
    const seen = new Map<string, number>();
    const vid = (i: number) => {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      const k = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
      let id = seen.get(k);
      if (id === undefined) {
        id = verts.length;
        verts.push(v);
        seen.set(k, id);
      }
      return id;
    };
    const edgeKeys = new Set<string>();
    const edges: [number, number][] = [];
    for (let i = 0; i < pos.count; i += 3) {
      const t = [vid(i), vid(i + 1), vid(i + 2)];
      for (let j = 0; j < 3; j++) {
        const a = t[j];
        const b = t[(j + 1) % 3];
        const k = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (!edgeKeys.has(k)) {
          edgeKeys.add(k);
          edges.push([a, b]);
        }
      }
    }
    const neighbors: number[][] = verts.map(() => []);
    edges.forEach(([a, b]) => {
      neighbors[a].push(b);
      neighbors[b].push(a);
    });

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(edges.flatMap(([a, b]) => [...verts[a].toArray(), ...verts[b].toArray()]), 3),
    );
    const lineMat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.4 });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // nós que pulsam, cada um com sua fase
    const nodeGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: accent });
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, verts.length);
    const phases = verts.map(() => Math.random() * Math.PI * 2);
    group.add(nodes);

    // pulsos de dados que andam pelas arestas
    const pulseCount = 10;
    const pulseGeo = new THREE.SphereGeometry(0.035, 10, 10);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xd1fae5 });
    const pulseMesh = new THREE.InstancedMesh(pulseGeo, pulseMat, pulseCount);
    const newPulse = (from: number): Pulse => {
      const n = neighbors[from];
      return { from, to: n[Math.floor(Math.random() * n.length)], t: 0, speed: 0.35 + Math.random() * 0.5 };
    };
    const pulses: Pulse[] = Array.from({ length: pulseCount }, () => {
      const p = newPulse(Math.floor(Math.random() * verts.length));
      p.t = Math.random();
      return p;
    });
    group.add(pulseMesh);

    // forma interna que gira ao contrário
    const innerGeo = new THREE.IcosahedronGeometry(0.9, 0);
    const innerWire = new THREE.WireframeGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
    const inner = new THREE.LineSegments(innerWire, innerMat);
    group.add(inner);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.x = w > 900 ? -2.2 : 0;
      camera.updateProjectionMatrix();
      if (!running) renderer.render(scene, camera);
    };

    const clock = new THREE.Clock();
    const m = new THREE.Matrix4();
    const p3 = new THREE.Vector3();
    const q = new THREE.Quaternion();
    const s3 = new THREE.Vector3();
    let time = 0;
    let raf = 0;
    let running = false;
    let visible = true;

    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      time += dt;

      group.rotation.y = time * 0.14 + mouse.x * 0.25;
      group.rotation.x = Math.sin(time * 0.2) * 0.1 + mouse.y * 0.15;
      group.scale.setScalar(1 + Math.sin(time * 0.8) * 0.025);
      inner.rotation.y = -time * 0.3;
      inner.rotation.x = time * 0.15;

      for (let i = 0; i < verts.length; i++) {
        const k = 1 + 0.25 * Math.sin(time * 1.6 + phases[i]);
        m.compose(verts[i], q, s3.setScalar(k));
        nodes.setMatrixAt(i, m);
      }
      nodes.instanceMatrix.needsUpdate = true;

      pulses.forEach((p, i) => {
        p.t += dt * p.speed;
        if (p.t >= 1) Object.assign(p, newPulse(p.to));
        p3.lerpVectors(verts[p.from], verts[p.to], p.t);
        m.compose(p3, q, s3.setScalar(1));
        pulseMesh.setMatrixAt(i, m);
      });
      pulseMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      running = visible && !pausedRef.current;
      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    };
    startRef.current = () => {
      if (visible) start();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !pausedRef.current) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      startRef.current = undefined;
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      [geo, lineGeo, nodeGeo, pulseGeo, innerGeo, innerWire, lineMat, nodeMat, pulseMat, innerMat].forEach((d) =>
        d.dispose(),
      );
      nodes.dispose();
      pulseMesh.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="h-full w-full" />;
}

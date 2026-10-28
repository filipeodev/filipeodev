"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const geo = new THREE.IcosahedronGeometry(1.9, 1);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.45 }),
    );
    group.add(wire);

    const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: accent });
    const count = geo.attributes.position.count;
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, count);
    const m = new THREE.Matrix4();
    const p = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      p.fromBufferAttribute(geo.attributes.position, i);
      m.setPosition(p);
      nodes.setMatrixAt(i, m);
    }
    group.add(nodes);

    const inner = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.9, 0)),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }),
    );
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
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const clock = new THREE.Clock();

    const frame = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.12 + mouse.x * 0.25;
      group.rotation.x = Math.sin(t * 0.2) * 0.1 + mouse.y * 0.15;
      inner.rotation.y = -t * 0.25;
      renderer.render(scene, camera);
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      nodes.dispose();
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      inner.geometry.dispose();
      (inner.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="h-full w-full" />;
}

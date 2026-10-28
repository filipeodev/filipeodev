# Catálogo de skills (referência)

Descrição curta e particularidades de cada skill instalada, para escolher sem abrir o `SKILL.md`. As regras de escolha, as skills fixas e a tabela de gatilhos ficam em `SKILLS-ROTACAO.md`.

Marketplace local: `C:\Users\Fodev.DESKTOP-S7I9U1R\skills-marketplace` (`meus-plugins`).
Chamada: `Skill` com `plugin:skill`, ou `/plugin:skill` no prompt.

## Bloco A. Geral e visão de design (Emil Kowalski, ConardLi, elayadesign)

| Skill | Particularidade (para decidir sem ler) |
|---|---|
| `emilkowalski-skills:emil-design-eng` | Skill principal dele: polimento, decisões de animação, detalhes invisíveis. Ponto de partida geral. |
| `emilkowalski-skills:animate` | Constrói animação decidindo na ordem que importa: se anima, curva, duração, propriedades. Tem `RECIPES.md`. |
| `emilkowalski-skills:animate-expo` | Mesma régua para React Native/Expo: gestos, sheets, haptics, transições de tela, movimento fora da thread JS. |
| `emilkowalski-skills:review-animations` | Revisão estrita contra regras dele. Tem `STANDARDS.md`. Só lê, não reescreve. |
| `emilkowalski-skills:improve-animations` | Auditoria do código inteiro. Gera planos priorizados e autocontidos. Tem `AUDIT.md` e `PLAN-TEMPLATE.md`. |
| `emilkowalski-skills:find-animation-opportunities` | Só leitura. Aponta o que deveria animar e rejeita o que não deve. |
| `emilkowalski-skills:animation-performance` | Orçamento de frame, propriedades só de composição, tirar movimento da main thread. |
| `emilkowalski-skills:animation-vocabulary` | Glossário reverso: descrição vaga vira termo exato do efeito. |
| `emilkowalski-skills:apple-design` | Princípios Apple (WWDC) traduzidos para web: movimento fluido e físico. |
| `emilkowalski-skills:mobile-native` | Correções de CSS e meta tags: hover preso, flash de toque, bug do 100vh, zoom de input, safe areas. |
| `emilkowalski-skills:break-ui` | Alimenta a UI com dados piores (nomes longos, e-mail sem quebra, listas vazias, contagens enormes). Tem `CATALOG.md`. |
| `emilkowalski-skills:prototype` | Gera várias versões diferentes de um componente atrás de um seletor visual. Tem `PICKER.md`. |
| `emilkowalski-skills:pick-ui-library` | Lista opinada de bibliotecas (números, OTP, gráficos etc.) para não improvisar nem instalar pacote abandonado. |
| `emilkowalski-skills:ask-sonner` | Guia da lib de toast Sonner: setup, `toast()`, promise, estilo, problemas comuns. |
| `emilkowalski-skills:write-swift` | Swift moderno: value types, concorrência do Swift 6, generics, Swift Testing. |
| `web-design-engineer:web-design-engineer` | Artefato visual de alto acabamento (páginas, dashboards, protótipos, slides). Verifica fatos antes de projetar. Tem 27 receitas de estilo em `references/style-recipes/`, guia de crítica e QA no navegador. Não serve para back-end, CLI nem vídeo narrado. |
| `web-video-presentation:web-video-presentation` | Artigo/roteiro vira apresentação 16:9 por clique, parecendo vídeo. Cria projeto Vite + React + TS. Áudio opcional por TTS (MiniMax/OpenAI, pede chave). Pontos de parada obrigatórios para o usuário validar. |
| `landing-page-design:landing-page-design` | Parte A: intake, estrutura, copy, SEO. Parte B: regras visuais rígidas (tipografia, espaçamento, raio, fundo, hero, ícones, movimento). Dispara sozinha em qualquer trabalho de web UI. |

## Bloco B. Páginas de conversão e produto (MengTo)

| Skill (`mengto-web-design:`) | Particularidade |
|---|---|
| `landing-page` | Landing de oferta única para SaaS/apps/serviços: estrutura e copy. |
| `pricing-page` | Página de preços: estrutura, desenho dos planos, copy, SEO/AEO. |
| `product-proof-saas` | Landing de SaaS/IA onde um fluxo, interface ou demo real é a prova. |
| `operational-enterprise-ai` | Páginas de IA corporativa, automação e segurança que explicam fronteiras do sistema. |
| `editorial-service-booking` | Sites de serviço com agendamento (salão, barbearia, spa, clínica). |
| `editorial-portfolio-chapters` | Estúdio, agência, fotógrafo, artista: o trabalho vem primeiro, em capítulos. |
| `documentary-brutalist-agency` | Agência, produtora, arquitetura, cultura: estética documental brutalista. |
| `build-awwwards-quality-sites` | Sites de marketing/editorial/portfólio ricos em movimento e com direção de arte própria. |
| `html-demo` | Mostra o app funcionando desenhado em HTML ao vivo, em janela estilo Mac, em vez de gravar vídeo. Tem scripts em `scripts/`. |
| `company-logos` | Usa logos Iconify Simple Icons (64x64) em vez de logo em texto. |
| `number-details` | Marcadores decorativos 01, 02, 03. |
| `solar-duotone-bold` | Fixa o estilo de ícone Iconify Solar Duotone Bold. |

## Bloco C. 3D e WebGL

3D puro (`mengto-3d:`). Combinam com `mengto-web-design:threejs` como base.

| Skill | Particularidade |
|---|---|
| `3d-metal-material` | PBR de metal (aço, latão, ouro, cobre, ferro) como condutor real. Traz `demo.html`. |
| `3d-wood-material` | Madeira procedural em um `MeshPhysicalMaterial`: anéis, veios, poros. |
| `3d-wood-lighting-scorecard` | Iluminação de madeira esculpida em sala escura, com pontuação de qualidade. |
| `3d-paper-material` | Papel (washi, algodão, kraft) legível de perto, com fibras. |
| `3d-cloth-material` | Tecido tecido: normal map de trama, brilho de sheen, highlights anisotrópicos. |
| `3d-high-poly-models` | Modelos detalhados: silhueta suave, chanfros, superfícies. |
| `3d-high-resolution-textures` | Texturas PBR nítidas e coerentes, densidade de texel adequada. |
| `3d-retina-resolution` | Canvas nítido em Retina/HiDPI, incluindo 200% explícito. |
| `3d-sky-background` | Céu correto para a câmera: atmosfera procedural ou panorama, névoa de horizonte. |
| `3d-sky-rays` | Raios de sol crepusculares, com oclusão pela cena. |
| `3d-ultra-realistic-water` | Oceano aberto realista (espectro Gerstner), tem `assets/ocean.mjs` e demo com build. |
| `3d-underwater-god-rays` | Raios volumétricos submersos. Tem `assets` e demo com build. |
| `3d-falling-leaves` | Folhas caindo em espaço do mundo, geometria instanciada, giro independente. |
| `3d-four-seasons` | Estados de primavera/verão/outono/inverno coordenados (folhagem, sol, céu, solo). |
| `3d-virtual-tour` | Tour virtual guiado: caminhos de câmera, salas, planta baixa. |
| `3d-orbit-inspect-demo` | Objeto inclina no hover e abre vista de inspeção no clique. |

WebGL e bibliotecas (`mengto-web-design:`):

| Skill | Particularidade |
|---|---|
| `threejs` | Base: cena, câmera, renderer, luzes, materiais. Também para depurar. |
| `build-threejs-scroll-worlds` | Um mundo 3D persistente controlado por scroll (câmera, luz, atmosfera). |
| `threejs-landscape` | Paisagem viva que fica discreta atrás do assunto (heightfield em grade polar). |
| `threejs-towers` | Arquitetura procedural que se monta, filmável. |
| `threejs-weather` | Clima (chuva, tempestade) que parece clima. |
| `webgl-3d-object` | Objeto 3D real com malha, material PBR e luzes. |
| `webgl-landing-steering` | Guiar landing pesada em WebGL para um resultado visual específico. |
| `add-mouse-driven-orbit` | Órbita e paralaxe contidas com o mouse em hero Three.js. |
| `build-wireframe-scan-reveal` | Revela geometria com varredura e malha de arame. |
| `globe-gl` | Globo 3D de dados com globe.gl. |
| `cobejs` | Globo leve interativo com cobe. |
| `globe-particles` | Visual de globo em partículas. |
| `unicorn-studio` | Embed e ajuste de animações Unicorn Studio. |
| `vantajs` | Fundos WebGL animados com Vanta.js. |
| `matterjs` | Física 2D com Matter.js. |
| `background-grid-webgl` | Grade em perspectiva WebGL com névoa de partículas. |
| `webgl-laser` | Laser vertical em tela cheia como fundo. |
| `corner-lasers` | Composição de lasers ancorada no canto. |
| `atmosphere-background` | Fundo escuro atmosférico com dobras de luz. |
| `dither-background` | Fundo monocromático com dithering Bayer e pixels grandes. |
| `liquid-metal-border` | Borda de metal líquido WebGL (pacote React `metal-fx`). |
| `fire-paper-loader` | Loader de papel queimando, shader em Worker/OffscreenCanvas. |

## Bloco D. Scroll, movimento e interação (MengTo)

| Skill (`mengto-web-design:`) | Particularidade |
|---|---|
| `gsap` | Uso e depuração de GSAP: timelines, ScrollTrigger, stagger. |
| `gsap-scrolltrigger-storytelling` | Storytelling de produto com seções fixas e reveals progressivos. |
| `cinematic-gsap-lenis-motion-system` | Sistema de movimento cinematográfico com GSAP, ScrollTrigger e Lenis. Luxo/editorial. |
| `cinematic-scroll-storytelling` | Landing cinematográfica com Lenis, ScrollTrigger e progresso ligado ao scroll. |
| `scroll-world-storytelling` | Transforma artigo/case/jornada em landing por scroll. |
| `horizontal-scroll-scenes` | Capítulos avançando da esquerda para a direita enquanto o scroll é vertical. |
| `scroll-scrubbed-visual-sequence` | Transformação visual reversível ligada ao progresso do scroll. |
| `scroll-scrubbed-word-reveal` | Texto revelado palavra a palavra conforme o scroll, preservando links e semântica. |
| `scroll-progress-timeline` | Linha do tempo guiada por dados, com preenchimento de progresso. |
| `animation-on-scroll` | Gatilho simples com IntersectionObserver e classes Tailwind. |
| `animation-systems` | Princípios de movimento de produto (Stripe, Linear, Apple, Vercel). |
| `masked-reveal` | Reveal de palavras com máscara e stagger no scroll (GSAP). |
| `staggered-word-reveal` | Reveal sutil palavra a palavra, uma vez ao entrar. |
| `marquee-loop` | Marquee infinito contínuo com itens duplicados. |
| `paper-cinder-transition` | Transição de página/cena com linha de brasa de papel queimando. |
| `reveal-hover-effect` | Spotlight que segue o cursor e revela segunda imagem. |
| `shaders-cursor-ripples` | Distorção fluida WebGPU que segue o cursor sobre imagem. |
| `add-shader-cursor-trail` | Rastro de cursor em meio-tom WebGPU. Tem `verify-cursor-trail.mjs`. |
| `pointer-trail-emitter` | Rastro de cursor com espaçamento constante em qualquer velocidade. |
| `build-interactive-particle-trail` | Partículas por cursor/toque emitidas por distância, reciclando buffer GPU. |
| `ambient-section-particles` | Atmosfera de partículas contida em uma seção. |
| `falling-leaves` | Folhas caindo em 2D que parecem folhas. |
| `gooey-blob-system` | Formas que se fundem em um fluido (filtros SVG). |
| `beam-glow-states` | Estados de loading/foco/seleção com brilho em feixe (`border-beam`). |
| `thinking-orbs` | Indicadores animados de IA e status de agente, acessíveis. |
| `progressive-blur` | Blur progressivo em camadas com backdrop-filter. |

## Bloco E. Estilo visual / design system (usar só 1 por entrega)

Cada uma define um sistema completo (cores, formas, tipografia, atmosfera). Escolha pelo clima pedido.

| Skill (`mengto-web-design:`) | Clima |
|---|---|
| `clean-minimal-beige-light-mode` | Claro, bege quente, discreto. |
| `light-mode-paper-technical` | Claro, papel quente, moldura escura, técnico. |
| `orange-clean-paper-saas` | Papel, acento laranja, SaaS arredondado. |
| `blue-cloudy-clean-modern` | Claro, céu azul luminoso, nuvens suaves. |
| `dark-blue-contrasting-clean` | Escuro azul, alto contraste, blocos cobalto. |
| `mesh-gradient-dark-blue-clean` | Escuro azul com mesh gradient, futurista. |
| `blue-laser-clean-glass-layout` | Vidro escuro com laser azul fino. |
| `dark-glass-clean-layout` | Vidro fosco escuro, workspace em colunas. |
| `glass-dark-ui` | Glassmorphism escuro legível (pseudo-elemento). |
| `glass-dark-mode-clock` | Vidro escuro com mostradores circulares. |
| `dither-laser-dark-mode` | Quase preto, dither e laser fino. |
| `bright-green-tech-system-webgl` | Verde vivo, técnico, splits, superfícies emolduradas. |
| `tech-green-dark-mode-modern` | Escuro preto fosco, acento esmeralda, mono. |
| `funky-purple-container-tech` | Escuro, fúcsia/roxo, contêineres em camadas. |
| `framed-tech-dark-border-gradient` | Escuro técnico, bordas em gradiente, grade assimétrica. |
| `high-contrast-skeuomorphic-clean` | Esqueuomorfismo limpo, alto contraste, tátil. |
| `skeuomorphic-ui` | Superfícies esqueuomórficas com sombras internas e externas. |
| `technical-wireframe-info-layout` | Wireframe monocromático, 3D explodido, anotações. |
| `split-layout-technical` | Tela dividida técnica, metadados mono. |
| `book-serif-index` | Leitor de livro de arquivo, serifa, papel envelhecido. |
| `editorial-tech` | Revista editorial com detalhe técnico de produto. |
| `agency-grid-layout-minimal` | Agência minimalista, grade editorial, tipografia enorme. |
| `nested-container-clean-agency` | Agência com contêineres aninhados e casca editorial. |
| `image-first-grid-layout` | Grade guiada por fotografia de sangria total. |

## Bloco F. Peças de CSS e layout (combinam com qualquer estilo)

| Skill (`mengto-web-design:`) | Particularidade |
|---|---|
| `tailwindcss` | Layout, tipografia, responsivo, tema e padrões de componente em Tailwind. |
| `beautiful-shadows` | Sombras em camadas, utilitários arbitrários do Tailwind. |
| `css-border-gradient` | Borda em gradiente sutil para cards, preços, nav, modais. |
| `css-alpha-masking` | Fade de borda com `mask-image` (inclui `-webkit-`). |
| `corner-diagonals` | Cantos chanfrados em botões, cards e painéis. |
| `container-lines` | Linhas-guia verticais com mini quadrados de canto. |
| `framed-grid-layout` | Grade minimalista com linhas finas e colchetes de canto. |
| `nested-container-frames` | Contêiner dentro de contêiner com molduras visíveis. |

## Bloco G. Home Assistant (skill escrita localmente)

| Skill | Particularidade |
|---|---|
| `prism-dashboard:prism-dashboard` | Dashboards Home Assistant (YAML Lovelace) com os cards `custom:prism-*` do repo BangerTech/Prism-Dashboard: termostato, luz, persiana, aspirador, mídia, calendário, energia solar, impressoras 3D (Bambu, Creality, Klipper), sidebar e navegação. Não serve para web/React. Pede HACS com Mushroom, card-mod, layout-card, kiosk-mode, mini-graph-card, browser_mod. Tem `references/cards.md` com as chaves de cada card. Skill escrita por mim a partir do README, não vem pronta no repo. |

## Não instaladas

`better-writing`, `explain-interface`, `state-machine`, `teardown`, `variant`, `break` (repo `jakubkrehel/skills`) estão no cache do plugin `better-design`, mas fora da lista `skills` do plugin. Se aparecerem registradas, trate como não pertencentes ao pacote.

Outras categorias do repo `MengTo/Skills` não instaladas: `ui`, `media`, `workflow`, `illustration`, `codex`, `game-*`.
Skill irmã não instalada: `redesign-existing-projects` (`elayadesign/redesign-skill`).

Última revisão do catálogo: 2026-10-27.

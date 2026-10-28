# Rotação de skills de design/front-end

Protocolo de escolha de skills: fixas, gatilhos e regras de combinação. O detalhe de cada skill está em `SKILLS-CATALOGO.md`. Invoque só a skill escolhida e deixe o `SKILL.md` dela carregar apenas quando for usada.

Marketplace local: `C:\Users\Fodev.DESKTOP-S7I9U1R\skills-marketplace` (nome `meus-plugins`).
Chamada: `Skill` com `plugin:skill`, ou `/plugin:skill` no prompt.

## Protocolo (copiar para o prompt)

1. Classifique o pedido: **construir**, **revisar**, **animar**, **3D**, **estilo visual**, **conversão (copy/página)** ou **apresentação**.
2. Aplique o bloco **FIXAS** da fase correspondente (sempre).
3. Escolha de **0 a 3 skills ROTATIVAS** pela tabela de gatilhos. Nunca mais de 3 por tarefa.
4. Invoque só as escolhidas. Não leia nem liste as demais.
5. Regra de exclusão: no máximo **1 skill de estilo visual** (bloco E) por entrega. Elas definem design systems completos e se contradizem.
6. Ao terminar, rode a fixa de revisão da fase (bloco FIXAS) antes de dizer que está pronto.
7. Se nenhuma rotativa servir, siga só com as fixas. Não force skill.

Gatilho curto para colar no pedido: `Use o protocolo de SKILLS-ROTACAO.md`.

## FIXAS (sempre, por fase)

Plugin `better-design` (6 skills, chamadas `better-design:<nome>`). São o piso de qualidade.

| Fase | Skill fixa | Particularidade |
|---|---|---|
| Qualquer UI nova | `better-design:better-layout` | Agrupamento, alinhamento, ordem de leitura, estrutura responsiva, espaço para texto traduzido. Tem `spacing-and-adaptivity`. |
| Qualquer UI com texto | `better-design:better-typography` | Escala tipográfica, espaçamento, features de fonte, quebra e truncamento, pontuação. |
| Qualquer UI com cor | `better-design:better-colors` | Gera paleta, nomeia tokens semânticos, converte formatos, mede contraste. |
| Qualquer UI interativa | `better-design:better-accessibility` | Teclado e foco, ARIA, nomes acessíveis, formulários, leitor de tela, movimento reduzido, zoom, áreas de toque. |
| Acabamento e movimento | `better-design:better-ui` | Valores exatos de raio, alinhamento óptico, sombras, estados de ícone, enter/exit, performance de animação. |
| Revisar tela/fluxo inteiro | `better-design:better-interface` | Orquestra as 5 acima e define o formato do relatório. Use como revisão final. |
| Revisar diff/PR/branch | `interface-review:interface-review` | Só chamada manual (`disable-model-invocation`). Revisa o que a mudança introduziu ou regrediu. Entrega no formato do `better-interface`. |
| Implementar a partir de design | `build-design:build-design` | Figma ou imagem como fonte de verdade. Usa tokens e componentes do projeto. Compara o resultado com o design antes de concluir. Detalhes de Figma em `figma.md`. |

Combinações fixas por fase:
- **Construir:** `build-design` (se houver Figma/imagem) → `better-layout` + `better-typography` + `better-colors` → `better-ui`.
- **Revisar tela:** `better-interface`.
- **Revisar PR:** `interface-review`.
- **Fechar entrega:** `better-accessibility` sempre.

## ROTATIVAS: tabela de gatilhos

Descrição e particularidade de cada skill: `SKILLS-CATALOGO.md` (blocos A a F). Consulte só a linha da skill candidata, não o arquivo inteiro.

Pedido contém → candidatas (escolha as mais específicas).

| Gatilho no pedido | Skills candidatas |
|---|---|
| animação do zero (web) | `emilkowalski-skills:animate` |
| animação React Native/Expo | `emilkowalski-skills:animate-expo` |
| animação travando, fps | `emilkowalski-skills:animation-performance` |
| revisar animação existente | `emilkowalski-skills:review-animations` |
| auditar animações do projeto | `emilkowalski-skills:improve-animations` |
| onde falta animação | `emilkowalski-skills:find-animation-opportunities` |
| descrever efeito de movimento sem saber o nome | `emilkowalski-skills:animation-vocabulary` |
| GSAP, ScrollTrigger | `mengto-web-design:gsap` |
| movimento de produto estilo Stripe/Linear | `mengto-web-design:animation-systems` |
| scroll storytelling | ver bloco D |
| 3D, Three.js | ver bloco C |
| landing page | `landing-page-design:landing-page-design`; para copy/seções também `mengto-web-design:landing-page` |
| página de preços | `mengto-web-design:pricing-page` |
| estilo visual, "deixar bonito", direção de arte | bloco E (só 1) ou `web-design-engineer:web-design-engineer` |
| celular, mobile web | `emilkowalski-skills:mobile-native` |
| testar com dados extremos | `emilkowalski-skills:break-ui` |
| comparar versões de um componente | `emilkowalski-skills:prototype` |
| escolher biblioteca de UI | `emilkowalski-skills:pick-ui-library` |
| toast / Sonner | `emilkowalski-skills:ask-sonner` |
| apresentação em formato vídeo | `web-video-presentation:web-video-presentation` |
| Swift / iOS | `emilkowalski-skills:write-swift` |
| inspiração Apple | `emilkowalski-skills:apple-design` |

## Regras de combinação (evita conflito e gasto)

- **Estilo (bloco E) é exclusivo.** `landing-page-design` e `web-design-engineer` também impõem estilo: se usar um deles como base, não some skill do bloco E sem avisar.
- **`landing-page-design` vs `mengto-web-design:landing-page`:** a primeira traz regras visuais rígidas; a segunda é estrutura e copy. Usar as duas juntas só se não houver conflito de valor. Em conflito, vale `landing-page-design`.
- **Movimento:** uma base (`animate` para microinteração; `gsap` ou `cinematic-*` para cena de scroll). Não misture `gsap` com outra lib de animação no mesmo componente.
- **3D:** `threejs` como base; `3d-*` para o material ou efeito; `3d-retina-resolution` quando houver canvas.
- **Sempre no fim:** `better-accessibility` (movimento reduzido vale para tudo que animar) e `better-interface` ou `interface-review`.
- **Peso de contexto:** só os nomes e descrições ficam carregados. O corpo da skill só entra quando ela é invocada. Por isso invoque poucas.


## Manutenção

- Adicionar skill: nova entrada no `marketplace.json` do marketplace local, `claude plugin marketplace update meus-plugins`, `claude plugin install <nome>@meus-plugins`, depois uma linha em `SKILLS-CATALOGO.md` no bloco certo e, se for fixa ou tiver gatilho novo, uma linha aqui.
- Atualizar: `claude plugin marketplace update meus-plugins` e `claude plugin update <nome>@meus-plugins`.
- Última revisão do catálogo: 2026-10-27.

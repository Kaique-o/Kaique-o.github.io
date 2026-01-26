# Kaique Oliveira (static)

## estrutura
- `index.html` (início)
- `archive/index.html` (archive)
- `article/drowning-in-delay-the-revival-of-fuzz-worship/index.html` (artigo)
- `about/index.html` (about)
- `assets/css/styles.css`
- `assets/js/*.js`
- `assets/img/*.svg` (placeholders)

## rodar local
qualquer servidor estático serve. exemplos:

### python
python -m http.server 8080

### node (npx)
npx serve .

> importante: pra canonical / sitemap, troca `https://example.com` pelo teu domínio real.

## onde mexer
- cores / tipografia: `:root` em `assets/css/styles.css`
- filtros do archive: `assets/js/archive.js` e os atributos `data-*` dos cards
- toc/progresso do artigo: `assets/js/toc.js`

## seo
- meta tags + og/twitter + json-ld em cada página
- conteúdo principal pré-renderizado (sem depender de js)
- headings sem pular níveis
- `alt` em todas as imagens

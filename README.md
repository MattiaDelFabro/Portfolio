# Mattia Del Fabro — Portfolio

Portfolio personale sviluppato in **HTML5, CSS3 e JavaScript Vanilla**, progettato secondo i principi del minimalismo tecnico ed editoriale.

## Struttura del Progetto

```text
PortfolioWebsite/
├── index.html          # Struttura semantica delle 5 sezioni (Home, Chi sono, Formazione, Foto, Contatti)
├── css/
│   └── style.css       # Design System, tipografia fluida, animazioni GPU-accelerate e Mobile Safe-Zone
├── js/
│   └── main.js         # Scroll Typography Engine, Hamburger Menu, Galleria espandibile, Lightbox e Email Anti-Scraper
└── portfolio/          # Archivio fotografico ad alta risoluzione (Hero, Ritratto e 36 scatti)
```

## Funzionalità Principali

- **Hero & Floating Navigation:** Hero a tutto schermo con menu hamburger flottante a sinistra visibile nelle sezioni interne.
- **Scroll Typography Engine:** Titoli di sezione animati a 60fps tramite `requestAnimationFrame` e variabili CSS (`translate3d` / `scale3d`).
- **Galleria Fotografica & Lightbox:** Layout Masonry a 3 colonne con anteprima sfumata delle prime 3 righe, espansione fluida *"Visualizza tutto"* e visore Lightbox a schermo intero.
- **Anti-Scraper Email Vault:** Componente contatti con offuscamento Base64 e ricomposizione runtime negli appunti (`navigator.clipboard`).

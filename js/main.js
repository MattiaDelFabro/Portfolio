/**
 * MATTIA DEL FABRO — PORTFOLIO
 * Step 1–5: Hero Reveal, Unified Scroll Typography Engine, Lightbox & Anti-Scraper Email Vault
 */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  /* --------------------------------------------------------------------------
     1. HERO REVEAL ON LOAD
     -------------------------------------------------------------------------- */
  const initHeroReveal = () => {
    const heroImg = document.querySelector('.hero__img');

    const reveal = () => {
      requestAnimationFrame(() => {
        document.body.classList.remove('is-loading');
      });
    };

    if (heroImg && !heroImg.complete) {
      heroImg.addEventListener('load', reveal, { once: true });
      heroImg.addEventListener('error', reveal, { once: true });
      setTimeout(reveal, 600);
    } else {
      setTimeout(reveal, 80);
    }
  };

  /* --------------------------------------------------------------------------
     2. UNIFIED SCROLL ENGINE (60fps GPU-Accelerated via rAF)
     -------------------------------------------------------------------------- */
  const initScrollEffects = () => {
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero__img');

    // Sezione 01: Chi sono
    const growTitle = document.querySelector('[data-scroll-grow]');
    const aboutRule = document.querySelector('.about__rule');
    const aboutImg = document.querySelector('.about__img');
    const aboutSection = document.querySelector('#chi-sono');

    // Sezione 02: Formazione
    const eduTitle = document.querySelector('[data-scroll-edu]');
    const eduRule = document.querySelector('.edu__rule');
    const eduSection = document.querySelector('#formazione');

    // Sezione 03: Foto
    const photoTitle = document.querySelector('[data-scroll-photo]');
    const photoRule = document.querySelector('.gallery__rule');
    const photoSection = document.querySelector('#foto');

    // Sezione 04: Contatti
    const contactTitle = document.querySelector('[data-scroll-contact]');
    const contactRule = document.querySelector('.contact__rule');
    const contactSection = document.querySelector('#contatti');

    if (prefersReducedMotion) {
      if (growTitle) {
        growTitle.style.setProperty('--grow-x', '0vw');
        growTitle.style.setProperty('--grow-scale', '1');
        growTitle.style.setProperty('--grow-opacity', '1');
      }
      if (aboutRule) aboutRule.style.setProperty('--rule-scale', '1');

      if (eduTitle) {
        eduTitle.style.setProperty('--edu-x', '0vw');
        eduTitle.style.setProperty('--edu-scale', '1');
        eduTitle.style.setProperty('--edu-opacity', '1');
      }
      if (eduRule) eduRule.style.setProperty('--edu-rule', '1');

      if (photoTitle) {
        photoTitle.style.setProperty('--photo-x', '0vw');
        photoTitle.style.setProperty('--photo-scale', '1');
        photoTitle.style.setProperty('--photo-opacity', '1');
      }
      if (photoRule) photoRule.style.setProperty('--photo-rule', '1');

      if (contactTitle) {
        contactTitle.style.setProperty('--contact-x', '0vw');
        contactTitle.style.setProperty('--contact-scale', '1');
        contactTitle.style.setProperty('--contact-opacity', '1');
      }
      if (contactRule) contactRule.style.setProperty('--contact-rule', '1');
      return;
    }

    let ticking = false;

    const updateOnScroll = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const isCompact = window.innerWidth <= 960;

      // A. Hero Parallax
      if (hero && heroImg) {
        const heroHeight = hero.offsetHeight;
        if (scrollY <= heroHeight) {
          const progress = scrollY / heroHeight;
          const translateY = scrollY * 0.2;
          const scale = 1.12 + progress * 0.04;
          heroImg.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        }
      }

      // B. Sezione 01 "Chi sono": scorre verso DESTRA e diventa PIÙ GRANDE
      // Su mobile/tablet (1 colonna, titolo già a sinistra) parte da 0vw per non toccare mai il bordo sinistro
      if (growTitle && aboutSection) {
        const rect = growTitle.getBoundingClientRect();
        const startY = viewportH * 0.96;
        const endY = viewportH * 0.36;
        const rawProgress = (startY - rect.top) / (startY - endY);
        const progress = clamp(rawProgress, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const moveX = (isCompact ? 0 : -14) * (1 - eased);
        const scale = 0.42 + eased * 0.58;
        const opacity = 0.2 + eased * 0.8;

        growTitle.style.setProperty('--grow-x', `${moveX.toFixed(2)}vw`);
        growTitle.style.setProperty('--grow-scale', scale.toFixed(4));
        growTitle.style.setProperty('--grow-opacity', opacity.toFixed(3));

        if (aboutRule) {
          const ruleScale = 0.12 + eased * 0.88;
          aboutRule.style.setProperty('--rule-scale', ruleScale.toFixed(4));
        }
      }

      // C. Micro-parallasse interna sull'immagine ChiSono.jpg
      if (aboutImg && aboutSection) {
        const secRect = aboutSection.getBoundingClientRect();
        if (secRect.top < viewportH && secRect.bottom > 0) {
          const centerOffset = (secRect.top + secRect.height / 2 - viewportH / 2) / viewportH;
          const imgY = centerOffset * -18;
          aboutImg.style.transform = `translate3d(0, ${imgY.toFixed(1)}px, 0)`;
        }
      }

      // D. Sezione 02 "Formazione": converge AL CENTRO e cresce
      if (eduTitle && eduSection) {
        const rect = eduTitle.getBoundingClientRect();
        const startY = viewportH * 0.96;
        const endY = viewportH * 0.40;
        const rawProgress = (startY - rect.top) / (startY - endY);
        const progress = clamp(rawProgress, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const moveX = (isCompact ? -6 : -26) * (1 - eased);
        const scale = 0.42 + eased * 0.58;
        const opacity = 0.2 + eased * 0.8;

        eduTitle.style.setProperty('--edu-x', `${moveX.toFixed(2)}vw`);
        eduTitle.style.setProperty('--edu-scale', scale.toFixed(4));
        eduTitle.style.setProperty('--edu-opacity', opacity.toFixed(3));

        if (eduRule) {
          const ruleScale = 0.1 + eased * 0.9;
          eduRule.style.setProperty('--edu-rule', ruleScale.toFixed(4));
        }
      }

      // E. Sezione 03 "Foto": converge AL CENTRO in alto e cresce
      if (photoTitle && photoSection) {
        const rect = photoTitle.getBoundingClientRect();
        const startY = viewportH * 0.96;
        const endY = viewportH * 0.35;
        const rawProgress = (startY - rect.top) / (startY - endY);
        const progress = clamp(rawProgress, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const moveX = (isCompact ? 6 : 24) * (1 - eased);
        const scale = 0.42 + eased * 0.58;
        const opacity = 0.2 + eased * 0.8;

        photoTitle.style.setProperty('--photo-x', `${moveX.toFixed(2)}vw`);
        photoTitle.style.setProperty('--photo-scale', scale.toFixed(4));
        photoTitle.style.setProperty('--photo-opacity', opacity.toFixed(3));

        if (photoRule) {
          const ruleScale = 0.1 + eased * 0.9;
          photoRule.style.setProperty('--photo-rule', ruleScale.toFixed(4));
        }
      }

      // F. Sezione 04 "Contatti": converge AL CENTRO e cresce
      if (contactTitle && contactSection) {
        const rect = contactTitle.getBoundingClientRect();
        const startY = viewportH * 0.96;
        const endY = viewportH * 0.42;
        const rawProgress = (startY - rect.top) / (startY - endY);
        const progress = clamp(rawProgress, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const moveX = (isCompact ? -6 : -22) * (1 - eased);
        const scale = 0.42 + eased * 0.58;
        const opacity = 0.2 + eased * 0.8;

        contactTitle.style.setProperty('--contact-x', `${moveX.toFixed(2)}vw`);
        contactTitle.style.setProperty('--contact-scale', scale.toFixed(4));
        contactTitle.style.setProperty('--contact-opacity', opacity.toFixed(3));

        if (contactRule) {
          const ruleScale = 0.1 + eased * 0.9;
          contactRule.style.setProperty('--contact-rule', ruleScale.toFixed(4));
        }
      }

      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(updateOnScroll);
          ticking = true;
        }
      },
      { passive: true }
    );

    window.addEventListener('resize', updateOnScroll, { passive: true });
    updateOnScroll();
  };

  /* --------------------------------------------------------------------------
     3. REVEAL ON SCROLL (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const initScrollReveal = () => {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!revealEls.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  };

  /* --------------------------------------------------------------------------
     4. LIGHTBOX FULL-SCREEN INTERATTIVO (36 Foto)
     -------------------------------------------------------------------------- */
  const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const items = Array.from(document.querySelectorAll('.gallery__item'));
    const lbImg = lightbox.querySelector('.lightbox__img');
    const lbCounter = lightbox.querySelector('.lightbox__counter');
    const btnClose = lightbox.querySelector('.lightbox__close');
    const btnPrev = lightbox.querySelector('.lightbox__nav--prev');
    const btnNext = lightbox.querySelector('.lightbox__nav--next');

    let currentIndex = 0;

    const showPhoto = (index) => {
      currentIndex = (index + items.length) % items.length;
      const item = items[currentIndex];
      const img = item.querySelector('.gallery__img');
      if (!img) return;

      lbImg.src = img.getAttribute('src');
      lbImg.alt = img.getAttribute('alt') || '';
      const num = String(currentIndex + 1).padStart(2, '0');
      const total = String(items.length).padStart(2, '0');
      lbCounter.textContent = `${num} / ${total}`;
    };

    const openLightbox = (index) => {
      showPhoto(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    items.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(idx));
    });

    btnClose.addEventListener('click', closeLightbox);
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhoto(currentIndex - 1);
    });
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhoto(currentIndex + 1);
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
      if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
    });
  };

  /* --------------------------------------------------------------------------
     5. COMPONENTE "COPIA EMAIL" ANTI-SCRAPER (Base64 Runtime Assembly)
     -------------------------------------------------------------------------- */
  const initAntiScraperEmail = () => {
    const copyBtn = document.getElementById('email-copy-btn');
    const mailtoBtn = document.getElementById('email-mailto-btn');
    const previewText = document.getElementById('email-preview-text');
    const badgeText = document.getElementById('email-badge-text');
    const liveStatus = document.getElementById('email-live-status');

    if (!copyBtn || !previewText) return;

    /**
     * CONFIGURAZIONE ANTI-SCRAPER (Base64):
     * Per generare i tuoi segmenti in Base64, apri la console del browser (F12) e digita:
     *   btoa('tuo.nome')  -> incolla in `u`
     *   btoa('gmail')     -> incolla in `d`
     *   btoa('com')       -> incolla in `t`
     *
     * Attualmente impostato su placeholder: mattia.delfabro @ gmail . com
     */
    const VAULT_SEGMENTS = Object.freeze({
      u: 'bWF0dGlhLmRlbGZhYnJv', // 'mattia.delfabro'
      d: 'Z21haWw=',             // 'gmail'
      t: 'Y29t'                  // 'com'
    });

    const DEFAULT_LABEL = 'Copia indirizzo email';
    let resetTimeoutId = null;

    // Ricompone l'indirizzo esclusivamente in RAM al momento dell'interazione umana
    const assembleEmail = () => {
      const user = atob(VAULT_SEGMENTS.u);
      const domain = atob(VAULT_SEGMENTS.d);
      const tld = atob(VAULT_SEGMENTS.t);
      const atSign = String.fromCharCode(64);  // '@'
      const dotSign = String.fromCharCode(46); // '.'
      return `${user}${atSign}${domain}${dotSign}${tld}`;
    };

    // Fallback universale se Clipboard API è bloccata (es. protocollo file://)
    const fallbackCopyText = (text) => {
      const tempArea = document.createElement('textarea');
      tempArea.value = text;
      tempArea.setAttribute('readonly', '');
      tempArea.style.position = 'fixed';
      tempArea.style.top = '-9999px';
      tempArea.style.opacity = '0';
      document.body.appendChild(tempArea);
      tempArea.select();
      let success = false;
      try {
        success = document.execCommand('copy');
      } catch {
        success = false;
      }
      document.body.removeChild(tempArea);
      return success;
    };

    // Copia negli appunti con Clipboard API + Fallback
    const copyToClipboard = async (text) => {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch {
          return fallbackCopyText(text);
        }
      }
      return fallbackCopyText(text);
    };

    // Effetto Spotlight radiale + leggero Magnetic Pull all'hover
    if (hasFinePointer && !prefersReducedMotion) {
      copyBtn.addEventListener('mousemove', (e) => {
        const rect = copyBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        copyBtn.style.setProperty('--spot-x', `${x.toFixed(0)}px`);
        copyBtn.style.setProperty('--spot-y', `${y.toFixed(0)}px`);

        const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
        const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
        copyBtn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
      });
    }

    // Hover / Focus: svela l'anteprima in memoria e la rimuove dal DOM all'uscita
    const handleRevealPreview = () => {
      if (copyBtn.classList.contains('is-copied')) return;
      previewText.textContent = assembleEmail();
    };

    const handleHidePreview = () => {
      copyBtn.style.transform = 'translate3d(0, 0, 0)';
      if (!copyBtn.classList.contains('is-copied')) {
        previewText.textContent = DEFAULT_LABEL;
      }
    };

    copyBtn.addEventListener('mouseenter', handleRevealPreview);
    copyBtn.addEventListener('focus', handleRevealPreview);
    copyBtn.addEventListener('mouseleave', handleHidePreview);
    copyBtn.addEventListener('blur', handleHidePreview);

    // Click Principale: Copia negli appunti e attiva lo stato di conferma per 2.5s
    copyBtn.addEventListener('click', async () => {
      const targetEmail = assembleEmail();
      const copied = await copyToClipboard(targetEmail);
      if (!copied) return;

      if (resetTimeoutId) {
        clearTimeout(resetTimeoutId);
        copyBtn.classList.remove('is-copied');
        // Forza reflow per riavviare l'animazione della barra timer a 2.5s
        void copyBtn.offsetWidth;
      }

      copyBtn.classList.add('is-copied');
      if (badgeText) badgeText.textContent = '✓ OK';
      if (liveStatus) {
        liveStatus.textContent = 'Indirizzo email copiato negli appunti.';
      }

      resetTimeoutId = setTimeout(() => {
        copyBtn.classList.remove('is-copied');
        previewText.textContent = copyBtn.matches(':hover') ? assembleEmail() : DEFAULT_LABEL;
        if (badgeText) badgeText.textContent = 'COPIA';
        if (liveStatus) liveStatus.textContent = '';
        resetTimeoutId = null;
      }, 2500);
    });

    // Pulsante Secondario Affiancato (↗): apre mailto assemblato runtime senza href statico
    if (mailtoBtn) {
      mailtoBtn.addEventListener('click', () => {
        const mailtoPrefix = ['m', 'a', 'i', 'l', 't', 'o', ':'].join('');
        window.location.href = `${mailtoPrefix}${assembleEmail()}`;
      });
    }
  };

  /* --------------------------------------------------------------------------
     6. FLOATING HAMBURGER MENU (Visibile ovunque tranne nella sezione Home)
     -------------------------------------------------------------------------- */
  const initFloatingNav = () => {
    const floatingNav = document.getElementById('floating-nav');
    const burgerBtn = document.getElementById('nav-burger');
    const drawer = document.getElementById('nav-drawer');
    const backdrop = document.getElementById('nav-backdrop');
    const heroSection = document.getElementById('top');
    const drawerLinks = Array.from(document.querySelectorAll('.nav-drawer__link'));

    if (!floatingNav || !burgerBtn || !drawer || !heroSection) return;

    const closeMenu = () => {
      floatingNav.classList.remove('is-open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.setAttribute('aria-label', 'Apri menu di navigazione');
      drawer.setAttribute('aria-hidden', 'true');
    };

    const toggleMenu = () => {
      const isOpen = floatingNav.classList.toggle('is-open');
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
      burgerBtn.setAttribute('aria-label', isOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione');
      drawer.setAttribute('aria-hidden', String(!isOpen));
    };

    burgerBtn.addEventListener('click', toggleMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && floatingNav.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Nasconde l'hamburger nella sezione Home (#top) e lo mostra in tutte le altre sezioni
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              floatingNav.classList.remove('is-visible');
              closeMenu();
            } else {
              floatingNav.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.15 }
      );

      heroObserver.observe(heroSection);

      // Evidenzia nel menu la sezione attualmente visibile
      const sections = ['top', 'chi-sono', 'formazione', 'foto', 'contatti']
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              drawerLinks.forEach((link) => {
                link.classList.toggle('is-active', link.dataset.section === activeId);
              });
            }
          });
        },
        { rootMargin: '-35% 0px -45% 0px' }
      );

      sections.forEach((sec) => sectionObserver.observe(sec));
    }
  };

  /* --------------------------------------------------------------------------
     7. GALLERY "VISUALIZZA TUTTO" TOGGLE (Mantiene disposizione Masonry identica)
     -------------------------------------------------------------------------- */
  const initGalleryToggle = () => {
    const viewport = document.getElementById('gallery-viewport');
    const grid = document.getElementById('gallery-grid');
    const toggleBtn = document.getElementById('gallery-toggle-btn');
    if (!viewport || !grid || !toggleBtn) return;

    const labelWrap = toggleBtn.querySelector('.gallery__toggle-label');
    const labelSpan = labelWrap ? labelWrap.querySelector('span') : null;
    const countBadge = toggleBtn.querySelector('.gallery__toggle-count');

    // Calcola al pixel l'altezza esatta delle prime 3 foto della prima colonna
    const updateHeights = () => {
      const thirdItem = grid.children[2];
      if (thirdItem) {
        const collapsedH = thirdItem.offsetTop + thirdItem.offsetHeight;
        if (collapsedH > 200) {
          viewport.style.setProperty('--collapsed-height', `${collapsedH}px`);
        }
      }
      viewport.style.setProperty('--expanded-height', `${grid.scrollHeight + 100}px`);
    };

    window.addEventListener('load', updateHeights);
    window.addEventListener('resize', updateHeights, { passive: true });
    updateHeights();

    toggleBtn.addEventListener('click', () => {
      updateHeights();
      const isExpanded = viewport.classList.toggle('is-expanded');
      toggleBtn.setAttribute('aria-expanded', String(isExpanded));

      const nextText = isExpanded ? 'Mostra meno' : 'Visualizza tutto';
      if (labelWrap) labelWrap.setAttribute('data-text', nextText);
      if (labelSpan) labelSpan.textContent = nextText;
      if (countBadge) countBadge.textContent = isExpanded ? '−27' : '+27';

      if (!isExpanded) {
        const thirdItem = grid.children[2];
        if (thirdItem) {
          thirdItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  };

  /* --------------------------------------------------------------------------
     INIT
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initHeroReveal();
    initScrollEffects();
    initScrollReveal();
    initLightbox();
    initAntiScraperEmail();
    initFloatingNav();
    initGalleryToggle();
  });
})();

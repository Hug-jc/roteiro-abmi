/**
 * Comprehensive tests for roteiro-por-experiencia-aracaju.html
 *
 * Features tested:
 *  1.  Document meta & language
 *  2.  Google Fonts link
 *  3.  CSS custom properties (design tokens)
 *  4.  Hero section structure & animated orbs
 *  5.  Logo section (Cohab + ABMI)
 *  6.  Hero credit pill
 *  7.  Hero heading & subtitle
 *  8.  Navigation pills (5 categories + anchors)
 *  9.  All 5 category sections present (chopp, vinho, burger, sushi, italiana)
 * 10.  Section headers (emoji, number, title, subtitle)
 * 11.  Restaurant cards – required fields (name, type, description)
 * 12.  Tags on cards
 * 13.  Star / highlight badges
 * 14.  "Also in" cross-section badges
 * 15.  Address rows (address text + copy button)
 * 16.  Google Maps links (correct href pattern)
 * 17.  Copy-button onclick attribute wires copyAddr()
 * 18.  copyAddr() JS function definition
 * 19.  Footer content (Cohab + ABMI mention)
 * 20.  Viewport meta tag (responsive design)
 * 21.  Float keyframe animation present in CSS
 * 22.  Specific well-known restaurants in correct sections
 * 23.  Cross-section cards appear in multiple sections
 * 24.  cards-grid layout wrapper present in every section
 */

const fs   = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

// ── Load file ────────────────────────────────────────────────────────────────
const HTML_FILE = path.join(__dirname, 'roteiro-por-experiencia-aracaju (1).html');
const rawHtml   = fs.readFileSync(HTML_FILE, 'utf-8');
const root      = parse(rawHtml);

// ── Helpers ──────────────────────────────────────────────────────────────────
const text  = (el) => el ? el.text.trim() : '';
const attr  = (el, a) => el ? (el.getAttribute(a) || '') : '';

// ── 1. Document meta & language ──────────────────────────────────────────────
describe('1. Document meta & language', () => {
  test('html element has lang="pt-BR"', () => {
    expect(attr(root.querySelector('html'), 'lang')).toBe('pt-BR');
  });

  test('charset is UTF-8', () => {
    const meta = root.querySelector('meta[charset]');
    expect(meta).not.toBeNull();
    expect(attr(meta, 'charset').toUpperCase()).toBe('UTF-8');
  });

  test('page title mentions Aracaju', () => {
    expect(text(root.querySelector('title'))).toMatch(/Aracaju/i);
  });
});

// ── 2. Google Fonts link ─────────────────────────────────────────────────────
describe('2. Google Fonts', () => {
  test('Google Fonts stylesheet is linked', () => {
    const link = root.querySelector('link[href*="fonts.googleapis.com"]');
    expect(link).not.toBeNull();
  });

  test('Cormorant Garamond and DM Sans are requested', () => {
    const link = root.querySelector('link[href*="fonts.googleapis.com"]');
    const href = attr(link, 'href');
    expect(href).toMatch(/Cormorant/);
    expect(href).toMatch(/DM\+Sans/);
  });
});

// ── 3. CSS custom properties ─────────────────────────────────────────────────
describe('3. CSS custom properties (design tokens)', () => {
  const cssText = rawHtml;

  test('--bg token is defined', () => {
    expect(cssText).toMatch(/--bg\s*:/);
  });

  test('--surface token is defined', () => {
    expect(cssText).toMatch(/--surface\s*:/);
  });

  test('--text token is defined', () => {
    expect(cssText).toMatch(/--text\s*:/);
  });

  test('--text-soft token is defined', () => {
    expect(cssText).toMatch(/--text-soft\s*:/);
  });

  test('--border token is defined', () => {
    expect(cssText).toMatch(/--border\s*:/);
  });

  test('--shadow token is defined', () => {
    expect(cssText).toMatch(/--shadow\s*:/);
  });
});

// ── 4. Hero section & animated orbs ─────────────────────────────────────────
describe('4. Hero section', () => {
  const hero = root.querySelector('.hero');

  test('.hero element exists', () => {
    expect(hero).not.toBeNull();
  });

  test('hero has animated orb container (.hero-orbs)', () => {
    expect(hero.querySelector('.hero-orbs')).not.toBeNull();
  });

  test('hero-orbs has exactly 3 span children', () => {
    const spans = hero.querySelectorAll('.hero-orbs span');
    expect(spans.length).toBe(3);
  });

  test('@keyframes float animation is defined in CSS', () => {
    expect(rawHtml).toMatch(/@keyframes float/);
  });
});

// ── 5. Logo section ──────────────────────────────────────────────────────────
describe('5. Logo section', () => {
  const logos = root.querySelector('.hero-logos');

  test('.hero-logos wrapper exists', () => {
    expect(logos).not.toBeNull();
  });

  test('Cohab logo element (.logo-cohab) is present', () => {
    expect(logos.querySelector('.logo-cohab')).not.toBeNull();
  });

  test('ABMI logo element (.logo-abmi) is present', () => {
    expect(logos.querySelector('.logo-abmi')).not.toBeNull();
  });

  test('separator (.logo-sep) is present', () => {
    expect(logos.querySelector('.logo-sep')).not.toBeNull();
  });
});

// ── 6. Hero credit pill ──────────────────────────────────────────────────────
describe('6. Hero credit pill', () => {
  const credit = root.querySelector('.hero-credit');

  test('.hero-credit element exists', () => {
    expect(credit).not.toBeNull();
  });

  test('credit mentions Cohab Premium Imobiliária', () => {
    expect(text(credit)).toMatch(/Cohab Premium Imobili/i);
  });

  test('credit contains a <strong> highlight', () => {
    expect(credit.querySelector('strong')).not.toBeNull();
  });
});

// ── 7. Hero heading & subtitle ───────────────────────────────────────────────
describe('7. Hero heading & subtitle', () => {
  test('hero eyebrow text is present', () => {
    expect(root.querySelector('.hero-eyebrow')).not.toBeNull();
  });

  test('h1 exists inside .hero', () => {
    const h1 = root.querySelector('.hero h1');
    expect(h1).not.toBeNull();
  });

  test('h1 has an <em> styled element', () => {
    const em = root.querySelector('.hero h1 em');
    expect(em).not.toBeNull();
  });

  test('.hero-sub subtitle exists', () => {
    expect(root.querySelector('.hero-sub')).not.toBeNull();
  });
});

// ── 8. Navigation pills ──────────────────────────────────────────────────────
describe('8. Navigation pills', () => {
  const nav   = root.querySelector('.nav-pills');
  const pills = nav ? nav.querySelectorAll('.nav-pill') : [];

  test('.nav-pills container exists', () => {
    expect(nav).not.toBeNull();
  });

  test('there are exactly 5 nav pills', () => {
    expect(pills.length).toBe(5);
  });

  const expected = [
    { cls: 'np-chopp',    anchor: '#chopp'    },
    { cls: 'np-vinho',    anchor: '#vinho'    },
    { cls: 'np-burger',   anchor: '#burger'   },
    { cls: 'np-sushi',    anchor: '#sushi'    },
    { cls: 'np-italiana', anchor: '#italiana' },
  ];

  expected.forEach(({ cls, anchor }) => {
    test(`pill .${cls} exists and links to ${anchor}`, () => {
      const pill = nav.querySelector(`.${cls}`);
      expect(pill).not.toBeNull();
      expect(attr(pill, 'href')).toBe(anchor);
    });
  });
});

// ── 9. All 5 category sections present ──────────────────────────────────────
describe('9. Category sections', () => {
  const sectionIds = ['chopp', 'vinho', 'burger', 'sushi', 'italiana'];

  sectionIds.forEach((id) => {
    test(`section#${id} exists`, () => {
      const section = root.querySelector(`#${id}`);
      expect(section).not.toBeNull();
    });

    test(`section#${id} has class .sec-${id}`, () => {
      const section = root.querySelector(`#${id}`);
      expect(section.classList.contains(`sec-${id}`)).toBe(true);
    });
  });
});

// ── 10. Section headers ──────────────────────────────────────────────────────
describe('10. Section headers structure', () => {
  const sections = root.querySelectorAll('.section');

  test('there are 5 sections total', () => {
    expect(sections.length).toBe(5);
  });

  sections.forEach((sec, i) => {
    const id = sec.getAttribute('id') || `section-${i}`;

    test(`section#${id} has .section-header`, () => {
      expect(sec.querySelector('.section-header')).not.toBeNull();
    });

    test(`section#${id} has .section-emoji`, () => {
      expect(sec.querySelector('.section-emoji')).not.toBeNull();
    });

    test(`section#${id} has .section-num`, () => {
      expect(sec.querySelector('.section-num')).not.toBeNull();
    });

    test(`section#${id} has h2.section-title`, () => {
      expect(sec.querySelector('h2.section-title')).not.toBeNull();
    });

    test(`section#${id} has .section-sub subtitle`, () => {
      expect(sec.querySelector('.section-sub')).not.toBeNull();
    });
  });
});

// ── 11. Restaurant cards – required fields ───────────────────────────────────
describe('11. Restaurant card required fields', () => {
  const cards = root.querySelectorAll('.card');

  test('at least 10 restaurant cards exist across all sections', () => {
    expect(cards.length).toBeGreaterThanOrEqual(10);
  });

  cards.forEach((card, i) => {
    test(`card[${i}] has .card-name`, () => {
      expect(card.querySelector('.card-name')).not.toBeNull();
    });

    test(`card[${i}] has .card-type`, () => {
      expect(card.querySelector('.card-type')).not.toBeNull();
    });

    test(`card[${i}] has .card-desc`, () => {
      expect(card.querySelector('.card-desc')).not.toBeNull();
    });

    test(`card[${i}] has .card-emoji`, () => {
      expect(card.querySelector('.card-emoji')).not.toBeNull();
    });
  });
});

// ── 12. Tags on cards ────────────────────────────────────────────────────────
describe('12. Tags on cards', () => {
  const cards = root.querySelectorAll('.card');

  cards.forEach((card, i) => {
    test(`card[${i}] "${text(card.querySelector('.card-name'))}" has at least one .tag`, () => {
      const tags = card.querySelectorAll('.tag');
      expect(tags.length).toBeGreaterThanOrEqual(1);
    });
  });
});

// ── 13. Star / highlight badges ──────────────────────────────────────────────
describe('13. Star highlight badges', () => {
  const badges = root.querySelectorAll('.star-badge');

  test('at least one .star-badge exists', () => {
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  badges.forEach((badge, i) => {
    test(`star-badge[${i}] contains ⭐`, () => {
      expect(text(badge)).toMatch(/⭐/);
    });
  });
});

// ── 14. "Also in" cross-section badges ──────────────────────────────────────
describe('14. Cross-section "also-badge" links', () => {
  const alsoBadges = root.querySelectorAll('.also-badge');

  test('at least 3 cross-section also-badges exist', () => {
    expect(alsoBadges.length).toBeGreaterThanOrEqual(3);
  });

  alsoBadges.forEach((badge, i) => {
    test(`also-badge[${i}] contains "➜ também em"`, () => {
      expect(text(badge)).toMatch(/também em/i);
    });
  });
});

// ── 15. Address rows ─────────────────────────────────────────────────────────
describe('15. Address rows', () => {
  const cards = root.querySelectorAll('.card');

  cards.forEach((card, i) => {
    const name    = text(card.querySelector('.card-name'));
    const addrEl  = card.querySelector('.card-addr');

    test(`card "${name}" has .card-addr block`, () => {
      expect(addrEl).not.toBeNull();
    });

    if (addrEl) {
      test(`card "${name}" addr has .addr-text`, () => {
        expect(addrEl.querySelector('.addr-text')).not.toBeNull();
      });

      test(`card "${name}" addr-text starts with 📍`, () => {
        expect(text(addrEl.querySelector('.addr-text'))).toMatch(/^📍/);
      });

      test(`card "${name}" has a copy button`, () => {
        expect(addrEl.querySelector('.copy-btn')).not.toBeNull();
      });
    }
  });
});

// ── 16. Google Maps links ────────────────────────────────────────────────────
describe('16. Google Maps links', () => {
  const cards = root.querySelectorAll('.card');

  cards.forEach((card) => {
    const name     = text(card.querySelector('.card-name'));
    const mapsLink = card.querySelector('.maps-link');

    test(`card "${name}" has a .maps-link`, () => {
      expect(mapsLink).not.toBeNull();
    });

    if (mapsLink) {
      test(`card "${name}" maps-link points to google.com/maps`, () => {
        expect(attr(mapsLink, 'href')).toMatch(/google\.com\/maps/);
      });

      test(`card "${name}" maps-link opens in _blank`, () => {
        expect(attr(mapsLink, 'target')).toBe('_blank');
      });

      test(`card "${name}" maps-link has rel=noopener`, () => {
        expect(attr(mapsLink, 'rel')).toMatch(/noopener/);
      });
    }
  });
});

// ── 17. Copy-button onclick wires copyAddr() ─────────────────────────────────
describe('17. Copy button onclick attribute', () => {
  const copyBtns = root.querySelectorAll('.copy-btn');

  test('copy buttons exist', () => {
    expect(copyBtns.length).toBeGreaterThan(0);
  });

  copyBtns.forEach((btn, i) => {
    test(`copy-btn[${i}] has onclick calling copyAddr`, () => {
      const onclick = attr(btn, 'onclick');
      expect(onclick).toMatch(/copyAddr\(/);
    });

    test(`copy-btn[${i}] onclick passes a non-empty address string`, () => {
      const onclick = attr(btn, 'onclick');
      // Expects something like: copyAddr(this, 'Some address text')
      expect(onclick).toMatch(/copyAddr\(this,\s*'[^']+'\)/);
    });
  });
});

// ── 18. copyAddr() JS function definition ────────────────────────────────────
describe('18. copyAddr() JavaScript function', () => {
  test('copyAddr function is defined in <script>', () => {
    expect(rawHtml).toMatch(/function\s+copyAddr\s*\(/);
  });

  test('copyAddr uses navigator.clipboard.writeText', () => {
    expect(rawHtml).toMatch(/navigator\.clipboard\.writeText/);
  });

  test('copyAddr updates button text to ✓ Copiado!', () => {
    expect(rawHtml).toMatch(/✓ Copiado!/);
  });

  test('copyAddr adds "copied" class to button', () => {
    expect(rawHtml).toMatch(/classList\.add\(['"]copied['"]\)/);
  });

  test('copyAddr restores button text after timeout', () => {
    expect(rawHtml).toMatch(/setTimeout/);
    expect(rawHtml).toMatch(/📋 Copiar/);
    expect(rawHtml).toMatch(/classList\.remove\(['"]copied['"]\)/);
  });
});

// ── 19. Footer ───────────────────────────────────────────────────────────────
describe('19. Footer content', () => {
  const footer = root.querySelector('footer');

  test('<footer> element exists', () => {
    expect(footer).not.toBeNull();
  });

  test('footer mentions Cohab Premium Imobiliária', () => {
    expect(text(footer)).toMatch(/Cohab Premium Imobili/i);
  });

  test('footer mentions CRECI', () => {
    expect(text(footer)).toMatch(/CRECI/i);
  });

  test('footer mentions Aracaju, Sergipe', () => {
    expect(text(footer)).toMatch(/Aracaju/i);
  });

  test('footer mentions ABMI partnership', () => {
    expect(text(footer)).toMatch(/ABMI/i);
  });
});

// ── 20. Viewport meta (responsive design) ───────────────────────────────────
describe('20. Viewport meta tag', () => {
  const viewport = root.querySelector('meta[name="viewport"]');

  test('viewport meta exists', () => {
    expect(viewport).not.toBeNull();
  });

  test('viewport includes width=device-width', () => {
    expect(attr(viewport, 'content')).toMatch(/width=device-width/);
  });

  test('viewport includes initial-scale=1', () => {
    expect(attr(viewport, 'content')).toMatch(/initial-scale=1/);
  });
});

// ── 21. Float keyframe CSS animation ────────────────────────────────────────
describe('21. CSS float animation', () => {
  test('@keyframes float defines 0%, 50%, 100% stops', () => {
    expect(rawHtml).toMatch(/@keyframes float/);
    expect(rawHtml).toMatch(/50%\s*\{[^}]*translateY/);
  });

  test('hero-orbs spans use animation: float', () => {
    expect(rawHtml).toMatch(/animation:\s*float/);
  });

  test('animation-delay is applied to orb variants', () => {
    expect(rawHtml).toMatch(/animation-delay\s*:/);
  });
});

// ── 22. Specific restaurants in correct sections ─────────────────────────────
describe('22. Specific restaurants in correct sections', () => {
  const section = (id) => root.querySelector(`#${id}`);
  const cardNames = (id) =>
    section(id)
      .querySelectorAll('.card-name')
      .map((el) => text(el));

  test('Revo Burger is in #burger section', () => {
    expect(cardNames('burger')).toContain('Revo Burger');
  });

  test('Nukoni Temakeria is in #sushi section', () => {
    expect(cardNames('sushi')).toContain('Nukoni Temakeria');
  });

  test('La Tavola is in #vinho section', () => {
    expect(cardNames('vinho')).toContain('La Tavola');
  });

  test('La Tavola is in #italiana section', () => {
    expect(cardNames('italiana')).toContain('La Tavola');
  });

  test('Bergamo Cucina is in #italiana section', () => {
    expect(cardNames('italiana')).toContain('Bergamo Cucina');
  });

  test('Pizzaria Paulistinha is in #italiana section', () => {
    expect(cardNames('italiana')).toContain('Pizzaria Paulistinha');
  });

  test('Santa Pizza is in #italiana section', () => {
    expect(cardNames('italiana')).toContain('Santa Pizza');
  });
});

// ── 23. Cross-section cards appear in multiple sections ─────────────────────
describe('23. Cross-section restaurant appearances', () => {
  const allCardNames = root
    .querySelectorAll('.card-name')
    .map((el) => text(el));

  const count = (name) => allCardNames.filter((n) => n === name).length;

  test('Otto appears in multiple sections (vinho, sushi, italiana)', () => {
    expect(count('Otto')).toBeGreaterThanOrEqual(2);
  });

  test('La Tavola appears in multiple sections (vinho, italiana)', () => {
    expect(count('La Tavola')).toBeGreaterThanOrEqual(2);
  });

  test('Sollo Restaurante appears in multiple sections', () => {
    expect(count('Sollo Restaurante')).toBeGreaterThanOrEqual(2);
  });

  test('Terra Tupi appears in both chopp and burger sections', () => {
    expect(count('Terra Tupi')).toBeGreaterThanOrEqual(2);
  });
});

// ── 24. cards-grid layout wrapper ───────────────────────────────────────────
describe('24. .cards-grid layout wrapper', () => {
  const sections = root.querySelectorAll('.section');

  sections.forEach((sec) => {
    const id = sec.getAttribute('id') || 'unknown';
    test(`section#${id} contains a .cards-grid`, () => {
      expect(sec.querySelector('.cards-grid')).not.toBeNull();
    });
  });
});

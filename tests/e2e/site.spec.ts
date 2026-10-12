import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE = '/personal-portfolio/';
const CASES = [
  'financial-micro-frontend',
  'financial-integrations',
  'observability-and-production-support',
  'engineering-quality-and-leadership',
];
const PAGES = ['', 'pt/', ...CASES.map((c) => `cases/${c}/`), ...CASES.map((c) => `pt/cases/${c}/`)];

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  return errors;
}

test.describe('SEO', () => {
  for (const path of PAGES) {
    test(`meta tags are complete: /${path}`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);

      const isPt = path.startsWith('pt/');
      await expect(page.locator('html')).toHaveAttribute('lang', isPt ? 'pt-BR' : 'en');
      await expect(page.locator('h1')).toHaveCount(1);

      const title = await page.title();
      expect(title.length).toBeGreaterThan(20);
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description?.length ?? 0).toBeGreaterThan(80);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBe(`https://leonardomonteiroo.github.io${BASE}${path}`);

      const alternates = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
        els.map((e) => [e.getAttribute('hreflang'), e.getAttribute('href')]),
      );
      const enPath = path.replace(/^pt\//, '');
      expect(alternates).toEqual([
        ['en', `https://leonardomonteiroo.github.io${BASE}${enPath}`],
        ['pt-BR', `https://leonardomonteiroo.github.io${BASE}pt/${enPath}`],
        ['x-default', `https://leonardomonteiroo.github.io${BASE}${enPath}`],
      ]);

      for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'og:locale']) {
        await expect(page.locator(`meta[property="${prop}"]`), prop).toHaveCount(1);
      }
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

      const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(ld.length).toBeGreaterThan(0);
      const types = ld.map((s) => JSON.parse(s)['@type']);
      if (path === '' || path === 'pt/') expect(types).toEqual(expect.arrayContaining(['Person', 'ProfilePage', 'WebSite']));
      else expect(types).toEqual(expect.arrayContaining(['Article', 'BreadcrumbList']));
    });
  }

  test('OG images and CVs are served', async ({ request }) => {
    for (const asset of ['og/en.png', 'og/pt.png', 'og/profile.jpg', 'favicon.svg', 'apple-touch-icon.png',
      'cv/leonardo-monteiro-resume-en.pdf', 'cv/leonardo-monteiro-curriculo-pt.pdf']) {
      const res = await request.get(asset);
      expect(res.status(), asset).toBe(200);
    }
  });

  test('sitemap lists every page with language alternates', async ({ request }) => {
    const index = await request.get('sitemap-index.xml');
    expect(index.status()).toBe(200);
    const xml = await (await request.get('sitemap-0.xml')).text();
    for (const path of PAGES) expect(xml).toContain(`<loc>https://leonardomonteiroo.github.io${BASE}${path}</loc>`);
    expect(xml).not.toContain('404');
    expect(xml).toContain('hreflang="pt-BR"');
  });

  test('404 page is noindex and helpful', async ({ page }) => {
    const res = await page.goto('does-not-exist/');
    expect(res?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('404');
  });
});

test.describe('links', () => {
  test('every internal link resolves', async ({ page, request }) => {
    const seen = new Set<string>();
    for (const path of ['', 'pt/', `cases/${CASES[0]}/`]) {
      await page.goto(path);
      const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
      for (const href of hrefs) {
        const url = new URL(href);
        if (url.origin !== 'http://localhost:4321' || url.protocol === 'mailto:') continue;
        url.hash = '';
        seen.add(url.href);
      }
    }
    for (const href of seen) {
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test('old site URLs redirect to the matching section', async ({ page }) => {
    for (const [old, section] of [['sobre', 'about'], ['formacao', 'experience'], ['portfolio', 'cases'], ['contato', 'contact']]) {
      await page.goto(`${old}.html`);
      await expect(page).toHaveURL(new RegExp(`/personal-portfolio/pt/#${section}$`));
    }
  });

  test('section anchors exist on the home page', async ({ page }) => {
    await page.goto('');
    for (const id of ['experience', 'cases', 'projects', 'stack', 'about', 'contact']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });
});

test.describe('content', () => {
  test('recruiter essentials are above the fold', async ({ page }) => {
    await page.goto('');
    const vh = page.viewportSize()!.height;
    for (const loc of [
      page.getByRole('heading', { level: 1 }),
      page.getByRole('link', { name: 'Email me' }),
      page.getByRole('link', { name: 'Download résumé' }),
    ]) {
      const box = await loc.boundingBox();
      expect(box, 'visible').not.toBeNull();
      expect(box!.y + box!.height).toBeLessThanOrEqual(vh);
    }
    await expect(page.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:leonardo.monteiro599@outlook.com');
  });

  test('language switch keeps the current page', async ({ page }) => {
    await page.goto(`cases/${CASES[1]}/`);
    await page.locator('[data-lang-switch]').click();
    await expect(page).toHaveURL(new RegExp(`/pt/cases/${CASES[1]}/$`));
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  });

  test('pages render with JavaScript disabled', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('http://localhost:4321/personal-portfolio/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // Without JS every trace span's details are listed.
    await expect(page.locator('.span-detail')).toHaveCount(5);
    await expect(page.locator('.span-detail').first()).toBeVisible();
    await ctx.close();
  });
});

test.describe('interactions', () => {
  test('dark theme is the default, even when the OS prefers light', async ({ browser }) => {
    const ctx = await browser.newContext({ colorScheme: 'light' });
    const page = await ctx.newPage();
    await page.goto('http://localhost:4321/personal-portfolio/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await ctx.close();
  });

  test('theme toggle switches and persists', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.locator('[data-theme-toggle]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('time range filters the career trace', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('');
    const intern = page.locator('.trace-row', { hasText: 'Development Intern' });
    const lead = page.locator('.trace-row', { hasText: 'Tech Lead' });
    await expect(intern).not.toHaveClass(/is-out/);

    await page.getByRole('button', { name: 'Last year' }).click();
    await expect(page.getByRole('button', { name: 'Last year' })).toHaveAttribute('aria-pressed', 'true');
    await expect(intern).toHaveClass(/is-out/);
    await expect(lead).not.toHaveClass(/is-out/);

    await page.getByRole('button', { name: 'Whole career' }).click();
    await expect(intern).not.toHaveClass(/is-out/);
    expect(errors).toEqual([]);
  });

  test('selecting a span shows its details', async ({ page }) => {
    await page.goto('');
    const detail = page.locator('.span-detail.is-active');
    await expect(detail).toHaveCount(1);
    await expect(detail).toContainText('Tech Lead');

    const span = page.locator('button[data-span]', { hasText: 'Full Stack Developer' });
    await span.click();
    await expect(span).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.span-detail.is-active')).toContainText('1,600+');
  });

  test('command palette filters and navigates', async ({ page }) => {
    await page.goto('');
    await page.locator('[data-palette-open]').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const input = page.getByRole('combobox');
    await expect(input).toBeFocused();

    await input.fill('observ');
    const options = dialog.locator('[role="option"]:not([hidden])');
    await expect(options).toHaveCount(1);
    await expect(options.first()).toHaveAttribute('aria-selected', 'true');
    await expect(input).toHaveAttribute('aria-activedescendant', await options.first().getAttribute('id') ?? '');

    await input.press('Enter');
    await expect(page).toHaveURL(/cases\/observability-and-production-support\/$/);
  });

  test('keyboard shortcut opens the palette and Escape closes it', async ({ page, isMobile }) => {
    test.skip(isMobile, 'no physical keyboard on mobile');
    await page.goto('');
    await page.keyboard.press('Control+k');
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('copy email button copies the address', async ({ page, context, browserName, isMobile }) => {
    test.skip(browserName !== 'chromium' || isMobile, 'clipboard permissions are chromium desktop only');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('#contact');
    await page.locator('[data-copy]').click();
    await expect(page.locator('[data-copy]')).toContainText('Copied');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('leonardo.monteiro599@outlook.com');
  });
});

test.describe('layout', () => {
  for (const path of ['', 'pt/', `cases/${CASES[0]}/`]) {
    test(`no horizontal overflow: /${path}`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('no console errors on load', async ({ page }) => {
    const errors = trackErrors(page);
    for (const path of ['', 'pt/', `cases/${CASES[0]}/`]) await page.goto(path, { waitUntil: 'networkidle' });
    expect(errors).toEqual([]);
  });
});

test.describe('accessibility', () => {
  for (const theme of ['dark', 'light'] as const) {
    for (const path of ['', 'pt/', `cases/${CASES[0]}/`, 'does-not-exist/']) {
      test(`axe: /${path} (${theme})`, async ({ page }) => {
        await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
        await page.goto(path);
        // Reveal animations would make axe sample mid-transition colors.
        await page.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible')));
        await page.waitForTimeout(700);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
        expect(summary).toEqual([]);
      });
    }
  }

  test('palette dialog passes axe', async ({ page }) => {
    await page.goto('');
    await page.locator('[data-palette-open]').click();
    const results = await new AxeBuilder({ page }).include('[data-palette]').analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

<?php
require_once __DIR__ . '/data.php';

// Renders the lead-enquiry form (contact section + popup share the markup).
function tarik_lead_form(array $t, string $locale, array $company): void
{
    $f = $t['form'];
    $privacy = tarik_privacy_href($locale);
    ?>
    <form class="form js-form" data-type="lead" novalidate method="post" action="/submit.php">
        <input type="hidden" name="type" value="lead">
        <input type="hidden" name="locale" value="<?= e($locale) ?>">
        <input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp-field">

        <div class="form-grid">
            <label class="field">
                <span class="field-label"><?= e($f['name']) ?></span>
                <input type="text" name="name" autocomplete="name" placeholder="<?= e($f['namePh']) ?>" required>
                <span class="field-error" data-error="name"></span>
            </label>
            <label class="field">
                <span class="field-label"><?= e($f['phone']) ?></span>
                <input type="tel" name="phone" autocomplete="tel" placeholder="<?= e($f['phonePh']) ?>" required>
                <span class="field-error" data-error="phone"></span>
            </label>
            <label class="field">
                <span class="field-label"><?= e($f['email']) ?> <em class="opt"><?= e($f['optional']) ?></em></span>
                <input type="email" name="email" autocomplete="email" placeholder="<?= e($f['emailPh']) ?>">
                <span class="field-error" data-error="email"></span>
            </label>
            <label class="field">
                <span class="field-label"><?= e($f['city']) ?> <em class="opt"><?= e($f['optional']) ?></em></span>
                <input type="text" name="city" autocomplete="address-level2" placeholder="<?= e($f['cityPh']) ?>">
            </label>
        </div>

        <label class="field">
            <span class="field-label"><?= e($f['service']) ?> <em class="opt"><?= e($f['optional']) ?></em></span>
            <select name="service" class="field-select">
                <option value="" disabled selected><?= e($f['servicePh']) ?></option>
                <?php foreach ($f['serviceOptions'] as $opt): ?>
                    <option value="<?= e($opt) ?>"><?= e($opt) ?></option>
                <?php endforeach; ?>
            </select>
        </label>

        <label class="field">
            <span class="field-label"><?= e($f['message']) ?> <em class="opt"><?= e($f['optional']) ?></em></span>
            <textarea name="message" rows="4" placeholder="<?= e($f['messagePh']) ?>"></textarea>
        </label>

        <label class="field">
            <span class="field-label"><?= e($f['file']) ?> <em class="opt"><?= e($f['optional']) ?></em></span>
            <span class="file-control">
                <span class="file-btn"><?= e($f['fileChoose']) ?></span>
                <span class="file-name" data-file-name><?= e($f['fileNone']) ?></span>
                <input type="file" name="file" class="file-input">
            </span>
            <span class="field-hint"><?= e($f['fileHint']) ?></span>
        </label>

        <label class="consent">
            <input type="checkbox" name="consent" value="1" required>
            <span><?= e($f['consent']) ?> <a href="<?= e($privacy) ?>"><?= e($f['consentLink']) ?></a></span>
        </label>
        <span class="field-error" data-error="consent"></span>

        <button type="submit" class="btn btn-primary btn-block-mobile">
            <span class="btn-label"><?= e($f['submit']) ?></span>
            <span class="btn-icon" aria-hidden="true">→</span>
        </button>

        <p class="form-generic-error" data-form-error hidden><?= e($f['errors']['generic']) ?></p>

        <div class="form-success" data-form-success hidden>
            <div class="form-success-mark" aria-hidden="true">✓</div>
            <h3><?= e($f['success']['title']) ?></h3>
            <p><?= e($f['success']['desc']) ?></p>
            <button type="button" class="btn btn-ghost" data-form-reset><?= e($f['success']['again']) ?></button>
        </div>
    </form>
    <?php
}

// Renders the careers application form.
function tarik_career_form(array $t, string $locale): void
{
    $f = $t['form'];
    $c = $t['careers'];
    $privacy = tarik_privacy_href($locale);
    ?>
    <form class="form js-form" data-type="career" novalidate method="post" action="/submit.php">
        <input type="hidden" name="type" value="career">
        <input type="hidden" name="locale" value="<?= e($locale) ?>">
        <input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp-field">

        <div class="form-grid">
            <label class="field">
                <span class="field-label"><?= e($f['name']) ?></span>
                <input type="text" name="name" autocomplete="name" placeholder="<?= e($f['namePh']) ?>" required>
                <span class="field-error" data-error="name"></span>
            </label>
            <label class="field">
                <span class="field-label"><?= e($f['phone']) ?></span>
                <input type="tel" name="phone" autocomplete="tel" placeholder="<?= e($f['phonePh']) ?>" required>
                <span class="field-error" data-error="phone"></span>
            </label>
            <label class="field">
                <span class="field-label"><?= e($f['specialization']) ?></span>
                <input type="text" name="specialization" placeholder="<?= e($f['specializationPh']) ?>">
            </label>
            <label class="field">
                <span class="field-label"><?= e($f['experience']) ?></span>
                <input type="text" name="experience" placeholder="<?= e($f['experiencePh']) ?>">
            </label>
        </div>

        <label class="field">
            <span class="field-label"><?= e($f['documents']) ?></span>
            <input type="text" name="documents" placeholder="<?= e($f['documentsPh']) ?>">
        </label>

        <label class="field">
            <span class="field-label"><?= e($f['note']) ?> <em class="opt"><?= e($f['optional']) ?></em></span>
            <textarea name="message" rows="3" placeholder="<?= e($f['notePh']) ?>"></textarea>
        </label>

        <label class="consent">
            <input type="checkbox" name="consent" value="1" required>
            <span><?= e($f['consent']) ?> <a href="<?= e($privacy) ?>"><?= e($f['consentLink']) ?></a></span>
        </label>
        <span class="field-error" data-error="consent"></span>

        <button type="submit" class="btn btn-primary btn-block-mobile">
            <span class="btn-label"><?= e($c['cta']) ?></span>
            <span class="btn-icon" aria-hidden="true">→</span>
        </button>

        <p class="form-generic-error" data-form-error hidden><?= e($f['errors']['generic']) ?></p>

        <div class="form-success" data-form-success hidden>
            <div class="form-success-mark" aria-hidden="true">✓</div>
            <h3><?= e($c['success']['title']) ?></h3>
            <p><?= e($c['success']['desc']) ?></p>
            <button type="button" class="btn btn-ghost" data-form-reset><?= e($c['success']['again']) ?></button>
        </div>
    </form>
    <?php
}

// Renders a section heading (eyebrow + title + lead).
function tarik_heading(string $eyebrow, string $title, ?string $lead = null, string $tone = 'dark'): void
{
    ?>
    <div class="section-heading reveal">
        <span class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span><?= e($eyebrow) ?></span>
        <h2 class="section-title"><?= e($title) ?></h2>
        <?php if ($lead): ?>
            <p class="section-lead">
                <?php foreach (tarik_lines($lead) as $line): ?>
                    <span class="lead-line"><?= e($line) ?></span>
                <?php endforeach; ?>
            </p>
        <?php endif; ?>
    </div>
    <?php
}

// Full page render.
function tarik_render(string $locale): void
{
    $t = tarik_load($locale);
    $company = tarik_company();
    $nav = tarik_nav();
    $media = tarik_project_media();
    $other = $locale === 'uk' ? 'cs' : 'uk';
    $otherHref = $locale === 'uk' ? '/' : '/uk/';
    $homeHref = $locale === 'uk' ? '/uk/' : '/';
    $privacy = tarik_privacy_href($locale);
    $heroLines = tarik_lines($t['hero']['h1']);
    $subLines = tarik_lines($t['hero']['subtitle']);
    $htmlLang = $locale === 'uk' ? 'uk' : 'cs';
    ?>
<!DOCTYPE html>
<html lang="<?= e($htmlLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($t['metadata']['title']) ?></title>
    <meta name="description" content="<?= e($t['metadata']['description']) ?>">
    <meta property="og:title" content="<?= e($t['metadata']['title']) ?>">
    <meta property="og:description" content="<?= e($t['metadata']['description']) ?>">
    <meta property="og:type" content="website">
    <meta property="og:image" content="/assets/img/logo-icon.png">
    <link rel="icon" href="/assets/img/logo-icon.png" type="image/png">
    <link rel="alternate" hreflang="cs" href="/">
    <link rel="alternate" hreflang="uk" href="/uk/">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body data-locale="<?= e($locale) ?>">
<a href="#kontakt" class="skip-link"><?= e($t['nav']['cta']) ?></a>

<!-- Header -->
<header class="site-header" data-header>
    <div class="container header-inner">
        <div class="header-left">
            <a href="<?= e($homeHref) ?>" class="logo" aria-label="<?= e($company['name']) ?>">
                <img src="/assets/img/logo-ondark.png" alt="<?= e($company['name']) ?>" class="logo-img logo-light" width="200" height="64">
                <img src="/assets/img/logo.png" alt="<?= e($company['name']) ?>" class="logo-img logo-dark" width="200" height="64">
            </a>
            <nav class="nav-desktop" aria-label="<?= e($t['nav']['menu']) ?>">
                <?php foreach ($nav as $item): ?>
                    <a href="#<?= e($item['id']) ?>" class="nav-link"><?= e($t['nav'][$item['key']]) ?></a>
                <?php endforeach; ?>
            </nav>
        </div>
        <div class="header-right">
            <div class="lang-switch" role="group" aria-label="<?= e($t['locale']['switchTo']) ?>">
                <a href="<?= e($homeHref) ?>" class="lang-opt<?= ' is-active' ?>" aria-current="true"><?= e($t['locale'][$locale]) ?></a>
                <span class="lang-sep">/</span>
                <a href="<?= e($otherHref) ?>" class="lang-opt"><?= e($t['locale'][$other]) ?></a>
            </div>
            <a href="#kontakt" class="btn btn-primary btn-sm header-cta"><?= e($t['nav']['cta']) ?></a>
            <button type="button" class="burger" data-burger aria-label="<?= e($t['nav']['menu']) ?>" aria-expanded="false">
                <span></span><span></span>
            </button>
        </div>
    </div>
</header>

<!-- Mobile menu -->
<div class="mobile-menu" data-mobile-menu hidden>
    <nav class="mobile-nav" aria-label="<?= e($t['nav']['menu']) ?>">
        <?php foreach ($nav as $item): ?>
            <a href="#<?= e($item['id']) ?>" class="mobile-nav-link" data-menu-close><?= e($t['nav'][$item['key']]) ?></a>
        <?php endforeach; ?>
    </nav>
    <div class="mobile-menu-foot">
        <a href="#kontakt" class="btn btn-primary btn-block" data-menu-close><?= e($t['nav']['cta']) ?></a>
        <div class="mobile-menu-contact">
            <a href="tel:<?= e($company['phoneHref']) ?>"><?= e($t['nav']['callUs']) ?></a>
            <a href="mailto:<?= e($company['email']) ?>"><?= e($t['nav']['writeUs']) ?></a>
        </div>
    </div>
</div>

<main id="top">

<!-- Hero -->
<section class="hero">
    <video class="hero-video" autoplay muted loop playsinline poster="/assets/img/projects/industrial.jpg">
        <source src="/assets/video/hero.mp4" type="video/mp4">
    </video>
    <div class="hero-overlay" aria-hidden="true"></div>
    <div class="container hero-inner">
        <span class="hero-badge"><span class="eyebrow-dot" aria-hidden="true"></span><?= e($t['hero']['badge']) ?></span>
        <h1 class="hero-title">
            <?php foreach ($heroLines as $line): ?>
                <span class="hero-title-line"><?= e($line) ?></span>
            <?php endforeach; ?>
        </h1>
        <p class="hero-subtitle">
            <?php foreach ($subLines as $line): ?>
                <span class="sub-line"><?= e($line) ?></span>
            <?php endforeach; ?>
        </p>
        <div class="hero-actions">
            <a href="#kontakt" class="btn btn-primary btn-lg"><?= e($t['hero']['ctaPrimary']) ?></a>
            <a href="#services" class="btn btn-glass btn-lg"><?= e($t['hero']['ctaSecondary']) ?></a>
        </div>
        <ul class="hero-trust">
            <?php foreach ($t['hero']['trust'] as $item): ?>
                <li><span class="trust-tick" aria-hidden="true">✓</span><?= e($item) ?></li>
            <?php endforeach; ?>
        </ul>
        <p class="hero-credibility"><?= e($t['hero']['credibility']) ?></p>
    </div>
</section>

<!-- Trust marquee -->
<div class="marquee" aria-hidden="true">
    <div class="marquee-track">
        <?php for ($r = 0; $r < 2; $r++): ?>
            <?php foreach ($t['trust']['marquee'] as $word): ?>
                <span class="marquee-item"><?= e($word) ?></span><span class="marquee-dot">•</span>
            <?php endforeach; ?>
        <?php endfor; ?>
    </div>
</div>

<!-- Services -->
<section id="services" class="section section-light">
    <div class="container">
        <?php tarik_heading($t['services']['eyebrow'], $t['services']['title'], $t['services']['lead']); ?>
        <div class="services-grid">
            <?php foreach ($t['services']['items'] as $i => $svc): ?>
                <article class="service-card reveal" style="--i: <?= $i ?>">
                    <div class="service-card-top">
                        <span class="service-index"><?= sprintf('%02d', $i + 1) ?></span>
                        <div>
                            <h3 class="service-title"><?= e($svc['title']) ?></h3>
                            <p class="service-tagline"><?= e($svc['tagline']) ?></p>
                        </div>
                    </div>
                    <p class="service-intro"><?= e($svc['intro']) ?></p>
                    <ul class="service-points">
                        <?php foreach ($svc['points'] as $p): ?>
                            <li><span class="point-tick" aria-hidden="true">✓</span><?= e($p) ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <div class="service-directions">
                        <span class="directions-label"><?= e($t['services']['directionsTitle']) ?></span>
                        <div class="chip-row">
                            <?php foreach ($svc['directions'] as $d): ?>
                                <span class="chip"><?= e($d) ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <a href="#kontakt" class="service-cta">
                        <?= e($t['services']['cta']) ?> <span aria-hidden="true">→</span>
                    </a>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Process -->
<section id="process" class="section section-beige">
    <div class="container process-layout">
        <div class="process-head">
            <?php tarik_heading($t['process']['eyebrow'], $t['process']['title'], $t['process']['lead']); ?>
        </div>
        <ol class="process-steps">
            <?php foreach ($t['process']['steps'] as $i => $step): ?>
                <li class="process-step reveal" style="--i: <?= $i ?>">
                    <span class="step-num"><?= sprintf('%02d', $i + 1) ?></span>
                    <div class="step-body">
                        <h3 class="step-title"><?= e($step['title']) ?></h3>
                        <p class="step-desc"><?= e($step['desc']) ?></p>
                        <span class="step-solves"><span class="solves-tick" aria-hidden="true">✓</span><?= e($step['solves']) ?></span>
                    </div>
                </li>
            <?php endforeach; ?>
        </ol>
    </div>
</section>

<!-- Projects -->
<section id="projects" class="section section-dark">
    <div class="container">
        <?php tarik_heading($t['projects']['eyebrow'], $t['projects']['title'], $t['projects']['lead'], 'light'); ?>
        <div class="projects-grid">
            <?php foreach ($t['projects']['items'] as $i => $pr): ?>
                <article class="project-card reveal" style="--i: <?= $i % 2 ?>">
                    <div class="project-media">
                        <img src="<?= e($media[$i] ?? '') ?>" alt="<?= e($pr['imageAlt']) ?>" loading="lazy">
                        <span class="project-type"><?= e($pr['type']) ?></span>
                        <a href="#kontakt" class="project-arrow" aria-label="<?= e($pr['title']) ?>"><span aria-hidden="true">↗</span></a>
                        <div class="project-media-foot">
                            <h3 class="project-title"><?= e($pr['title']) ?></h3>
                            <span class="project-location"><span class="loc-pin" aria-hidden="true">◉</span><?= e($pr['location']) ?></span>
                        </div>
                    </div>
                    <p class="project-desc"><?= e($pr['description']) ?></p>
                    <dl class="project-meta">
                        <div>
                            <dt><?= e($t['projects']['labels']['category']) ?></dt>
                            <dd><?= e($pr['category']) ?></dd>
                        </div>
                        <div>
                            <dt><?= e($t['projects']['labels']['scope']) ?></dt>
                            <dd><?= e($pr['scope']) ?></dd>
                        </div>
                    </dl>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Advantages -->
<section id="advantages" class="section section-light">
    <div class="container advantages-layout">
        <div class="advantages-head">
            <?php tarik_heading($t['advantages']['eyebrow'], $t['advantages']['title'], $t['advantages']['lead']); ?>
            <div class="chip-row advantages-points">
                <?php foreach ($t['advantages']['points'] as $p): ?>
                    <span class="chip chip-dark"><?= e($p) ?></span>
                <?php endforeach; ?>
            </div>
            <a href="#kontakt" class="btn btn-primary btn-block-mobile advantages-cta"><?= e($t['nav']['cta']) ?></a>
        </div>
        <div class="advantages-media reveal">
            <img src="/assets/img/why-choose.jpg" alt="<?= e($t['hero']['imageAlt']) ?>" loading="lazy">
        </div>
        <div class="advantages-list">
            <?php foreach ($t['advantages']['highlights'] as $i => $h): ?>
                <div class="advantage reveal" style="--i: <?= $i ?>">
                    <span class="advantage-num"><?= sprintf('%02d', $i + 1) ?></span>
                    <div>
                        <h3 class="advantage-title"><?= e($h['title']) ?></h3>
                        <p class="advantage-desc"><?= e($h['desc']) ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Testimonials -->
<section class="section section-beige">
    <div class="container">
        <?php tarik_heading($t['testimonials']['eyebrow'], $t['testimonials']['title'], $t['testimonials']['lead']); ?>
        <div class="testimonials" data-slider>
            <div class="testimonials-track" data-slider-track>
                <?php foreach ($t['testimonials']['items'] as $tm): ?>
                    <figure class="testimonial">
                        <blockquote class="testimonial-quote">“<?= e($tm['quote']) ?>”</blockquote>
                        <figcaption class="testimonial-meta">
                            <span class="testimonial-avatar" aria-hidden="true"><?= e(mb_substr($tm['name'], 0, 1)) ?></span>
                            <span>
                                <strong><?= e($tm['name']) ?></strong>
                                <span class="testimonial-role"><?= e($tm['role']) ?></span>
                            </span>
                        </figcaption>
                    </figure>
                <?php endforeach; ?>
            </div>
            <div class="slider-dots" data-slider-dots></div>
        </div>
    </div>
</section>

<!-- Careers -->
<section id="kariera" class="section section-light">
    <div class="container careers-layout">
        <div class="careers-head">
            <?php tarik_heading($t['careers']['eyebrow'], $t['careers']['title'], $t['careers']['lead']); ?>
        </div>
        <div class="careers-form panel reveal">
            <?php tarik_career_form($t, $locale); ?>
        </div>
    </div>
</section>

<!-- FAQ -->
<section id="faq" class="section section-beige">
    <div class="container faq-layout">
        <div class="faq-head">
            <?php tarik_heading($t['faq']['eyebrow'], $t['faq']['title'], $t['faq']['lead']); ?>
        </div>
        <div class="faq-list">
            <?php foreach ($t['faq']['items'] as $i => $item): ?>
                <details class="faq-item reveal"<?= $i === 0 ? ' open' : '' ?>>
                    <summary class="faq-q"><span><?= e($item['q']) ?></span><span class="faq-mark" aria-hidden="true"></span></summary>
                    <div class="faq-a"><p><?= e($item['a']) ?></p></div>
                </details>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Contact / Lead form -->
<section id="kontakt" class="section section-light">
    <div class="container contact-layout">
        <div class="contact-head">
            <?php tarik_heading($t['leadForm']['eyebrow'], $t['leadForm']['title'], $t['leadForm']['lead']); ?>
            <ul class="contact-list">
                <li>
                    <span class="contact-pin" aria-hidden="true">◉</span>
                    <span><?= e($company['street']) ?><br><?= e($company['zip']) ?> <?= e($company['city']) ?></span>
                </li>
                <li>
                    <a href="tel:<?= e($company['phoneHref']) ?>"><span class="contact-pin" aria-hidden="true">☎</span><span class="mono"><?= e($company['phone']) ?></span></a>
                </li>
                <li>
                    <a href="mailto:<?= e($company['email']) ?>"><span class="contact-pin" aria-hidden="true">✉</span><?= e($company['email']) ?></a>
                </li>
            </ul>
            <dl class="contact-reg">
                <div><dt>IČO</dt><dd><?= e($company['ico']) ?></dd></div>
                <div><dt>DIČ</dt><dd><?= e($company['dic']) ?></dd></div>
            </dl>
        </div>
        <div class="contact-form panel reveal">
            <?php tarik_lead_form($t, $locale, $company); ?>
        </div>
    </div>
</section>

<!-- Final CTA -->
<section class="section section-dark final-cta-wrap">
    <div class="container">
        <div class="final-cta reveal">
            <div class="final-cta-glow" aria-hidden="true"></div>
            <div class="final-cta-text">
                <h2><?= e($t['finalCta']['title']) ?></h2>
                <p><?= e($t['finalCta']['desc']) ?></p>
            </div>
            <div class="final-cta-actions">
                <a href="#kontakt" class="btn btn-light btn-lg"><?= e($t['finalCta']['cta']) ?></a>
                <a href="tel:<?= e($company['phoneHref']) ?>" class="btn btn-outline-light btn-lg"><span aria-hidden="true">☎</span> <?= e($t['finalCta']['phoneLabel']) ?></a>
            </div>
        </div>
    </div>
</section>

</main>

<!-- Footer -->
<footer class="site-footer">
    <div class="container footer-grid">
        <div class="footer-brand">
            <a href="<?= e($homeHref) ?>" class="footer-logo" aria-label="<?= e($company['name']) ?>">
                <img src="/assets/img/logo-ondark.png" alt="<?= e($company['name']) ?>" width="220" height="70">
            </a>
            <p class="footer-tagline"><?= e($t['footer']['tagline']) ?></p>
            <dl class="footer-reg">
                <div><dt>IČO</dt><dd><?= e($company['ico']) ?></dd></div>
                <div><dt>DIČ</dt><dd><?= e($company['dic']) ?></dd></div>
            </dl>
        </div>
        <nav class="footer-col" aria-label="<?= e($t['footer']['navTitle']) ?>">
            <h2 class="footer-title"><?= e($t['footer']['navTitle']) ?></h2>
            <ul>
                <?php foreach ($nav as $item): ?>
                    <li><a href="#<?= e($item['id']) ?>"><?= e($t['nav'][$item['key']]) ?></a></li>
                <?php endforeach; ?>
            </ul>
        </nav>
        <div class="footer-col">
            <h2 class="footer-title"><?= e($t['footer']['contactTitle']) ?></h2>
            <ul class="footer-contact">
                <li><?= e($company['street']) ?>, <?= e($company['zip']) ?> <?= e($company['city']) ?></li>
                <li><a href="tel:<?= e($company['phoneHref']) ?>" class="mono"><?= e($company['phone']) ?></a></li>
                <li><a href="mailto:<?= e($company['email']) ?>"><?= e($company['email']) ?></a></li>
                <li><a href="<?= e($privacy) ?>" class="footer-privacy"><?= e($t['footer']['privacy']) ?></a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h2 class="footer-title"><?= e($t['footer']['addressTitle']) ?></h2>
            <a href="<?= e($company['mapsLink']) ?>" target="_blank" rel="noopener noreferrer" class="footer-map">
                <iframe src="<?= e($company['mapsEmbed']) ?>" title="<?= e($company['mapsQuery']) ?>" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </a>
        </div>
    </div>
    <div class="container footer-bottom">
        <p>© <?= e($company['name']) ?> — <?= e($t['footer']['rights']) ?></p>
        <div class="lang-switch lang-switch-foot">
            <a href="<?= e($homeHref) ?>" class="lang-opt is-active"><?= e($t['locale'][$locale]) ?></a>
            <span class="lang-sep">/</span>
            <a href="<?= e($otherHref) ?>" class="lang-opt"><?= e($t['locale'][$other]) ?></a>
        </div>
    </div>
</footer>

<!-- Mobile sticky CTA -->
<a href="#kontakt" class="sticky-cta"><?= e($t['widget']['mobileCta']) ?></a>

<script src="/assets/js/main.js" defer></script>
</body>
</html>
    <?php
}

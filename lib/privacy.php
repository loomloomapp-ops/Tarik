<?php
require_once __DIR__ . '/data.php';

function tarik_render_privacy(string $locale): void
{
    $t = tarik_load($locale);
    $company = tarik_company();
    $p = $t['privacy'];
    $homeHref = $locale === 'uk' ? '/uk/' : '/';
    $htmlLang = $locale === 'uk' ? 'uk' : 'cs';
    ?>
<!DOCTYPE html>
<html lang="<?= e($htmlLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($p['title']) ?> — <?= e($company['name']) ?></title>
    <meta name="robots" content="noindex">
    <link rel="icon" href="/assets/img/logo-icon.png" type="image/png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body class="legal-body" data-locale="<?= e($locale) ?>">
<header class="site-header is-solid">
    <div class="container header-inner">
        <div class="header-left">
            <a href="<?= e($homeHref) ?>" class="logo" aria-label="<?= e($company['name']) ?>">
                <img src="/assets/img/logo.png" alt="<?= e($company['name']) ?>" class="logo-img" width="200" height="64">
            </a>
        </div>
        <div class="header-right">
            <a href="<?= e($homeHref) ?>" class="btn btn-ghost btn-sm">← <?= e($p['back']) ?></a>
        </div>
    </div>
</header>

<main class="legal">
    <div class="container legal-inner">
        <h1 class="legal-title"><?= e($p['title']) ?></h1>
        <p class="legal-note"><?= e($p['draftNote']) ?></p>
        <?php foreach ($p['sections'] as $s): ?>
            <section class="legal-section">
                <h2><?= e($s['h']) ?></h2>
                <p><?= e($s['p']) ?></p>
            </section>
        <?php endforeach; ?>
        <a href="<?= e($homeHref) ?>" class="btn btn-primary legal-back">← <?= e($p['back']) ?></a>
    </div>
</main>

<footer class="site-footer site-footer-min">
    <div class="container footer-bottom">
        <p>© <?= e($company['name']) ?> — <?= e($t['footer']['rights']) ?></p>
        <span class="mono footer-ico">IČO <?= e($company['ico']) ?></span>
    </div>
</footer>
</body>
</html>
    <?php
}

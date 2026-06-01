<?php
// Language-neutral company facts (mirrors src/content/company.ts).
function tarik_company(): array
{
    return [
        'name' => 'TARIK Invest s.r.o.',
        'street' => 'Chudenická 1059/30',
        'city' => 'Praha 10 – Hostivař',
        'zip' => '102 00',
        'ico' => '19728484',
        'dic' => 'CZ19728484',
        'phone' => '+420 774 285 158',
        'phoneHref' => '+420774285158',
        'email' => 'tarikinvest009@gmail.com',
        'mapsQuery' => 'Chudenická 1059/30, 102 00 Praha 10 – Hostivař',
        'mapsEmbed' => 'https://www.google.com/maps?q=Chuden%C3%ADck%C3%A1%201059%2F30%2C%20102%2000%20Praha%2010%20Hostiva%C5%99&output=embed',
        'mapsLink' => 'https://www.google.com/maps/search/?api=1&query=Chuden%C3%ADck%C3%A1%201059%2F30%2C%20102%2000%20Praha%2010%20Hostiva%C5%99',
        'social' => [
            'facebook' => '#',
            'instagram' => '#',
            'linkedin' => '#',
        ],
    ];
}

// Load the translation bundle for a locale ('cs' default, 'uk').
function tarik_load(string $locale): array
{
    $file = __DIR__ . '/' . ($locale === 'uk' ? 'uk.json' : 'cs.json');
    $raw = file_get_contents($file);
    return json_decode($raw, true);
}

// Shared anchor navigation (mirrors src/components/layout/nav.ts).
function tarik_nav(): array
{
    return [
        ['id' => 'services', 'key' => 'services'],
        ['id' => 'process', 'key' => 'process'],
        ['id' => 'projects', 'key' => 'projects'],
        ['id' => 'advantages', 'key' => 'advantages'],
        ['id' => 'kariera', 'key' => 'careers'],
        ['id' => 'faq', 'key' => 'faq'],
    ];
}

const TARIK_CONTACT_ANCHOR = 'kontakt';

// Project image order matches projects[].* in the JSON bundles.
function tarik_project_media(): array
{
    return [
        '/assets/img/projects/residential.jpg',
        '/assets/img/projects/commercial.jpg',
        '/assets/img/projects/industrial.jpg',
        '/assets/img/projects/warehouse.jpg',
    ];
}

// Escape helper.
function e($v): string
{
    return htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
}

// Split a "\n"-separated string into trimmed lines.
function tarik_lines($v): array
{
    return array_map('trim', explode("\n", (string) $v));
}

// Privacy page URL for the current locale.
function tarik_privacy_href(string $locale): string
{
    return $locale === 'uk' ? '/uk/privacy.php' : '/privacy.php';
}

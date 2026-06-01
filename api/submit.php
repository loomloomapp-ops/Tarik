<?php
// Form endpoint for the static (Node-less) deploy.
// Apache rewrites /api/lead and /api/career here. The Next.js client posts JSON
// and only checks for HTTP 200 + {"ok":true}.

header('Content-Type: application/json; charset=utf-8');

$EMAIL = 'tarikinvest009@gmail.com';
$NAME = 'TARIK Invest s.r.o.';

function out($ok, $code = 200)
{
    http_response_code($code);
    echo json_encode(['ok' => (bool) $ok], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    out(false, 405);
}

$uri = $_SERVER['REQUEST_URI'] ?? '';
$kind = strpos($uri, 'career') !== false ? 'career' : 'lead';

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST; // classic form fallback
}

// Honeypot — pretend success, do nothing.
if (!empty($data['company'])) {
    out(true);
}

$name = trim((string) ($data['name'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$digits = preg_replace('/\D+/', '', $phone);

if (mb_strlen($name) < 2 || strlen($digits) < 9) {
    out(false, 422);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    out(false, 422);
}

$order = $kind === 'career'
    ? ['name', 'phone', 'specialization', 'experience', 'city', 'documents', 'note', 'message']
    : ['name', 'phone', 'email', 'city', 'service', 'message', 'fileName'];

$rows = [strtoupper($kind) . ' · ' . strtoupper((string) ($data['locale'] ?? 'cs'))];
foreach ($order as $key) {
    $val = trim((string) ($data[$key] ?? ''));
    if ($val !== '') {
        $rows[] = ucfirst($key) . ': ' . $val;
    }
}
$rows[] = '';
$rows[] = 'Source: ' . (string) ($data['source'] ?? $kind);
$rows[] = 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '');
$rows[] = 'Time: ' . gmdate('Y-m-d H:i') . ' UTC';
$body = implode("\n", $rows);

$subject = ($kind === 'career' ? 'Nová přihláška do týmu — ' : 'Nová poptávka — ') . $name;
$host = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$headers = 'From: ' . $NAME . ' <noreply@' . $host . '>' . "\r\n";
if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers .= 'Reply-To: ' . $email . "\r\n";
}
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

@mail($EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

// Fallback log so submissions are never lost if mail transport is unavailable.
$dir = __DIR__ . '/_log';
if (!is_dir($dir)) {
    @mkdir($dir, 0775, true);
}
@file_put_contents(
    $dir . '/submissions.log',
    '==== ' . gmdate('Y-m-d H:i') . " UTC ====\n" . $body . "\n\n",
    FILE_APPEND | LOCK_EX
);

out(true);

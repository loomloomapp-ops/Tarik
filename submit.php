<?php
// Form handler for the lead-enquiry and careers forms.
// Validates input, emails the company, and returns JSON for the fetch() client
// (with a graceful redirect fallback for no-JS submissions).

require __DIR__ . '/lib/data.php';

$company = tarik_company();
$locale = ($_POST['locale'] ?? 'cs') === 'uk' ? 'uk' : 'cs';
$t = tarik_load($locale);
$err = $t['form']['errors'];

$wantsJson = (
    (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'fetch')
    || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)
);

function respond(bool $ok, array $extra, bool $wantsJson, string $locale): void
{
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array_merge(['ok' => $ok], $extra), JSON_UNESCAPED_UNICODE);
        exit;
    }
    $home = $locale === 'uk' ? '/uk/' : '/';
    $flag = $ok ? 'sent=1' : 'error=1';
    header('Location: ' . $home . '?' . $flag . '#kontakt');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, ['message' => 'method'], $wantsJson, $locale);
}

// Honeypot — silently accept (pretend success) if the hidden field is filled.
if (!empty($_POST['company'])) {
    respond(true, [], $wantsJson, $locale);
}

$type = ($_POST['type'] ?? 'lead') === 'career' ? 'career' : 'lead';
$name = trim((string) ($_POST['name'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$consent = !empty($_POST['consent']);

// Validation (mirrors the client-side rules).
$errors = [];
if (mb_strlen($name) < 2) {
    $errors['name'] = $err['name'];
}
$digits = preg_replace('/\D+/', '', $phone);
if (strlen($digits) < 9) {
    $errors['phone'] = $err['phone'];
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = $err['email'];
}
if (!$consent) {
    $errors['consent'] = $err['consent'];
}

if ($errors) {
    respond(false, ['errors' => $errors], $wantsJson, $locale);
}

// Build the message body from all submitted fields.
$labels = $t['form'];
$rows = [];
$rows[] = ($type === 'career' ? 'CAREER' : 'LEAD') . ' · ' . strtoupper($locale);
$rows[] = $labels['name'] . ': ' . $name;
$rows[] = $labels['phone'] . ': ' . $phone;
if ($email !== '') {
    $rows[] = $labels['email'] . ': ' . $email;
}
foreach (['city', 'service', 'specialization', 'experience', 'documents', 'message'] as $field) {
    $val = trim((string) ($_POST[$field] ?? ''));
    if ($val !== '') {
        $key = $field === 'message' && $type === 'career' ? 'note' : $field;
        $label = $labels[$key] ?? ucfirst($field);
        $rows[] = $label . ': ' . $val;
    }
}
if (!empty($_FILES['file']['name'])) {
    $rows[] = $labels['file'] . ': ' . $_FILES['file']['name']
        . ' (' . round(($_FILES['file']['size'] ?? 0) / 1024) . ' kB)';
}
$rows[] = '';
$rows[] = 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '');
$rows[] = 'UA: ' . ($_SERVER['HTTP_USER_AGENT'] ?? '');
$rows[] = 'Time: ' . gmdate('Y-m-d H:i') . ' UTC';

$body = implode("\n", $rows);
$subject = ($type === 'career' ? '[Kariéra] ' : '[Poptávka] ') . $company['name'] . ' — ' . $name;

$host = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$headers = [];
$headers[] = 'From: ' . $company['name'] . ' <noreply@' . $host . '>';
if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $email;
}
$headers[] = 'Content-Type: text/plain; charset=utf-8';
$headers[] = 'X-Mailer: TARIK-site';

$sent = @mail(
    $company['email'],
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers)
);

// Always log to a local file as a fallback so submissions are never lost,
// even if the mail transport on the host is unavailable.
$logDir = __DIR__ . '/uploads';
if (is_dir($logDir) && is_writable($logDir)) {
    @file_put_contents(
        $logDir . '/submissions.log',
        '==== ' . gmdate('Y-m-d H:i') . " UTC ====\n" . $body . "\n\n",
        FILE_APPEND | LOCK_EX
    );
}

respond(true, ['mailed' => (bool) $sent], $wantsJson, $locale);

<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Чек домена
$allowedOrigins = ['https://steam.afz.shop', 'https://afz-shop.ru'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';

$isValidOrigin = false;
foreach ($allowedOrigins as $allowed) {
    if (strpos($origin, $allowed) === 0 || strpos($referer, $allowed) === 0) {
        $isValidOrigin = true;
        break;
    }
}

if (!$isValidOrigin) {
    http_response_code(403);
    echo json_encode(['error' => 'Access denied']);
    exit;
}

$faqFile = 'faq.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($faqFile)) {
        echo file_get_contents($faqFile);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'FAQ file not found']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['faqs'])) {
        if (file_put_contents($faqFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to write file']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data format']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
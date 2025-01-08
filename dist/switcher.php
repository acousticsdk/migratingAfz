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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $maintenanceFile = 'maintenance.json';
    $status = isset($_POST['status']) ? $_POST['status'] === 'true' : false;
    
    $data = ['maintenanceMode' => $status];
    
    if (file_put_contents($maintenanceFile, json_encode($data))) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to write file']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
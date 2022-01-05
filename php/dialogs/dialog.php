<?php

header('Content-Type: application/json; charset=utf-8');

$post = $_POST['text'];
$html = file_get_contents('text_dialog.php');
$json_array = array(
    'text' => '5',
    'html' => $html,
    'post' => $post
);
$json_data = json_encode($json_array);
echo $json_data;

//$dialog = file_get_contents('text_dialog.php');
//echo 'Значение из AJAX: '.$post.'<br>';
//echo $dialog;



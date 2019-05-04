<?php

header('Content-type: text/javascript');

$includeKeys =__DIR__ . '/../../lych-cottage-keys.php';
require_once ( $includeKeys );

$includeFunctions =__DIR__ . '/functions.php';
include( $includeFunctions );

$articles = json_decode(getRecentArticles(10,0), true);  

foreach($articles as $key => $article){
    
    $articles[$key]['images'] = json_decode(getImagesForArticle($article['article_id']), true);
    
}

echo json_encode($articles, JSON_PRETTY_PRINT);
<?php

function getRecentArticles($limit, $offset){
    
    $link = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die( mysqli_connect_errno() . ": " . mysqli_connect_error() );
    
    $output = [];
    $num = 0;
    
    $select_sql = " SELECT 
                        articles.article_id,
                        articles.article_title,
                        articles.article_description,
                        articles.article_type,
                        articles.date_created
                    FROM lych_cottage.articles
                    ORDER BY articles.date_created DESC
                    LIMIT ?,?;";
    
    if ($select_stmt = mysqli_prepare($link, $select_sql) or die(mysqli_error($link))) {
        mysqli_stmt_bind_param($select_stmt, "ii", $offset, $limit);
        mysqli_stmt_execute($select_stmt);
        mysqli_stmt_bind_result($select_stmt, $article_id, $article_title, $article_description, $article_type, $date_created);
        while(mysqli_stmt_fetch($select_stmt)){
             
            $output[$num]['article_id'] = $article_id;
            $output[$num]['article_title'] = $article_title;
            $output[$num]['article_description'] = $article_description;
            $output[$num]['article_type'] = $article_type;
            $output[$num]['date_created'] = date("M j, Y", strtotime($date_created));
            
            $num++;
        }
        mysqli_stmt_close($select_stmt);    
        
    }
    
    mysqli_close($link);
    
    return json_encode($output, JSON_PRETTY_PRINT);
    
}

function getImagesForArticle($article_id){
    
    $link = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die( mysqli_connect_errno() . ": " . mysqli_connect_error() );
    
    $output = [];
    $num = 0;
    
    $select_sql = " SELECT 
                        images.image_url,
                        images.image_alt
                    FROM lych_cottage.images
                    WHERE images.article_id = ?
                    LIMIT 100;";
    
    if ($select_stmt = mysqli_prepare($link, $select_sql) or die(mysqli_error($link))) {
        mysqli_stmt_bind_param($select_stmt, "i", $article_id);
        mysqli_stmt_execute($select_stmt);
        mysqli_stmt_bind_result($select_stmt, $image_url, $image_alt);
        while(mysqli_stmt_fetch($select_stmt)){
             
            $output[$num]['image_url'] = $image_url;
            $output[$num]['image_alt'] = $image_alt;
            
            $num++;
        }
        mysqli_stmt_close($select_stmt);    
        
    }
    
    mysqli_close($link);
    
    return json_encode($output, JSON_PRETTY_PRINT);
    
}
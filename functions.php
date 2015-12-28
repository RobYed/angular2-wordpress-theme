<?php

function add_scripts() {
    wp_enqueue_style( 'app-style', get_stylesheet_directory_uri() . '/style.css', '0.1.0', false );
    wp_enqueue_script( 'app-bundle', get_stylesheet_directory_uri() . '/app.js', '0.1.0', true ); 
}
add_action( 'wp_enqueue_scripts', 'add_scripts' );

?>
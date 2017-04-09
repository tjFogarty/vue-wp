<?php

$context = Timber::get_context();

$recent = wp_get_recent_posts([
    'numberposts' => 1,
]);

$post = Timber::get_post($recent[0]['ID']);

$context['post'] = $post;
$context['title'] = $post->title;

Timber::render('single.twig', $context);

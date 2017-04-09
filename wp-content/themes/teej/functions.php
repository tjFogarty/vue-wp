<?php
namespace Teej;

use Timber;
use Routes;
use TimberMenu;
use TimberSite;
use Twig_Extension_StringLoader;
use Twig_SimpleFilter;
use MatthiasMullie\Minify;

require __DIR__ . '/vendor/autoload.php';

if (!class_exists('Timber')) {
    add_action('admin_notices', function () {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
    });

    add_filter('template_include', function ($template) {
        return get_stylesheet_directory() . '/static/no-timber.html';
    });

    return;
}

Timber::$dirname = array('templates', 'views', 'partials');

class TeejSite extends TimberSite
{
    public function __construct()
    {
        add_theme_support('post-formats');
        add_theme_support('post-thumbnails');
        add_theme_support('menus');
        add_theme_support('html5', ['comment-list', 'comment-form', 'search-form', 'gallery', 'caption']);
        add_filter('timber_context', [$this, 'addToContext']);
        add_filter('get_twig', [$this, 'addToTwig']);
        add_action('init', [$this, 'registerPostTypes']);
        add_action('init', [$this, 'registerTaxonomies']);
        add_action('wp_enqueue_scripts', [$this, 'unloadAssets']);

        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_styles', 'print_emoji_styles');

        add_filter('style_loader_src', [$this, 'removeAssetVer'], 10, 2);
        add_filter('script_loader_src', [$this, 'removeAssetVer'], 10, 2);

        parent::__construct();
    }

    public function removeAssetVer($src)
    {
        if (strpos($src, '?ver=')) {
            $src = remove_query_arg('ver', $src);
        }

        return $src;
    }

    public function unloadAssets()
    {
        wp_deregister_script('wp-embed');
    }

    public function registerPostTypes()
    {
        //this is where you can register custom post types
    }

    public function registerTaxonomies()
    {
        //this is where you can register custom taxonomies
    }

    public function addToContext($context)
    {
        $context['menu'] = new TimberMenu();
        $context['site'] = $this;
        return $context;
    }

    public function mix($asset)
    {
        return get_template_directory_uri() . mix($asset, __DIR__);
    }

    public function minify($asset)
    {
        $sourcePath = get_template_directory() . mix($asset, __DIR__);

        $minifier = new Minify\CSS($sourcePath);

        return $minifier->minify();
    }

    public function addToTwig($twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        $twig->addFilter('mix', new Twig_SimpleFilter('mix', [$this, 'mix']));
        $twig->addFilter('minify', new Twig_SimpleFilter('minify', [$this, 'minify']));
        return $twig;
    }
}

Routes::map('offline', function ($params) {
    Routes::load('offline.php', null, null, 200);
});

new TeejSite();

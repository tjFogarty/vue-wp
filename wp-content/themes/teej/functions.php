<?php
namespace Teej;

use Timber;
use Routes;
use TimberMenu;
use TimberSite;
use Twig_Extension_StringLoader;
use Twig_SimpleFilter;
use WP_Query;

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
        add_action('wp_enqueue_scripts', [$this, 'setupAssets']);

        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_styles', 'print_emoji_styles');

        add_filter('style_loader_src', [$this, 'removeAssetVer'], 10, 2);
        add_filter('script_loader_src', [$this, 'removeAssetVer'], 10, 2);

        parent::__construct();
    }
    
    // thank you, kind sir, who created this:
    // https://gist.github.com/noahbass/f7ed91473bcf93bbb95f
    public function siteLastUpdated($d = 'd-m-y H:i')
    {
        $recent = new WP_Query("showposts=1&orderby=modified&post_status=publish");

        if ($recent->have_posts()) {
            while ($recent->have_posts()) {
                $recent->the_post();
                $lastUpdated = get_the_modified_date($d);
            }

            return $lastUpdated;
        }
        
        return '';
    }

    public function removeAssetVer($src)
    {
        if (strpos($src, '?ver=')) {
            $src = remove_query_arg('ver', $src);
        }

        return $src;
    }

    public function setupAssets()
    {
        wp_deregister_script('wp-embed');
        
        wp_enqueue_style('app-styles', get_stylesheet_directory_uri() . '/assets/css/main.css', [], '', 'all');
        wp_enqueue_script('app-manifest', get_stylesheet_directory_uri() . '/assets/js/manifest.js', [], false, true);
        wp_enqueue_script('app-vendor', get_stylesheet_directory_uri() . '/assets/js/vendor.js', [], false, true);
        wp_enqueue_script('app', get_stylesheet_directory_uri() . '/assets/js/main.js', [], false, true);

        wp_localize_script('app', 'WP_API_SETTINGS', [
            'root' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
        ]);
        
        wp_localize_script('app', 'WP_SETTINGS', [
            'siteName' => get_bloginfo(),
            'lastUpdated' => $this->siteLastUpdated()
        ]);
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

    public function addToTwig($twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        return $twig;
    }
}

Routes::map('offline', function ($params) {
    Routes::load('offline.php', null, null, 200);
});

new TeejSite();

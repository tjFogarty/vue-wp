<?php
namespace Teej;

use Timber;
use TimberMenu;
use TimberSite;
use Twig_Extension_StringLoader;
use Twig_SimpleFilter;

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

Timber::$dirname = array('templates', 'views');

class TeejSite extends TimberSite
{
    public function __construct()
    {
        add_theme_support('post-formats');
        add_theme_support('post-thumbnails');
        add_theme_support('menus');
        add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));
        add_filter('timber_context', array($this, 'addToContext'));
        add_filter('get_twig', array($this, 'addToTwig'));
        add_action('init', array($this, 'registerPostTypes'));
        add_action('init', array($this, 'registerTaxonomies'));
        parent::__construct();
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

    public function addToTwig($twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        $twig->addFilter('mix', new Twig_SimpleFilter('mix', [$this, 'mix']));
        return $twig;
    }
}

new TeejSite();

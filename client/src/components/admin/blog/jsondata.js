const blog_meta_structure = [
    { type: 'meta_title', content: '' },
    { type: 'meta_description', content: '' },
    { type: 'meta_keywords', content: '' },
    { type: 'meta_robots', content: '' },
]

const blog_og_structure = [
    { type: 'og_locale', content: '' },
    { type: 'og_type', content: '' },
    { type: 'og_title', content: '' },
    { type: 'og_description', content: '' },
    { type: 'og_url', content: '' },
    { type: 'og_site_name', content: '' },
    { type: 'og_image', content: '' },
    { type: 'og_image_secure_url', content: '' },
    { type: 'og_image_width', content: '' },
    { type: 'og_image_height', content: '' },
    { type: 'og_image_alt', content: '' },
    { type: 'og_image_type', content: '' },
]

const blog_twitter_structure = [
    { type: 'twitter_card', content: '' },
    { type: 'twitter_title', content: '' },
    { type: 'twitter_description', content: '' },
    { type: 'twitter_site', content: '' },
    { type: 'twitter_creator', content: '' },
    { type: 'twitter_image', content: '' },
]

const blog_art_structure = [
    { type: 'article_tag', content: '' },
    { type: 'article_section', content: '' },
]

const blog_structure = [
    { type: 'url_slug', content: '' },
    { type: 'canonical', content: '' },
    { type: 'category', content: '' },
    { type: 'author_name', content: '' },
    { type: 'time_to_read', content: '' },
    { type: 'blog_title', content: '' },
]

const blog_export = [
    {
        meta_title: '', meta_description: '', canonical: '', category: '', author_name: '', blog_title: '', blog_content: '',
    }
]

export {
    blog_structure, blog_meta_structure, blog_og_structure, blog_twitter_structure, blog_art_structure, blog_export
}
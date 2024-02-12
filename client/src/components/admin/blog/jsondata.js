const blog_structure = [
    { type: 'meta_title', content: '', id: 1, primary: true },
    { type: 'meta_description', content: '', id: 2, primary: true },
    { type: 'canonical', content: '', id: 3, primary: true },
    { type: 'category', content: '', id: 4, primary: true },
    { type: 'author_name', content: '', id: 5, primary: true },
    { type: 'blog_title', content: '', id: 6, primary: true },
    { type: 'content', content: '', id: 7, primary: true },
    { type: 'image', content: '', id: 8, primary: true },
]

const blog_export = [
    {
        meta_title: '', meta_description: '', canonical: '', category: '', author_name: '', blog_title: '', blog_content: '',
    }
]

export {
    blog_structure, blog_export
}
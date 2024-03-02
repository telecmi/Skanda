import React, { Component } from 'react';
import { XMarkIcon, ChevronUpIcon, ChevronDownIcon, EyeIcon } from '@heroicons/react/24/solid'
import { blog_structure } from './jsondata'
import AppStateContext from '../../../utils/AppStateContext';
import axios from 'axios';
import BlogMetaData from './meta';
import BlogOgData from './og';
import BlogTwitterData from './twitter';
import BlogArtData from './art';
import AditionalData from './additionalData';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Tab from './table'
import 'react-calendar/dist/Calendar.css';
import Preview from './preview';


const solutions = [
    { tag: 'h2' },
    { tag: 'h3' },
    { tag: 'h4' },
    { tag: 'h5' },
    { tag: 'h6' },
];

class Page extends Component {

    static contextType = AppStateContext

    constructor(props) {
        super(props);

        this.state = {
            data: blog_structure,
            blogExportData: '',
            inputTitle: '',
            inputContent: '',
            fieldValidations: Array(blog_structure.length).fill(true),
            value: new Date(),
            sectionData: [],
            blogData: [],
            additional_data: [
                { "stick_to_top": false },
                { "schedule": Date.now() },
                { "allow_comment": false },
            ],
            openIndex: false,
            addData: false,
            jsondata: {
                "url_slug": "",
                "canonical": "",
                "category": "",
                "author_name": "",
                "time_to_read": "",
                "blog_title": "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.tagRef = React.createRef();
        this.removeSecDataField = this.removeSecDataField.bind(this);

    }

    handleOutsideClick = (event) => {
        if (this.tagRef.current && !this.tagRef.current.contains(event.target)) {
            this.setState({ openIndex: false });
        }
    };

    onChange(value) {
        this.setState({ value, selectDate: false });
    }
    capitalize(str) {
        const capitalizedWords = str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    }
    addSection = (type) => {
        if (type === 'testimonials') {
            const newData = { type: "testimonials", id: this.generateUniqueId(), data: [{ description: "", img: "", name: "", role: "", id: this.generateUniqueId() }] }
            this.setState({ sectionData: this.state.sectionData.concat(newData) });
        }
        else if (type === 'recommended_reading') {
            const newData = { type: "recommended_reading", id: this.generateUniqueId(), data: [{ description: "", link: "", id: this.generateUniqueId() }] }
            this.setState({ sectionData: this.state.sectionData.concat(newData) });
        }
        else if (type === 'faq') {
            const newData = { type: 'faq', data: [{ question: "", answer: "", id: this.generateUniqueId() }], id: this.generateUniqueId() };
            this.setState({ sectionData: this.state.sectionData.concat(newData) });
        }
        else if (type === 'cta') {
            const newData = { type: 'cta', data: [], id: this.generateUniqueId() };
            this.setState({ sectionData: this.state.sectionData.concat(newData) });
        }
        else if (type === 'section') {
            const newData = { type: "section", id: this.generateUniqueId(), data: [{ title: "heading", content: "", titleTag: "h2", id: this.generateUniqueId() }, { title: "description", content: '', id: this.generateUniqueId() }] }
            this.setState({ sectionData: this.state.sectionData.concat(newData) });
        } else {
            const newData = { type: type.includes('_') ? this.capitalize(type) : type, content: '', id: this.state.data.length + 1 };
            this.setState({ data: [...this.state.data, newData] });
        }
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };
    updateContent = (key, value) => {
        this.setState(prevState => ({
            jsondata: {
                ...prevState.jsondata,
                [key]: value
            }
        }));
    };
    updateFaqQuestion = (content, sectionId) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secData => ({
                ...secData,
                question: secData.id === sectionId ? content : secData.question
            }))
        }));
        this.setState({ sectionData: updatedSectionData });
    };
    updateFaqAnswer = (content, sectionId) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secData => ({
                ...secData,
                answer: secData.id === sectionId ? content : secData.answer
            }))
        }));
        this.setState({ sectionData: updatedSectionData });
    };
    updateRCDesc = (content, sectionId) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secData => ({
                ...secData,
                description: secData.id === sectionId ? content : secData.description
            }))
        }));
        this.setState({ sectionData: updatedSectionData });
    };
    updateRCLink = (content, sectionId) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secData => ({
                ...secData,
                link: secData.id === sectionId ? content : secData.link
            }))
        }));
        this.setState({ sectionData: updatedSectionData });
    };
    updatetestiDesc = (content, sectionId) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secData => ({
                ...secData,
                description: secData.id === sectionId ? content : secData.description
            }))
        }));
        this.setState({ sectionData: updatedSectionData });
    }
    updateTestiImg = (content, sectionId) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secData => ({
                ...secData,
                img: secData.id === sectionId ? content : secData.img
            }))
        }));
        this.setState({ sectionData: updatedSectionData });
    }
    updateTestiName = (content, sectionId) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secData => ({
                ...secData,
                name: secData.id === sectionId ? content : secData.name
            }))
        }));
        this.setState({ sectionData: updatedSectionData });
    }
    updateTestiRole = (content, sectionId) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secData => ({
                ...secData,
                role: secData.id === sectionId ? content : secData.role
            }))
        }));
        this.setState({ sectionData: updatedSectionData });
    }
    secDataRemoveFaq = (removedSecData) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.filter(secData => secData.id !== removedSecData.id)
        }));
        this.setState({ sectionData: updatedSectionData });
    };
    updateSecData = (e, secData) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secDataItem => {
                if (secDataItem.id === secData.id) {
                    return { ...secDataItem, content: e.target.value };
                }
                return secDataItem;
            })
        }));
        this.setState({ sectionData: updatedSectionData });
    }
    handleFileUpload = (e, id) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const fileData = reader.result;
            const updatedSectionData = this.state.sectionData.map(blog => ({
                ...blog,
                data: blog.data.map(secDataItem => {
                    if (secDataItem.id === id) {
                        return { ...secDataItem, content: fileData };
                    }
                    return secDataItem;
                })
            }));
            this.setState({ sectionData: updatedSectionData });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    altText = (e, secData) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.map(secDataItem => {
                if (secDataItem.id === secData.id) {
                    return { ...secDataItem, alt: e.target.value };
                }
                return secDataItem;
            })
        }))
        this.setState({ sectionData: updatedSectionData });
    }
    secDataRemove = (e) => {
        const updatedSectionData = this.state.sectionData.map(blog => ({
            ...blog,
            data: blog.data.filter(secData => secData.id !== e.id)
        }));
        this.setState({ sectionData: updatedSectionData });
    }
    titleTag = (e, section) => {
        this.state.sectionData.forEach((blog) => {
            blog.data.forEach((secData) => {
                if (secData.id === section) {
                    secData.titleTag = e
                }
            })
            this.setState({ openIndex: false })
        })
    }
    toggleMenu = (index) => {
        this.setState((prevState) => ({
            openIndex: prevState.openIndex === index ? null : index
        }));
    };
    sectionTitle = (e) => {
        e.data.push({ title: "heading", content: "", titleTag: "h2", id: this.generateUniqueId() })
        this.setState({ sectionData: this.state.sectionData })
    }
    sectionDesc = (e) => {
        e.data.push({ title: "description", content: "", id: this.generateUniqueId() })
        this.setState({ sectionData: this.state.sectionData })
    }
    sectionImg = (e) => {
        e.data.push({ title: "image", content: "", alt: '', id: this.generateUniqueId() })
        this.setState({ sectionData: this.state.sectionData })
    }
    sectionVid = (e) => {
        e.data.push({ title: "video", content: "", alt: '', id: this.generateUniqueId() })
        this.setState({ sectionData: this.state.sectionData })
    }
    sectionTab = (e) => {
        e.data.push({ title: "table", content: "", id: this.generateUniqueId() })
        this.setState({ sectionData: this.state.sectionData })
    }
    sectionButton = (e) => {
        e.data.push({ title: "button", content: "", id: this.generateUniqueId() })
        this.setState({ sectionData: this.state.sectionData })
    }
    sectionCta = (e) => {
        e.data.push({ title: "cta", content: "", id: this.generateUniqueId() })
        this.setState({ sectionData: this.state.sectionData })
    }
    sectionFaq = (e) => {
        e.data.push({ question: "", answer: "", id: this.generateUniqueId() })
        this.setState({ sectionData: this.state.sectionData })
    }
    sectionRC = (e) => {
        e.data.push({ description: "", link: "", id: this.generateUniqueId() })
        this.setState({ sectionData: this.state.sectionData })
    }
    removeField = (e) => {
        const newData = [...this.state.data];
        newData.splice(e, 1);
        this.setState({ data: newData });
    }
    removeSecDataField = (e) => {
        const updatedSectionData = this.state.sectionData.filter(item => item.id !== e.id);
        this.setState({ sectionData: updatedSectionData });
    };
    moveItem = (parentId, childId, direction) => {
        this.setState(prevState => {
            const updatedData = prevState.sectionData.map(section => {
                if (section.id === parentId) {
                    const index = section.data.findIndex(child => child.id === childId);
                    if (direction === 'up' && index > 0) {
                        const newData = Array.from(section.data);
                        [newData[index], newData[index - 1]] = [newData[index - 1], newData[index]];
                        return { ...section, data: newData };
                    }
                    if (direction === 'down' && index < section.data.length - 1) {
                        const newData = Array.from(section.data);
                        [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
                        return { ...section, data: newData };
                    }
                }
                return section;
            });
            return { sectionData: updatedData };
        });
    };
    moveParent = (parentId, direction) => {
        this.setState(prevState => {
            const index = prevState.sectionData.findIndex(section => section.id === parentId);
            if (direction === 'up' && index > 0) {
                const newData = Array.from(prevState.sectionData);
                [newData[index], newData[index - 1]] = [newData[index - 1], newData[index]];
                return { sectionData: newData };
            }
            if (direction === 'down' && index < prevState.sectionData.length - 1) {
                const newData = Array.from(prevState.sectionData);
                [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
                return { sectionData: newData };
            }
            return null; // No change if index is at the boundaries
        });
    }
    generateUniqueId() {
        const randomString = Math.random().toString(36).substr(2, 10);
        return `${new Date().getTime()}_${randomString}`;
    }
    submit = () => {

        const { blogMetaData, blogArtData, blogOgData, blogTwitterData, blogTableData, stickTop, comment, pubDate } = this.context

        let additional_data = {
            "stick_to_top": stickTop,
            "schedule": pubDate,
            "allow_comment": comment,
        }

        let data = {
            "meta": blogMetaData,
            "article": blogArtData,
            "twitter": blogTwitterData,
            "og": blogOgData,
            "url_slug": this.state.jsondata.url_slug,
            "canonical": this.state.jsondata.canonical,
            "category": this.state.jsondata.category,
            "author_name": this.state.jsondata.author_name,
            "time_to_read": this.state.jsondata.time_to_read,
            "blog_title": this.state.jsondata.blog_title,
            "blog_data": this.state.sectionData,
            "additional_data": additional_data
        }

        console.log(data)

        // axios.post('https://bf18-202-21-44-91.ngrok-free.app/blog_add', data).then((res) => {

        // }).catch((err) => console.error(err))


        this.state.sectionData.forEach((e) => {
            e.data.forEach((lk) => {
                if (lk.id === blogTableData.id) {
                    lk.content = blogTableData.data
                }
            })
        })

    }
    cancel = () => {
        const { setAddBlogModal, setStickTop, setComment } = this.context;
        setAddBlogModal(false);
        setStickTop(false);
        setComment(false);
        blog_structure.forEach((e) => {
            e.content = ''
        })
        this.setState({ back: true })
    }
    preview = () => {

        const { blogMetaData, blogArtData, blogOgData, blogTwitterData, blogTableData, stickTop, comment, pubDate, setPreview } = this.context

        setPreview(true)

        let additional_data = {
            "stick_to_top": stickTop,
            "schedule": pubDate,
            "allow_comment": comment,
        }

        this.state.sectionData.forEach((e) => {
            e.data.forEach((lk) => {
                if (lk.id === blogTableData.id) {
                    lk.content = blogTableData.data
                }
            })
        })

        let data = {
            "meta": blogMetaData,
            "article": blogArtData,
            "twitter": blogTwitterData,
            "og": blogOgData,
            "url_slug": this.state.jsondata.url_slug,
            "canonical": this.state.jsondata.canonical,
            "category": this.state.jsondata.category,
            "author_name": this.state.jsondata.author_name,
            "time_to_read": this.state.jsondata.time_to_read,
            "blog_title": this.state.jsondata.blog_title,
            "blog_data": this.state.sectionData,
            "additional_data": additional_data
        }

        this.setState({ preview: true })
        this.setState({ previewData: data })


    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    }

    render() {
        return (

            <div className='mx-8'>
                {/* {this.state.back && <Navigate to='/' />} */}
                {/* {this.state.preview && <Navigate to='/preview' />} */}

                {this.context.preview && <Preview previewData={this.state.previewData} />}

                <div className='h-10 fixed right-0 justify-end z-10 '>
                    <AditionalData popupOpen={this.state.addData} />
                </div>
                <div className='h-10 fixed right-3 top-16 justify-end z-10 '>
                    <button type="button" className="rounded-full bg-gray-400 p-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400" >
                        <EyeIcon onClick={this.preview} className='w4- h-4 cursor-pointer' />
                    </button>
                </div>


                <div className="flex">

                    <div className="flex w-full overflow-y-auto">

                        <div className="p-10 w-full bg-gray-100  shadow-sm border rounded-xl my-4">

                            <div className=" gap-x-8 gap-y-6 ">

                                <BlogMetaData />

                                <BlogOgData />

                                <BlogTwitterData />

                                <BlogArtData />

                                {this.state.data.map((section, index) => (
                                    <div key={index} className="sm:col-span-2">
                                        <label className="mt-2 block text-sm font-semibold capitalize leading-6 text-gray-900">
                                            {section.type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                        </label>
                                        <div className="">
                                            {
                                                <div className='relative'>
                                                    <input value={this.state.jsondata[section.type]} type='text' onChange={(e) => this.updateContent(section.type, e.target.value)}
                                                        className={`block w-full rounded-md  px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}

                                {
                                    this.state.sectionData.map((section, index) => (
                                        <div key={index} className="sm:col-span-2">
                                            <label className="mt-2 block text-sm font-semibold capitalize leading-6 text-gray-900">
                                                {section.type === 'faq' || section.type === 'cta' ?
                                                    (section.type && section.type.toUpperCase()) :
                                                    section.type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                            </label>
                                            <div className='relative ring-1 p-4 rounded-md'>
                                                <div className=' flex flex-col gap-x-6 justify-between'>
                                                    {section.type === 'section' ?
                                                        <div className='flex gap-x-4'>
                                                            <span onClick={() => this.sectionTitle(section)} className="inline-flex cursor-pointer bg-white items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-400">
                                                                Title
                                                            </span>
                                                            <span onClick={() => this.sectionDesc(section)} className="inline-flex cursor-pointer bg-white items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-400">
                                                                Description
                                                            </span>
                                                            <span onClick={() => this.sectionImg(section)} className="inline-flex cursor-pointer bg-white items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-400">
                                                                Image
                                                            </span>
                                                            <span onClick={() => this.sectionVid(section)} className="inline-flex cursor-pointer bg-white items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-400">
                                                                Video
                                                            </span>
                                                            <span onClick={() => this.sectionTab(section)} className="inline-flex cursor-pointer bg-white items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-400">
                                                                Table
                                                            </span>
                                                            <span onClick={() => this.sectionButton(section)} className="inline-flex cursor-pointer bg-white items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-400">
                                                                button
                                                            </span>
                                                        </div> :
                                                        section.type === 'faq' ?
                                                            <div className='flex gap-x-4'>
                                                                <span onClick={() => this.sectionFaq(section)} className="inline-flex cursor-pointer bg-white items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-400">
                                                                    Add
                                                                </span>
                                                            </div> :
                                                            section.type === 'recommended_reading' ?
                                                                <div className='flex gap-x-4'>
                                                                    <span onClick={() => this.sectionRC(section)} className="inline-flex cursor-pointer bg-white items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-400">
                                                                        Add
                                                                    </span>
                                                                </div> :
                                                                section.type === 'cta' ?
                                                                    <div className='flex gap-x-4'>
                                                                        <span className="inline-flex bg-white items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-400">
                                                                            CTA Button
                                                                        </span>
                                                                        {/* <div onClick={() => this.removeSecDataField(section)} className=' absolute -top-2 -right-2 bg-gray-500 p-1 rounded-full cursor-pointer'>
                                                                            <XMarkIcon className='w-4 text-white' />
                                                                        </div> */}
                                                                        <div>
                                                                            <div onClick={() => this.removeSecDataField(section)} className=' absolute -right-[6px] -top-2 bg-gray-500 p-[1px] rounded-full cursor-pointer'>
                                                                                <XMarkIcon className='w-4 text-white' />
                                                                            </div>
                                                                            <div className='absolute right-[32px] -top-2 flex gap-x-3'>
                                                                                <div onClick={() => this.moveParent(section.id, 'up')} title='Move Up' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                    <ChevronUpIcon className='w-3 text-white font-bold' />
                                                                                </div>
                                                                                <div onClick={() => this.moveParent(section.id, 'down')} title='Move Down' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                    <ChevronDownIcon className='w-3 text-white font-bold' />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> : ''
                                                    }
                                                    <div className='w-full'>
                                                        {
                                                            section.data.map((secData, secIndex) => (
                                                                <div key={secIndex}>
                                                                    <div className=' relative'>
                                                                        <div className='flex gap-x-2 my-5 items-baseline'>

                                                                            <label className=" block text-sm font-semibold capitalize leading-6 text-gray-900">
                                                                                {secData.title}
                                                                            </label>

                                                                            {secData.title === 'heading' &&
                                                                                <div>
                                                                                    <Popover className="relative">
                                                                                        <Popover.Button onClick={() => this.toggleMenu(secData.id)} className=" justify-center flex items-center gap-x-1 text-sm p-1 font-medium text-gray-900">
                                                                                            <span>- {secData.titleTag ? secData.titleTag : ''}</span>
                                                                                            <ChevronDownIcon className="w-[14px]" aria-hidden="true" />
                                                                                        </Popover.Button>
                                                                                        <Transition show={this.state.openIndex === secData.id} as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1" >
                                                                                            <Popover.Panel ref={this.tagRef} className="absolute left-1/2 z-10  flex w-screen max-w-min -translate-x-1/2 px-4">
                                                                                                <div className="w-fit shrink rounded-xl bg-white py-1 px-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                                                                                                    {solutions.map((item) => (
                                                                                                        <p key={item.tag} onClick={() => this.titleTag(item.tag, secData.id)} className="block p-2 cursor-pointer hover:text-indigo-600">
                                                                                                            {item.tag}
                                                                                                        </p>
                                                                                                    ))}
                                                                                                </div>
                                                                                            </Popover.Panel>
                                                                                        </Transition>
                                                                                    </Popover>
                                                                                </div>
                                                                            }
                                                                        </div>

                                                                        {
                                                                            section.type === 'testimonials' ?
                                                                                <div className=' ring-slate-400 rounded-md'>
                                                                                    <div className='flex flex-col gap-y-3'>
                                                                                        <label className=' text-xs font-medium' >Description</label>
                                                                                        <textarea rows={3} value={secData.description} type={'text'} onChange={(e) => this.updatetestiDesc(e.target.value, secData.id)} className={`block w-full rounded-md px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                        <label className=' text-sm font-medium'>Image</label>
                                                                                        <input value={secData.img} type='file' onChange={(e) => this.updateTestiImg(e.target.value, secData.id)} className={`block w-full rounded-md text-sm px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                        <label className=' text-sm font-medium'>Name</label>
                                                                                        <input value={secData.name} type={'text'} onChange={(e) => this.updateTestiName(e.target.value, secData.id)} className={`block w-full rounded-md px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                        <label className=' text-sm font-medium'>Role</label>
                                                                                        <input value={secData.role} type={'text'} onChange={(e) => this.updateTestiRole(e.target.value, secData.id)} className={`block w-full rounded-md px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                    </div>
                                                                                </div> :
                                                                                section.type === 'faq' ?
                                                                                    <div className='ring-1 ring-slate-400 rounded-md p-5'>
                                                                                        <div className='flex flex-col gap-y-3'>
                                                                                            <label className=' text-xs font-medium' >Question</label>
                                                                                            <input value={secData.question} type={'text'} onChange={(e) => this.updateFaqQuestion(e.target.value, secData.id)} className={`block w-full rounded-md px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                            <label className=' text-sm font-medium'>Answer</label>
                                                                                            <textarea rows={3} value={secData.answer} type={'text'} onChange={(e) => this.updateFaqAnswer(e.target.value, secData.id)} className={`block w-full rounded-md px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                        </div>
                                                                                        {
                                                                                            section.data.length > 1 &&
                                                                                            <div>
                                                                                                <div onClick={() => this.secDataRemoveFaq(secData)} className=' absolute -right-[6px] top-3 bg-gray-500 p-[1px] rounded-full cursor-pointer'>
                                                                                                    <XMarkIcon className='w-3 text-white' />
                                                                                                </div>
                                                                                                <div className='absolute right-[32px] top-3 flex gap-x-3'>
                                                                                                    <div onClick={() => this.moveItem(section.id, secData.id, 'up')} title='Move Up' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                                        <ChevronUpIcon className='w-3 text-white font-bold' />
                                                                                                    </div>
                                                                                                    <div onClick={() => this.moveItem(section.id, secData.id, 'down')} title='Move Down' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                                        <ChevronDownIcon className='w-3 text-white font-bold' />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                    :
                                                                                    section.type === 'recommended_reading' ?
                                                                                        <div className='ring-1 ring-slate-400 rounded-md p-5'>
                                                                                            <div className='flex flex-col gap-y-3'>
                                                                                                <label className=' text-xs font-medium' >Description</label>
                                                                                                <input value={secData.description} type={'text'} onChange={(e) => this.updateRCDesc(e.target.value, secData.id)} className={`block w-full rounded-md px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                                <label className=' text-sm font-medium'>Link</label>
                                                                                                <input value={secData.link} type={'text'} onChange={(e) => this.updateRCLink(e.target.value, secData.id)} className={`block w-full rounded-md px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                            </div>
                                                                                            {section.data.length > 1 &&
                                                                                                <div>
                                                                                                    <div onClick={() => this.secDataRemoveFaq(secData)} className=' absolute -right-[6px] top-3 bg-gray-500 p-[1px] rounded-full cursor-pointer'>
                                                                                                        <XMarkIcon className='w-3 text-white' />
                                                                                                    </div>
                                                                                                    <div className='absolute right-[32px] top-3 flex gap-x-3'>
                                                                                                        <div onClick={() => this.moveItem(section.id, secData.id, 'up')} title='Move Up' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                                            <ChevronUpIcon className='w-3 text-white font-bold' />
                                                                                                        </div>
                                                                                                        <div onClick={() => this.moveItem(section.id, secData.id, 'down')} title='Move Down' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                                            <ChevronDownIcon className='w-3 text-white font-bold' />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                                        :
                                                                                        <div>
                                                                                            {
                                                                                                secData.title === 'image' ?
                                                                                                    <div className='flex flex-col ring-1 gap-y-4 p-3 rounded-lg'>
                                                                                                        <img src={secData.content} alt="" className='w-80' />
                                                                                                        <input accept=".webp, .png" type='file' onChange={(e) => this.handleFileUpload(e, secData.id)} className={`block w-full rounded-md  text-xs  px-3.5 py-2 text-gray-900 bg-white ring-1 border-none outline-none`} />
                                                                                                        <input onChange={(e) => this.altText(e, secData)} value={secData.alt} placeholder='ALT Text' type="text" className='block w-full rounded-md  px-3.5 py-2 text-gray-900 bg-white ring-1 border-none' />
                                                                                                    </div> :

                                                                                                    secData.title === 'video' ?

                                                                                                        <div className='flex flex-col ring-1 gap-y-4 p-3 rounded-lg'>
                                                                                                            {secData.content &&
                                                                                                                <video src={secData.content} alt="" className='w-80' />
                                                                                                            }
                                                                                                            <input accept=".mp4" type='file' onChange={(e) => this.handleFileUpload(e, secData.id)} className={`block w-full rounded-md  text-xs  px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                                            <input onChange={(e) => this.altText(e, secData)} value={secData.alt} placeholder='ALT Text' type="text" className='block w-full rounded-md px-3.5 py-2 text-gray-900 bg-white ring-1 border-none' />
                                                                                                        </div> :

                                                                                                        secData.title === 'table' ?

                                                                                                            <div className='ring-1 rounded-lg p-3'>
                                                                                                                <Tab tableId={secData} />
                                                                                                            </div>
                                                                                                            :
                                                                                                            secData.title === 'description' ?
                                                                                                                <textarea rows={3} type='text' value={secData.content} onChange={(e) => this.updateSecData(e, secData)} className={`block w-full rounded-md  px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                                                : <input type='text' value={secData.content} onChange={(e) => this.updateSecData(e, secData)} className={`block w-full rounded-md  px-3.5 py-2 text-gray-900 bg-white ring-1 border-none`} />
                                                                                            }

                                                                                            {
                                                                                                section.data.length > 1 &&
                                                                                                <div>
                                                                                                    <div onClick={() => this.secDataRemoveFaq(secData)} className=' absolute -right-[6px] top-9 bg-gray-500 p-[1px] rounded-full cursor-pointer'>
                                                                                                        <XMarkIcon className='w-3 text-white' />
                                                                                                    </div>
                                                                                                    <div className='absolute right-[32px] top-9 flex gap-x-3'>
                                                                                                        <div onClick={() => this.moveItem(section.id, secData.id, 'up')} title='Move Up' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                                            <ChevronUpIcon className='w-3 text-white font-bold' />
                                                                                                        </div>
                                                                                                        <div onClick={() => this.moveItem(section.id, secData.id, 'down')} title='Move Down' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                                            <ChevronDownIcon className='w-3 text-white font-bold' />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                        }
                                                                    </div>
                                                                    {/* <div onClick={() => this.removeSecDataField(section)} className=' absolute -top-2 -right-2 bg-gray-500 p-1 rounded-full cursor-pointer'>
                                                                        <XMarkIcon className='w-4 text-white' />
                                                                    </div> */}
                                                                    <div>
                                                                        <div onClick={() => this.removeSecDataField(section)} className=' absolute -right-[6px] -top-2 bg-gray-500 p-[1px] rounded-full cursor-pointer'>
                                                                            <XMarkIcon className='w-4 text-white' />
                                                                        </div>
                                                                        <div className='absolute right-[32px] -top-2 flex gap-x-3'>
                                                                            <div onClick={() => this.moveParent(section.id, 'up')} title='Move Up' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                <ChevronUpIcon className='w-3 text-white font-bold' />
                                                                            </div>
                                                                            <div onClick={() => this.moveParent(section.id, 'down')} title='Move Down' className=' bg-slate-600 p-[2px] rounded-full cursor-pointer'>
                                                                                <ChevronDownIcon className='w-3 text-white font-bold' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="mt-10 gap-10 flex justify-center  pt-8">
                                <button onClick={() => this.addSection('section')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    Section
                                </button>
                                <button onClick={() => this.addSection('faq')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                                    FAQ
                                </button>
                                <button onClick={() => this.addSection('cta')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                                    CTA
                                </button>
                                <button onClick={() => this.addSection('recommended_reading')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                                    Recommended Reading
                                </button>
                                <button onClick={() => this.addSection('testimonials')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                                    Testimonials
                                </button>
                            </div>
                            <div className="mt-10 flex justify-center space-x-6 pt-8">
                                <button onClick={() => this.submit()} className="rounded-md bg-[#e84c3d] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover-bg-[#e84c3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    Submit
                                </button>
                                <button onClick={() => this.cancel()} className="rounded-md border border-[#8b8585] bg-white px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm hover-bg-[#e84c3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    Cancel
                                </button>
                                <button onClick={() => this.preview()} className="rounded-md border border-[#8b8585] bg-white px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm hover-bg-[#e84c3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Page;
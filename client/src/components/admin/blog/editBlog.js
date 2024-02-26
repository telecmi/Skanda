import React, { Component } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { blog_structure } from './jsondata'
import AppStateContext from '../../../utils/AppStateContext';
import axios from 'axios'

class Page extends Component {

    static contextType = AppStateContext

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            blogExportData: '',
            inputTitle: '',
            inputContent: '',
            fieldValidations: Array(blog_structure.length).fill(true),
            isSpeedDialOpen: false
        };
    }

    capitalize(str) {
        const capitalizedWords = str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    }

    addSection = (type) => {
        
        if (type == 'faq') {
            const newData = { type: 'faq', content: [{ ques: '', ans: '' }], id: this.state.data.length + 1 };
            this.setState({ data: [...this.state.data, newData] });
            this.setState({ fieldValidations: Array(this.state.data.length + 1).fill(true) })
        } else {
            const newData = { type: type.includes('_') ? this.capitalize(type) : type, content: '', id: this.state.data.length + 1 };
            this.setState({ data: [...this.state.data, newData] });
            this.setState({ fieldValidations: Array(this.state.data.length + 1).fill(true) })
        }
        

    };
    updateContent = (index, content) => {
        const newData = [...this.state.data];
        newData[index].content = content;
        this.setState({ data: newData });
    };
    updateContentQues = (index, content) => {
        const newData = [...this.state.data];
        newData[index].content[0].ques = content
        this.setState({ data: newData });
    };
    updateContentAns = (index, content) => {
        const newData = [...this.state.data];
        newData[index].content[0].ans = content
        this.setState({ data: newData });
    };
    removeField = (e) => {
        const newData = [...this.state.data];
        newData.splice(e, 1);
        this.setState({ data: newData });
    }

    submit = () => {

        const jsonData = this.state.data;

        const fieldValidations = jsonData.map(section => {
            if (section.type === 'faq') {
                // Validate FAQ content fields
                const isValidFAQ = section.content.every(entry => {
                    // Trim question and answer fields and check if they are not empty
                    return entry.ques.trim() !== '' && entry.ans.trim() !== '';
                });
                return isValidFAQ;
            } else if (typeof section.content === 'string') {
                // Trim content parameter if it's a string
                section.content = section.content.trim();
                return section.content !== ''; // Check if content is not empty after trimming
            } else {
                return true; // For non-string content types, assume it's valid
            }
        });


        if (fieldValidations.every(validation => validation)) {
            this.setState({ fieldValidations });

            const blogData = { primary: [], secondary: [], id: this.state.id, time: this.state.time };

            // Iterate through the input array
            jsonData.forEach(item => {
                if (item.primary) {
                    // Add primary items to the primary array
                    const primaryItem = { [item.type.toLowerCase().replace(/\s+/g, '_')]: item.content, };
                    blogData.primary.push(primaryItem);
                } else {
                    // Add secondary items to the secondary array
                    if (Array.isArray(item.content)) {
                        // Handle FAQ content separately
                        item.content.forEach(faqItem => {
                            const secondaryItem = { type: item.type.toLowerCase(), content: faqItem };
                            blogData.secondary.push(secondaryItem);
                        });
                    } else {
                        const secondaryItem = { type: item.type.toLowerCase(), content: item.content };
                        blogData.secondary.push(secondaryItem);
                    }
                }
            });

            axios.post('https://bf18-202-21-44-91.ngrok-free.app/blog_update', blogData).then((res) => {

                if (res.data.code === 200) {
                    const { setEditBlogModal } = this.context;
                    setEditBlogModal(false);
                    blog_structure.forEach((e) => {
                        e.content = ''
                    })
                }
            }).catch((err) => { })

        } else {
            alert("Please fill in all the fields before submitting.");
            this.setState({ fieldValidations });
        }
    }


    cancel = () => {
        const { setEditBlogModal, setEditBlogData } = this.context;
        setEditBlogModal(false);
        setEditBlogData('')
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
    };

    onDragOver = (e) => {
        e.preventDefault();
    };
    onDrop = (e, index) => {

        const id = e.dataTransfer.getData("text/plain");
        const items = [...this.state.data];
        const itemToMove = items.find((item) => item.id === parseInt(id));

        // Remove the item from its previous position
        items.splice(items.indexOf(itemToMove), 1);

        // Insert the item into the new position
        items.splice(index, 0, itemToMove);

        this.setState({ data: items });

    };


    componentDidMount() {
        const { editBlogData } = this.context;

        this.setState({ time: editBlogData.time, id: editBlogData.id })

        const extractedData = editBlogData.primary.map((item, index) => ({
            type: Object.keys(item)[0],
            content: Object.values(item)[0],
            id: index + 1,
            primary: true
        }));

        const secconvertArray = (array) => {
            return array.map((item, index) => {
                const { type, content } = item;
                let id = index + 1 + extractedData.length;

                if (type === 'faq') {
                    return {
                        type: type.toUpperCase(),
                        content: [{ ques: content.ques, ans: content.ans }],
                        id
                    };
                } else {
                    return { type, content, id };
                }
            });
        };

        const transformedData = secconvertArray(editBlogData.secondary);

        const concat = extractedData.concat(transformedData)

        this.setState({ data: concat })

    }

    render() {
        return (
            <div>
                <div className='p-10 bg-gray-100 shadow-sm border rounded-xl my-4'>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        {this.state.data.map((section, index) => (
                            <div key={index} draggable onDragStart={(e) => this.onDragStart(e, section.id)} onDragOver={this.onDragOver} onDrop={(e) => this.onDrop(e, index)}
                                className="sm:col-span-2">
                                <label className="block text-sm font-semibold capitalize leading-6 text-gray-900">
                                    {section.type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                </label>
                                <div className="mt-2.5">
                                    {section.type === 'content' || section.type === 'notes' || section.type === 'table' ? (
                                        <div className='relative'>
                                            <textarea
                                                onChange={(e) => this.updateContent(index, e.target.value, section.type)}
                                                value={section.content || ''}
                                                rows={6}
                                                className={`block w-full rounded-md bg-white  px-3.5 py-2 text-gray-900 ring-1 ring-inset shadow-sm sm:text-sm sm:leading-6 ${!this.state.fieldValidations[index] ? 'ring-red-700' : ' ring-gray-300'}`}
                                            />
                                            {
                                                section.primary ?
                                                    '' : <div onClick={() => this.removeField(index)} className=' absolute -top-2 -right-2 bg-black p-1 rounded-full cursor-pointer'>
                                                        <XMarkIcon className='w-4 text-white' />
                                                    </div>
                                            }
                                        </div>
                                    ) : section.type.toLowerCase() == 'faq' ?

                                        <div className='relative'>
                                            <div className={`border border-[#c5c5c5] p-5  space-y-3`}>
                                                <div>
                                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                                        Question
                                                    </label>
                                                    <input onChange={(e) => this.updateContentQues(index, e.target.value, section.type)} value={section.content[0] ? section.content[0].ques : ''} rows={1}
                                                        className={`block w-full bg-white rounded-md  px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${!this.state.fieldValidations[index] ? 'ring-red-700' : ' ring-gray-300'}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                                        Answer
                                                    </label>
                                                    <textarea onChange={(e) => this.updateContentAns(index, e.target.value, section.type)} value={section.content[0] ? section.content[0].ans : ''} rows={3}
                                                        className={`block w-full bg-white rounded-md  px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${!this.state.fieldValidations[index] ? 'ring-red-700' : ' ring-gray-300'}`}
                                                    />
                                                </div>
                                            </div>
                                            {
                                                section.primary ?
                                                    '' : <div onClick={() => this.removeField(index)} className=' absolute -top-2 -right-2 bg-black p-1 rounded-full cursor-pointer'>
                                                        <XMarkIcon className='w-4 text-white' />
                                                    </div>
                                            }
                                        </div> : section.type == 'image' ? (
                                            <div className='relative'>

                                                {console.log(section.content)}

                                                <input type='file' onChange={(e) => this.updateContent(index, e.target.value)}
                                                    value={''}
                                                    className={` cursor-pointer block w-full bg-white rounded-md ring-1 ring-inset px-3.5 py-2 text-gray-900 shadow-sm sm:text-sm sm:leading-6 ${!this.state.fieldValidations[index] ? ' ring-red-700' : 'ring-gray-300'}`}
                                                />
                                                {section.primary ?
                                                    '' : <div onClick={() => this.removeField(index)} className=' absolute -top-2 -right-2 bg-black p-1 rounded-full cursor-pointer'>
                                                        <XMarkIcon className='w-4 text-white' />
                                                    </div>}
                                            </div>
                                        ) :
                                            <div className='relative'>

                                                <input type='text' onChange={(e) => this.updateContent(index, e.target.value)}
                                                    value={section.content}
                                                    className={` block w-full bg-white rounded-md ring-1 ring-inset px-3.5 py-2 text-gray-900 shadow-sm sm:text-sm sm:leading-6 ${!this.state.fieldValidations[index] ? ' ring-red-700' : 'ring-gray-300'}`}
                                                />
                                                {section.primary ?
                                                    '' : <div onClick={() => this.removeField(index)} className=' absolute -top-2 -right-2 bg-black p-1 rounded-full cursor-pointer'>
                                                        <XMarkIcon className='w-4 text-white' />
                                                    </div>}
                                            </div>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 gap-10 flex justify-center  pt-8">
                        <button onClick={() => this.addSection('title')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Title
                        </button>
                        <button onClick={() => this.addSection('content')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                            Content
                        </button>
                        <button onClick={() => this.addSection('image')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                            Images
                        </button>
                        <button onClick={() => this.addSection('faq')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                            FAQ
                        </button>
                        <button onClick={() => this.addSection('notes')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                            Notes
                        </button>
                        <button onClick={() => this.addSection('table')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                            Table
                        </button>
                    </div>
                    <div className="mt-10 flex justify-center space-x-6 pt-8">
                        <button onClick={() => this.submit()} className="rounded-md bg-[#e84c3d] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover-bg-[#e84c3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                            Submit
                        </button>
                        <button onClick={() => this.cancel()} className="rounded-md bg-white border border-[#8b8585] px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm hover-bg-[#e84c3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;


// const markdownTable = `
// | Parameter Name | Type | Description |
// | :---: | :---: | :---: |
// | id | string | Your user id |
// |password | string | Your user password |
// `;

// // Function to convert Markdown table to HTML
// function markdownToHtml(markdown) {
//     // Split the markdown table by rows
//     const rows = markdown.trim().split('\n');

//     // Remove the empty rows and columns
//     const nonEmptyRows = rows.filter(row => row.trim() !== '').map(row => row.split('|').filter(cell => cell.trim() !== ''));

//     // Filter out rows containing only :---:
//     const filteredRows = nonEmptyRows.filter(row => row.some(cell => cell.trim() !== ':---:'));

//     // Extract headers and data rows
//     const headers = filteredRows[0];
//     const dataRows = filteredRows.slice(1);

//     // Generate HTML table with borders
//     let html = '<table style="border-collapse: collapse; border: 1px solid black;">';
//     html += '<tr>';
//     headers.forEach(header => {
//         html += `<th style="border: 1px solid black; padding: 8px;">${header.trim()}</th>`;
//     });
//     html += '</tr>';

//     // Process each row and generate HTML rows
//     dataRows.forEach(row => {
//         html += '<tr>';
//         row.forEach(cell => {
//             html += `<td style="border: 1px solid black; padding: 8px;">${cell.trim()}</td>`;
//         });
//         html += '</tr>';
//     });

//     html += '</table>';

//     return html;
// }

// // Convert Markdown table to HTML
// const htmlTable = markdownToHtml(markdownTable);
// console.log(htmlTable);
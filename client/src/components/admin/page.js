import React, { Component } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Data } from './jsondata'


export default class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: Data,
            inputTitle: '',
            inputContent: '',
            fieldValidations: Array(Data.length).fill(true),
        };
    }

    addSection = (title) => {
        const newData = { title, content: '', id: this.state.data.length + 1 };
        this.setState({ data: [...this.state.data, newData] });
        this.setState({ fieldValidations: Array(this.state.data.length + 1).fill(true) })
        console.log(this.state.data)
    };
    updateContent = (index, content) => {
        const newData = [...this.state.data];
        newData[index].content = content;
        this.setState({ data: newData });
    };
    removeField = (e) => {
        const newData = [...this.state.data];
        newData.splice(e, 1);
        this.setState({ data: newData });
    }
    submit = () => {
        const jsonData = this.state.data;
        const fieldValidations = jsonData.map(section => section.content.trim() !== '');
        if (fieldValidations.every(validation => validation)) {
            console.log(jsonData);
            this.setState({ fieldValidations })
        } else {
            alert("Please fill in all the fields before submitting.");
            this.setState({ fieldValidations });
        }
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

    render() {
        return (
            <div className="relative bg-white">
                <div className="p-10">
                    <h2 className="text-3xl font-bold text-center tracking-tight text-gray-900">Blog</h2>
                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {this.state.data.map((section, index) => (
                                <div key={index}
                                    draggable
                                    onDragStart={(e) => this.onDragStart(e, section.id)}
                                    onDragOver={this.onDragOver}
                                    onDrop={(e) => this.onDrop(e, index)}
                                    className="sm:col-span-2">
                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                        {section.title}
                                    </label>
                                    <div className="mt-2.5">
                                        {section.title === 'Sub Content' || section.title === 'Content' || section.title === 'Notes' || section.title === 'FAQ' ? (
                                            <div className='relative'>
                                                <textarea
                                                    onChange={(e) => this.updateContent(index, e.target.value)}
                                                    value={section.content || ''} rows={6}
                                                    className={`block w-full rounded-md  px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!this.state.fieldValidations[index] ? 'ring-red-700' : ' ring-gray-300'}`}
                                                />
                                                {section.title === 'Meta Title' || section.title === 'Meta Description' || section.title === 'Canonical' || section.title === 'Blog Title' || section.title === 'Content' ?
                                                    '' : <div onClick={() => this.removeField(index)} className=' absolute -top-2 -right-2 bg-black p-1 rounded-full cursor-pointer'>
                                                        <XMarkIcon className='w-4 text-white' />
                                                    </div>}
                                            </div>
                                        ) : (
                                            <div className='relative'>
                                                <input type={section.title === 'Image URL' ? 'file' : 'text'} onChange={(e) => this.updateContent(index, e.target.value)}
                                                    value={section.content || ''}
                                                    className={`block w-full rounded-md  px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!this.state.fieldValidations[index] ? ' ring-red-700' : 'ring-gray-300'}`}
                                                />
                                                {section.title === 'Meta Title' || section.title === 'Meta Description' || section.title === 'Canonical' || section.title === 'Blog Title' || section.title === 'Category' || section.title === 'Author Name' ?
                                                    '' : <div onClick={() => this.removeField(index)} className=' absolute -top-2 -right-2 bg-black p-1 rounded-full cursor-pointer'>
                                                        <XMarkIcon className='w-4 text-white' />
                                                    </div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 gap-10 flex justify-center  pt-8">
                            <button onClick={() => this.addSection('Sub Title')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Title
                            </button>
                            <button onClick={() => this.addSection('Sub Content')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                                Content
                            </button>
                            <button onClick={() => this.addSection('Image URL')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                                Images
                            </button>
                            <button onClick={() => this.addSection('FAQ')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                                FAQ
                            </button>
                            <button onClick={() => this.addSection('Notes')} type="button" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50">
                                Notes
                            </button>
                        </div>
                        <div className="mt-10 flex justify-center pt-8">
                            <button onClick={() => this.submit()} className="rounded-md bg-[#e84c3d] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover-bg-[#e84c3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
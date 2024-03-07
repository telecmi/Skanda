import React, { Component } from 'react'
import { blog_og_structure } from './jsondata'
import AppStateContext from '../../../utils/AppStateContext'

export default class Og extends Component {

    static contextType = AppStateContext
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    updateOgContent = (index, value, type) => {
        const foundIndex = blog_og_structure.findIndex(item => item.type === type);
        if (foundIndex !== -1) {
            blog_og_structure[foundIndex].content = value;
            const { setBlogOgData } = this.context
            setBlogOgData(blog_og_structure)
        }
    }
    render() {
        return (
            <div className='mt-2'>
                <label className="block text-sm font-semibold capitalize leading-6 text-gray-900">
                    Og
                </label>

                <div className='grid grid-cols-2 gap-x-6'>
                    {
                        blog_og_structure.map((section, index) => (
                            <div key={index} className='ml-6 my-3'>
                                <label className="block text-sm font-semibold capitalize leading-6 text-gray-900">
                                    {section.type.split('_').slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </label>
                                <div className='relative'>
                                    <input
                                        onChange={(e) => this.updateOgContent(index, e.target.value, section.type)} pattern="[0-9]{10}" type={section.type === 'og_image_width' || section.type === 'og_image_height' ? 'number' : section.type === 'og_image' || section.type === 'og_image_secure_url' ? 'file' : 'text'}
                                    className={`block w-full rounded-md ${section.type === 'og_image' || section.type === 'og_image_secure_url' ? 'text-xs py-[9px]' : 'py-2'} px-3.5 text-gray-900 shadow-sm ring-1 border-none bg-white `}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

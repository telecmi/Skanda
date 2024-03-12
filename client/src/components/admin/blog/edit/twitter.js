import React, { Component } from 'react'
import AppStateContext from '../../../../utils/AppStateContext'


export default class meta extends Component {

    static contextType = AppStateContext
    constructor(props) {
        super(props)

        this.state = {
            twitter: []
        }
    }
    updateTwitterContent = (value, type) => {
        const foundIndex = this.state.twitter.findIndex(item => item.type === type);
        if (foundIndex !== -1) {
            this.state.twitter[foundIndex].content = value;
            const { setBlogTwitterData } = this.context
            setBlogTwitterData(this.state.twitter)
        }
    }
    componentDidMount() {
        const { editBlogData, setBlogTwitterData } = this.context
        this.setState({ twitter: editBlogData.twitter })
        setBlogTwitterData(editBlogData.twitter)
    }
    render() {
        return (
            <div className='mt-2'>
                <label className="block text-sm font-semibold capitalize leading-6 text-gray-900">
                    Twitter
                </label>

                <div className='grid grid-cols-2 gap-x-6'>
                    {
                        this.state.twitter.map((section, index) => (
                            <div key={index} className='ml-6 my-3'>
                                <label className="block text-sm font-semibold capitalize leading-6 text-gray-900">
                                    {section.type.split('_')[1].replace(/\b\w/g, char => char.toUpperCase())}
                                </label>
                                <div className='relative'>
                                    <input value={section.content || ''}
                                        onChange={(e) => this.updateTwitterContent(index, e.target.value, section.type)}
                                        className={`block w-full rounded-md  px-3.5 py-2 text-gray-900 shadow-sm ring-1 border-none bg-white `}
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

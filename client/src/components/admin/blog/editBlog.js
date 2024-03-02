import React, { Component } from 'react';
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

    componentDidMount() {
        axios.post('https://bf18-202-21-44-91.ngrok-free.app/blog_get').then((res) => {

            console.log(res.data)

        }).catch((err) => console.error(err))
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Page;
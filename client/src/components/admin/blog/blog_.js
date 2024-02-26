import React, { Component } from 'react'
import AppStateContext from '../../../utils/AppStateContext';
import Table from './table'

export default class blogComponent extends Component {

    static contextType = AppStateContext

    constructor(props) {
        super(props)

        this.state = {
            data: [
                ['0A', '0B', '0C'],
                ['1A', '1B', '1C'],
                ['2A', '2B', '2C']
            ]
        }
    }


    componentDidMount() {
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}


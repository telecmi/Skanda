import React from 'react';
import { Table } from 'table';

function TablePreview() {
    // Define your table data
    const data = [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 25 },
        { id: 3, name: 'Doe', age: 35 },
    ];

    // Define columns
    const columns = ['id', 'name', 'age'];

    // Generate the table
    const htmlTable = Table(data, { columns });

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlTable }} />
    );
}

export default TablePreview;

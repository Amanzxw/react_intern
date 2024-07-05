
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'body', headerName: 'Body', width: 400 },
];

const DataGridDisplay: React.FC = () => {
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={data} columns={columns} pageSize={5} />
        </div>
    );
};

export default DataGridDisplay;

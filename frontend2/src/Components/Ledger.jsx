import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const Ledger = () => {
    let [ type, setType ] = useState('all');
    const [ page, setPage ] = React.useState(1);
    const [ limit, setLimit ] = useState(5);
    let students;
    let totalItems;
    let totalPages;
    useEffect(
        () => {
            axios({
                method: 'get',
                url: 'http://localhost:5000/api/transactions/pagination',
                params: {
                    page: page,
                    limit: limit,
                    type: type,
                    user_id: '5f819163a199fb159c59f97f'
                }
            })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        },
        [ type, page, limit ]
    );

    return (
        <div>
            <h1>Ledger</h1>
            <Pagination
                page={page}
                setPage={setPage}
                totalItems={totalItems}
                totalPages={totalPages}
                limit={limit}
                setLimit={setLimit}
            />
        </div>
    );
};

export default Ledger;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    }
}));

export default function PaginationControlled({ totalItems, totalPages, limit, setLimit, page, setPage }) {
    const classes = useStyles();
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className={classes.root}>
            <h1>Apache Batch Student Database</h1>
            <TextField
                size="small"
                style={{ margin: '20px 0', width: '100px' }}
                label="Rows per page"
                name="rows"
                value={limit}
                variant="outlined"
                onChange={(e) => setLimit(e.target.value)}
                required
            />
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
        </div>
    );
}

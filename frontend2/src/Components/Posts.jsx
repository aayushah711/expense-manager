import Box from '@material-ui/core/Box';
import React from 'react';
import { useSelector } from 'react-redux';

const Posts = (props) => {
    const isAuth = useSelector((state) => state.auth.isAuth);

    return (
        <Box>
            <h1>Posts</h1>

            {isAuth ? <div>Nice</div> : <div>Please Login</div>}
        </Box>
    );
};

export default Posts;

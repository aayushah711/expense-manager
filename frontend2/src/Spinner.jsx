import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
}));

export default function CircularIndeterminate() {
    const state = useSelector((state) => state.app);

    const classes = useStyles();
    const { isLoading } = state;

    return <div className={classes.root}>{isLoading ? <CircularProgress /> : null} </div>;
}

import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import messageType from '../messageType'

const useStyles = makeStyles({
    error: {
        backgroundColor: '#F56236'
    },
    warning: {
        backgroundColor: '#FCE788'
    },
    info: {
        backgroundColor: '#88FCA3'
    },
})

/**
 * Display an individual notification. The background color changes based on the
 * message type.
 */
const Notification = ({ item, clearMessage }) => {
    const classes = useStyles()

    let priorityClass;

    switch (item.priority) {
        case 1: priorityClass = classes.error; break;
        case 2: priorityClass = classes.warning; break;
        case 3:
        default: priorityClass = classes.info; break;
    }

    const handleClick = () => {
        clearMessage(item.id);
    }

    return (
        <Paper className={priorityClass} elevation={4}>
            <Box p={2}>
                <Grid container justify="space-between" alignItems="center">
                    <Typography variant="body1">{item.message}</Typography>
                    <Button size="small" onClick={handleClick}>Clear</Button>
                </Grid>
            </Box>
        </Paper>
    )
}

Notification.propTypes = {
    /** Meesage object (see messageType.js) */
    item: messageType.isRequired,
    /** Event handler for when the "clear" button is clicked */
    clearMessage: PropTypes.func.isRequired,
};

export default Notification
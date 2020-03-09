import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import messageType from '../messageType'
import Notification from './notification'

/**
 * Display a column of messages, including a heading, message counter, and list
 * of messages.
 */
const NotificationList = ({ heading, items, clearMessage }) => (
    <div>
        <Box mb={1}>
            <Typography variant="h6">{heading}</Typography>
            <Typography variant="body1">
                <span>Count</span>
                <span title="count">{items.length}</span>
            </Typography>
        </Box>
        <Grid container direction="column" spacing={2}>
            {items.map(item => (
                <Grid item key={item.id}>
                    <Notification item={item} clearMessage={clearMessage} />
                </Grid>
            ))}
        </Grid>
    </div>
)

NotificationList.propTypes = {
    /** Heading text */
    heading: PropTypes.string,
    /** The array of messages to display */
    items: PropTypes.arrayOf(messageType).isRequired,
    /** An event handler for when the user removes a specific message */
    clearMessage: PropTypes.func.isRequired,
};

export default NotificationList
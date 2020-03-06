import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core';
import Notification from './notification'

const NotificationList = ({ heading, items }) => (
    <div>
        <Typography variant="h6">{heading}</Typography>
        <Typography variant="body1">Count {items.length}</Typography>
        <Grid container direction="column" spacing={2}>
            {items.map(item => (
                <Grid item>
                    <Notification item={item} />
                </Grid>
            ))}
        </Grid>
    </div>
)

// TODO: the type definition for a message is repeated in multiple files. Consolidate.
NotificationList.propTypes = {
    heading: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            priority: PropTypes.number,
            message: PropTypes.string,
        })
    )
};

export default NotificationList
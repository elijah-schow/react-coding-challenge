import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Notification from './notification'

const NotificationList = ({ heading, items, clearMessage }) => (
    <div>
        <Typography variant="h6">{heading}</Typography>
        <Typography variant="body1">Count {items.length}</Typography>
        <Grid container direction="column" spacing={2}>
            {items.map(item => (
                <Grid item key={item.id}>
                    <Notification item={item} clearMessage={clearMessage} />
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
            id: PropTypes.string.isRequired,
            priority: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
        })
    ).isRequired,
    clearMessage: PropTypes.func.isRequired,
};

export default NotificationList
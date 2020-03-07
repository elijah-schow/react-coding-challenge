import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Notification from './notification'

const NotificationList = ({ heading, items, clearMessage }) => (
    <div>
        <Box mb={1}>
            <Typography variant="h6">{heading}</Typography>
            <Typography variant="body1">Count {items.length}</Typography>
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
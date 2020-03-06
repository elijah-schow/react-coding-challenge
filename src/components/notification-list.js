import React from 'react'
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

export default NotificationList
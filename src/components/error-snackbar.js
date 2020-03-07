import React from 'react'
import PropTypes from 'prop-types'

import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import messageType from '../messageType'

// TODO: this is repeated from notification.js. Consolidate.
const useStyles = makeStyles({
    error: {
        backgroundColor: '#F56236'
    },
})


const ErrorSnackbar = ({ item, open, onClose }) => {
    const classes = useStyles()

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={2000}
            open={open}
            onClose={onClose}
        >
            <Paper className={classes.error} elevation={4}>
                <Grid container justify="space-between">
                    <Grid item>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                        <Box py={1.5} pr={3}>
                            <Typography variant="body1">{item && item.message}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Snackbar>
    )
}

ErrorSnackbar.propTypes = {
    item: messageType,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ErrorSnackbar
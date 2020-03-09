import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useMachine } from '@xstate/react'

import errorSnackbarMachine from '../errorSnackbarMachine'

// TODO: this is repeated from notification.js. Consolidate.
const useStyles = makeStyles({
    error: {
        backgroundColor: '#F56236'
    },
})

/**
 * Display a snackbar each time an error is received.
 *
 * @see errorSnackbarMachine.js for further details about how this component's
 * local state is handled.
 * 
 * @maybe known limitation: if a bunch of errors are received at once, this
 * component will skip to the last one because it can't handle receiving errors
 * faster than the component can animate (<500ms). If it's important to display
 * every single error message, implementing a queue could solve this problem.
 *
 */
const ErrorSnackbar = ({ message, onClose }) => {
    const classes = useStyles()
    const [state, send] = useMachine(errorSnackbarMachine)

    useEffect(() => {
        if (message != null) {
            // Open the snackbar
            send('MESSAGE', { message })
        } else {
            // Close the snackbar because this message has been removed
            send('CLOSE')
        }
    }, [send, message])

    const handleClose = e => {
        send('CLOSE')
        onClose(e)
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={2000}
            open={state.matches('open')}
            onClose={handleClose}
            onExited={() => send('ANIMATION_END')}
        >
            <Paper className={classes.error} elevation={4}>
                <Grid container justify="space-between">
                    <Grid item>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                        <Box py={1.5} pr={3}>
                            <Typography variant="body1">{state.context.message}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Snackbar>
    )
}

ErrorSnackbar.propTypes = {
    /** The error message to display next */
    message: PropTypes.string,
    /** An event handler that is called when the snackbar closes */
    onClose: PropTypes.func.isRequired,
}

export default ErrorSnackbar
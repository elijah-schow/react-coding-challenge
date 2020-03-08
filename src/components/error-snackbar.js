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
import messageType from '../messageType'

// TODO: this is repeated from notification.js. Consolidate.
const useStyles = makeStyles({
    error: {
        backgroundColor: '#F56236'
    },
})


const ErrorSnackbar = ({ items }) => {
    const classes = useStyles()
    const [state, send] = useMachine(errorSnackbarMachine)

    const lastItem = items.length > 0 ? items[items.length - 1] : null
    useEffect(() => {
        if (lastItem != null) {
            send('MESSAGE')
        }
    }, [send, lastItem])

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={2000}
            open={state.matches('open')}
            onClose={() => send('CLOSE')}
            onExited={() => send('ANIMATION_END')}
        >
            <Paper className={classes.error} elevation={4}>
                <Grid container justify="space-between">
                    <Grid item>
                        <IconButton onClick={() => send('CLOSE')}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                        <Box py={1.5} pr={3}>
                            <Typography variant="body1">{lastItem && lastItem.message}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Snackbar>
    )
}

ErrorSnackbar.propTypes = {
    items: PropTypes.arrayOf(messageType).isRequired,
}

export default ErrorSnackbar
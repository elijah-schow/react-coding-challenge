import { Machine } from 'xstate'

/**
 * The error snackbar's behavior is modeled as a finite state machine.
 *
 * Paste this machine into https://xstate.js.org/viz/ to play around with a
 * visualization of it. Visit https://xstate.js.org/docs/ for more information
 * about how xstate and state machines work.
 */
const errorSnackbarMachine = Machine(
    {
        id: 'errorSnackbar',
        initial: 'closed',
        states: {
            closed: {
                on: { OPEN: 'open' }
            },
            open: {
                on: { CLOSE: 'closed' }
            },
        }
    },
)

export default errorSnackbarMachine
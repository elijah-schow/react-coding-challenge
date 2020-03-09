import { Machine } from 'xstate'

/**
 * The error snackbar's behavior is modeled as a finite state machine.
 *
 * Paste this machine into https://xstate.js.org/viz/ to play around with a
 * visualization of it. Visit https://xstate.js.org/docs/ for more information
 * about how xstate and state machines work.
 *
 * This state machine helps handle a tricky scenario. If the snackbar is already
 * open and the app receives a new error message, the state machine will close
 * then immediately re-open with the new error message. Previously, the snackbar
 * would just stay open and the text would change to the new value, which looked
 * a little weird.
 */
const errorSnackbarMachine = Machine(
    {
        id: 'errorSnackbar',
        initial: 'closed',
        context: {
            message: '',
        },
        states: {
            closed: {
                initial: 'closed',
                states: {
                    closed: {
                        on: { MESSAGE: '#errorSnackbar.open' }
                    },
                    closeThenOpen: {
                        on: { ANIMATION_END: '#errorSnackbar.open' }
                    },
                },
            },
            open: {
                entry: ['setMessage'],
                on: {
                    CLOSE: 'closed',
                    MESSAGE: 'closed.closeThenOpen'
                }
            },
        }
    },
    {
        actions: {
            setMessage: (context, event) => {
                context.message = event.message
            }
        }
    }
)

export default errorSnackbarMachine
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
 *
 * @fixme `setNextMessage` and `unsetNextMessage` feel overly complicated. There
 * is probably a simpler way to acheive the same thing. These extra methods are
 * here because if you call setMessage right away, the text will change before
 * the snackbar is finished closing, which isn't what we want. 
 */
const errorSnackbarMachine = Machine(
    {
        id: 'errorSnackbar',
        initial: 'closed',
        context: {
            message: '',
            nextMessage: '',
        },
        states: {
            closed: {
                initial: 'closed',
                states: {
                    closed: {
                        on: {
                            MESSAGE: {
                                target: '#errorSnackbar.open',
                                actions: ['setMessage']
                            },
                        },
                    },
                    closeThenOpen: {
                        on: {
                            ANIMATION_END: {
                                target: '#errorSnackbar.open',
                                actions: ['unsetNextMessage'],
                            }
                        },
                    },
                },
            },
            open: {
                on: {
                    CLOSE: 'closed',
                    MESSAGE: {
                        target: 'closed.closeThenOpen',
                        actions: ['setMessage'],
                    },
                }
            },
        }
    },
    {
        actions: {
            setMessage: (context, event) => {
                context.message = event.message
            },
            setNextMessage: (context, event) => {
                context.nextMessage = event.message
            },
            unsetNextMessage: (context, event) => {
                context.message = context.nextMessage
                context.nextMessage = ''
            },
        }
    }
)

export default errorSnackbarMachine
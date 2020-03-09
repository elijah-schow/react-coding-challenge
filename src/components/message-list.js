import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Api from '../api'
import NotificationList from './notification-list'
import ErrorSnackbar from './error-snackbar'

const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#00E2C4",
    '&:hover': {
      backgroundColor: "#00C9AF",
    },
  }
}))(Button)

/**
 * This is the main application component. It manages both application state and
 * renders the app's layout.
 *
 * @todo separate state management into its own container component
 */
class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      currentError: null,
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  /**
   * The API calls this function when a new message is added.
   *
   * @param {Object} message
   * @property {String} message.id
   * @property {Number} message.priority
   * @property {String} message.message
   */
  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
      currentError: message.priority === 1
        ? message
        : this.state.currentError,
    })
  }

  /**
   * Remove the selected message
   *
   * @param {String} id the id of the message you want to remove from the list
   */
  clearMessage = (id) => {
    this.setState({
      /** Remove ethe selected message without modifying the original list */
      messages: this.state.messages.filter(m => m.id !== id),
      /** Ensure the snackbar closes if it is displaying the removed error */
      currentError: this.currentError != null && this.currentError.id === id
        ? null
        : this.currentError,
    })
  }

  /**
   * Remove all messages from the list
   */
  clearAll = () => {
    this.setState({
      messages: [],
      currentError: null,
    });
  }

  /**
   * Handle when the start/stop button is clicked
   */
  handleStartStopClick = () => {
    const isApiStarted = this.api.isStarted()
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  /**
   * Handle when the "clear" button is clicked
   */
  handleClearAllClick = () => {
    this.clearAll();
  }

  /**
   * Handle when the snackbar closes
   */
  handleSnackbarClose = () => {
    this.setState({ currentError: null });
  }

  render() {
    const isApiStarted = this.api.isStarted()
    const errorMessages = this.state.messages.filter(message => message.priority === 1)
    const warningMessages = this.state.messages.filter(message => message.priority === 2)
    const infoMessages = this.state.messages.filter(message => message.priority === 3)
    const currentErrorMessage = this.state.currentError ? this.state.currentError.message : null

    return (
      <>
        <AppBar color="inherit" elevation={1}>
          <Toolbar>
            <Typography variant="h6">Help.com Coding Challenge</Typography>
          </Toolbar>
        </AppBar>
        <ErrorSnackbar message={currentErrorMessage} onClose={this.handleSnackbarClose} />
        <Container>
          <Box textAlign="center" mt={10} mb={5}>
            <ColorButton
              variant="contained"
              onClick={this.handleStartStopClick}
              style={{ marginRight: "1rem" }}
            >
              {isApiStarted ? 'Stop Messages' : 'Start Messages'}
            </ColorButton>
            <ColorButton
              variant="contained"
              onClick={this.handleClearAllClick}
            >Clear</ColorButton>
          </Box>
          <Grid container direction="row" spacing={2}>
            <Grid item md={4} sm={12} xs={12}>
              <NotificationList
                heading="Error Type 1"
                items={errorMessages}
                clearMessage={this.clearMessage}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <NotificationList
                heading="Warning Type 2"
                items={warningMessages}
                clearMessage={this.clearMessage}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <NotificationList
                heading="Info Type 3"
                items={infoMessages}
                clearMessage={this.clearMessage}
              />
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
}

export default MessageList

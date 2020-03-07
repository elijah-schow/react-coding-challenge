import React from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core'

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

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    }, () => {
      if (message.priority === 1) {
        this.setState({
          currentError: message
        });
      }
    })
  }

  clearMessage = (id) => {
    // Remove the selected message without mutating the original
    const messages = this.state.messages.filter(m => m.id !== id)

    // If the snackbar is displaying this error
    const currentError = this.state.currentError

    if (currentError != null && currentError.id === id) {
      // Remove the message and close the snackbar too
      this.setState({
        messages,
        currentError: null,
      })
    } else {
      // Just remove the message
      this.setState({ messages })
    }
  }

  clearAll = () => {
    this.setState({
      messages: [],
      currentError: null,
    });
  }

  handleStartStopClick = () => {
    const isApiStarted = this.api.isStarted()
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  handleClearAllClick = () => {
    this.clearAll();
  }

  handleSnackbarClose = () => {
    this.setState({ currentError: null });
  }

  render() {
    const isApiStarted = this.api.isStarted()
    const errorMessages = this.state.messages.filter(message => message.priority === 1)
    const warningMessages = this.state.messages.filter(message => message.priority === 2)
    const infoMessages = this.state.messages.filter(message => message.priority === 3)
    const open = this.state.currentError != null;
    const currentError = this.state.currentError;

    return (
      <>
        <AppBar color="inherit" elevation={1}>
          <Toolbar>
            <Typography variant="h6">Help.com Coding Challenge</Typography>
          </Toolbar>
        </AppBar>
        <ErrorSnackbar item={currentError} open={open} onClose={this.handleSnackbarClose} />
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

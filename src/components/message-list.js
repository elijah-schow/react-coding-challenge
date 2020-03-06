import React from 'react'
import { Button, Container, Grid, Snackbar } from '@material-ui/core'

import Api from '../api'
import NotificationList from './notification-list'
import Notification from './notification'

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
    const messages = this.state.messages.filter(m => m.id !== id);
    const currentError = this.state.currentError;

    if (currentError != null && currentError.id === id) {
      this.setState({
        messages,
        currentError: null,
      })
    } else {
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

  handleSnackbarClose = (id) => {
    this.clearMessage(id);
  }

  render() {
    const isApiStarted = this.api.isStarted()
    const errorMessages = this.state.messages.filter(message => message.priority === 1)
    const warningMessages = this.state.messages.filter(message => message.priority === 2)
    const infoMessages = this.state.messages.filter(message => message.priority === 3)
    const open = this.state.currentError != null;
    const currentError = this.state.currentError;

    return (
      <div>

        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={2000}
          open={open}
          onClose={this.handleSnackbarClose}
        >
          {open
            ? <Notification item={currentError} clearMessage={this.handleSnackbarClose} />
            : null
          }
        </Snackbar>

        {/* Buttons */}
        <Container>
          <Button
            variant="contained"
            onClick={this.handleStartStopClick}
          >
            {isApiStarted ? 'Stop Messages' : 'Start Messages'}
          </Button>
          <Button
            variant="contained"
            onClick={this.handleClearAllClick}
          >Clear</Button>
        </Container>

        {/* Messages */}
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
      </div>
    )
  }
}

export default MessageList

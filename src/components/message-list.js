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

class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
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
    })
  }

  /**
   * Remove the selected message without mutating the original
   */
  clearMessage = (id) => {
    const messages = this.state.messages.filter(m => m.id !== id)
    this.setState({ messages })
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

  render() {
    const isApiStarted = this.api.isStarted()
    const errorMessages = this.state.messages.filter(message => message.priority === 1)
    const warningMessages = this.state.messages.filter(message => message.priority === 2)
    const infoMessages = this.state.messages.filter(message => message.priority === 3)

    return (
      <>
        <AppBar color="inherit" elevation={1}>
          <Toolbar>
            <Typography variant="h6">Help.com Coding Challenge</Typography>
          </Toolbar>
        </AppBar>
        <ErrorSnackbar items={errorMessages} />
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

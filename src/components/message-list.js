import React from 'react'
import { Button, Container, Grid } from '@material-ui/core'
import Api from '../api'
import NotificationList from './notification-list'

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
    }, () => {
      // Included to support initial direction. Please remove upon completion
      console.log(messages)
    })
  }

  clearMessage(id) {
    const { messages } = this.state
    this.setState({
      messages: messages.filter(m => m.id !== id)
    })
  }

  clearAll() {
    this.setState({
      messages: [],
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
      <div>
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
        <Grid container direction="row" spacing={2}>
          <Grid item md={4} sm={12} xs={12}>
            <NotificationList heading="Error Type 1" items={errorMessages} />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <NotificationList heading="Warning Type 2" items={warningMessages} />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <NotificationList heading="Info Type 3" items={infoMessages} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default MessageList

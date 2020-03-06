import React from 'react'
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    error: {
        backgroundColor: '#F56236'
    },
    warning: {
        backgroundColor: '#FCE788'
    },
    info: {
        backgroundColor: '#88FCA3'
    },
})

const Notification = ({ item }) => {
    const classes = useStyles()

    let cardClass

    switch (item.priority) {
        case 1: cardClass = classes.error; break;
        case 2: cardClass = classes.warning; break;
        case 3:
        default: cardClass = classes.info; break;
    }

    return (
        <Card>
            <CardContent className={cardClass}>
                <Grid container justify="space-between" alignItems="center">
                    <Typography variant="body1">{item.message}</Typography>
                    <Button size="small">Clear</Button>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Notification
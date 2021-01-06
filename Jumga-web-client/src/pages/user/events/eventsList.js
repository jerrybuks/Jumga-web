import React from 'react'
import { connect } from 'react-redux'
import { Card, Box } from '@material-ui/core'
import formatDate from '../../../utils/formatDate'
import { useStyles } from './styles'
import EventListMenu from './eventListMenu'
import { useTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'

export const EventsList = ({events, isSaving}) => {
    const classes = useStyles()
    console.log(events,777)
    const closedOnly = [];
    const closeAndWithdrawn = [];
    const openEvents = []

    events.forEach(event => {
        if(event.status === "close" && event.withdrawn){
            closeAndWithdrawn.push(event)
        } else if(event.status === "closed" && !event.withdrawn){
            closedOnly.push(event)
        } else {
            openEvents.push(event)
        }
    })

    return (
        <div className={classes.cardConatiner} style={{filter: isSaving ? "blur(1px)" : "none"}}>
            {openEvents.length > 0 && <Box m="1rem" fontWeight="bold">Open Events</Box>}
            {openEvents.map((event) => <EventItem key={event.id} event={event}/>)}
            {closedOnly.length > 0 && <Box m="1rem" fontWeight="bold">Closed Events Only</Box>}
            {closedOnly.map((event) => <EventItem key={event.id} event={event}/>)}
            {closeAndWithdrawn.length > 0 && <Box m="1rem" fontWeight="bold">Closed And WithDrawn Events</Box>}
            {closeAndWithdrawn.map((event) => <EventItem key={event.id} event={event}/>)}
            {events.length === 0 && <Box  m="1rem" fontWeight="bold">No events yet, please create an event</Box>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList)

const EventItemComp = ({event, history}) => {
    const {eventName, id, createdAt} = event;
    const classes = useStyles()
    const theme = useTheme()
    return (
        <Card className={classes.eventCard}>
            <Box className={classes.eventName} mb={1} onClick={() => history.push({ pathname: `events/${id}`, data: event })}>{eventName}</Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box><Box color={theme.palette.common.ash}>created at: </Box>{createdAt && formatDate(createdAt.toDate())}</Box>
                <Box><EventListMenu status={event.status} /></Box>
            </Box>
        </Card>
    )
}

const EventItem = withRouter(EventItemComp);
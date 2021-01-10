import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Navigation from '../../../components/navigation'
import { selectNotifications } from '../../../redux/productStore/productStore.selector';
import { clearNotificationsStart } from '../../../redux/productStore/productStore.actions';
import { createStructuredSelector } from 'reselect';
import { Card, Box } from '@material-ui/core';
import { formatLocaleCurrency } from 'country-currency-map';
import { useStyles } from "./styles";
export const NotificationPage = ({clearNotificationsStart, notifications}) => {
    const classes = useStyles();
    useEffect(() => {
        return () => {
            console.log(notifications)
            if (notifications.id) {
                clearNotificationsStart(notifications);
            }
        }
        // eslint-disable-next-line 
    }, []);

    const { unreadNotifications, readnotifications} = notifications;
    return (
        <div>
            <Navigation path="notifications">
                {(unreadNotifications.length > 0) && unreadNotifications.map(({name, giftName, amount_settled, currency, eventName, tx_id}) => (
                    <Card className={classes.noticationsCardUnread} key={tx_id}>
                        <Box>
                            <Box component="span" fontWeight="bold" >{name}</Box>
                            <Box component="span" > sent you</Box>
                            <Box component="span" fontStyle="italic" > "{giftName}"</Box>
                            <Box component="span" > valued at</Box>
                            <Box component="span" color="red" > {formatLocaleCurrency(amount_settled,currency)}</Box>
                            <Box component="span" > for your</Box>
                            <Box component="span" fontWeight="bold"> {eventName}</Box>
                            <Box component="span" >  event.</Box>
                        </Box>
                    </Card>
                ))}
                {(readnotifications.length > 0) && readnotifications.map(({name, giftName, amount_settled, currency, eventName, tx_id}) => (
                    <Card key={tx_id} className={classes.noticationsCardRead}>
                        <Box>
                            <Box component="span" fontWeight="bold" >{name}</Box>
                            <Box component="span" > sent you</Box>
                            <Box component="span" fontStyle="italic" > "{giftName}"</Box>
                            <Box component="span" > valued at</Box>
                            <Box component="span" color="red" > {formatLocaleCurrency (amount_settled,currency)}</Box>
                            <Box component="span" > for your</Box>
                            <Box component="span" fontWeight="bold"> {eventName}</Box>
                            <Box component="span" >  event.</Box>
                        </Box>
                    </Card>
                ))}
            </Navigation>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
	clearNotificationsStart: (notification) => dispatch(clearNotificationsStart(notification))
});

const mapStateToProps = createStructuredSelector({
	notifications: selectNotifications
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)

import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Navigation from "../../../components/navigation";
import { Box } from "@material-ui/core";
import { useStyles } from "./styles";
import {
  FormTextField } from "../../../components/formTextField";
import FormContainer from "../../../components/formDialog";
import {
  selectEvents,
  selectIsFetchingEvents,
  selectIsRegistering,
} from "../../../redux/productStore/productStore.selector";
import {
  getEventsStart,
  eventRegisterStart,
} from "../../../redux/productStore/productStore.actions";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import Spinner from "../../../components/spinner/Spinner";
import FloatingAddBtn from "../../../components/floatingAddBtn";
import { EventsList } from "./eventsList";

export const Events = ({
  getEventsStart,
  user: { id: userId, currency },
  events,
  isLoading,
  eventRegisterStart,
  isSaving,
}) => {
  const classes = useStyles();
  const [state, setstate] = useState({ eventName: "", eventCoverImg:"", isLargeFile: false, eventDesc: "", isExists: false });
  const formRef = React.useRef();

  useEffect(() => {
    if (userId && events.length === 0) getEventsStart(userId);
    //eslint-disable-next-line
  }, []);
  const { eventName, eventDesc, isLargeFile, isExists } = state;

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value, isExists: false });
  };

  const handleFileSelect = (e) => {
	  console.log(e.target.files)
	  if(e.target.files[0]?.size > 1000000){
		setstate({ ...state, eventCoverImg:  e.target.files[0], isLargeFile : true, isExists: false });
	  } else {
		setstate({ ...state, eventCoverImg:  e.target.files[0] || "", isLargeFile: false, isExists: false });
	  }
	
  }
console.log(state, isLoading,"===========")
  const submitForm = () => {
    const isEventName = checkEventname(eventName);
    setstate({ ...state, isExists: isEventName });

    if (formRef.current.reportValidity() && !isEventName && !isLargeFile) {
      eventRegisterStart(state, currency, userId);
      return true;
    }
  };

  const checkEventname = (name) => {
    return !!events.find(
      ({ eventName }) => eventName.toLowerCase() === name.toLowerCase()
    );
  };

  return (
    <div>
      <Navigation path="events">
        <Box py={2} mx="1rem">
          <FormTextField
            id="outlined-size-small"
            variant="outlined"
            size="small"
            // className={classes.eventBtn}
            placeholder="search event by name"
          />
        </Box>
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <FormContainer
              btn={(onOpen) => <FloatingAddBtn handleClickOpen={onOpen} />}
              saveFunc={submitForm}
              isSaving={isSaving}
              title="Create Event"
            >
              <Box py={2} margin="0 auto">
                <form className={classes.root} autoComplete="off" ref={formRef}>
				<Box mb="1rem">
                    <FormTextField
                      variant="outlined"
                      size="small"
					  type="file"
                      onChange={handleFileSelect}
                    />
					{isLargeFile && (
                    <Box my={2} color="red">
                      please select a file not greater than 1mb
                    </Box>
                  )}
                  </Box>
                  <Box mb="1rem">
                    <FormTextField
                      variant="outlined"
                      size="small"
                      name="eventDesc"
                      aria-label="minimum height"
                      rows={3}
                      placeholder="Minimum 3 rows"
					  multiline={true}
					  value={eventDesc}
					  onChange={handleChange}
                    />
                  </Box>

                  <FormTextField
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    className={classes.eventBtn}
                    name="eventName"
                    placeholder="input event name"
                    value={eventName}
                    onChange={handleChange}
                    required
                  />
                  {isExists && (
                    <Box my={2} color="red">
                      an event with this name already exists
                    </Box>
                  )}
                </form>
              </Box>
            </FormContainer>
            {events.length === 0 ? (
              "no events "
            ) : (
              <EventsList events={events} isSaving={isSaving} />
            )}
          </Fragment>
        )}
      </Navigation>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getEventsStart: (userId) => dispatch(getEventsStart(userId)),
  eventRegisterStart: (eventDet, currency, userId) =>
    dispatch(eventRegisterStart({ ...eventDet, currency, userId })),
});

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  events: selectEvents,
  isLoading: selectIsFetchingEvents,
  isSaving: selectIsRegistering,
  // isAuthenticating: selectIsAuthenticating
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);

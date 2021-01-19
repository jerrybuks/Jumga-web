import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  MenuItem,
  InputLabel,
  Box,
  FormControl,
  Select as MaterialSelect,
  CircularProgress,
  useTheme,
} from "@material-ui/core";
import useFetch from "../../../custom-hooks/useFetch";
import Select from "react-select";
import {
  FormTextField,
  BootstrapInput2,
} from "../../../components/formTextField";
import { useStyles } from "./styles";
import SubAccountForm from "./SubAccount";

export const DispatchRider = (props) => {
  const [state, setstate] = useState({
    country: null,
    ridersName: "",
    ridersEmail: "",
    ridersPhoneNo: "",
  });
  const bioInfo = {
    business_name: state.ridersName,
    business_email: state.ridersEmail,
    business_contact: state.ridersName,
    business_mobile: state.ridersPhoneNo,
    business_contact_mobile: state.ridersPhoneNo,
  };

  const theme = useTheme();
  const SelectChangeHandler = (e, name) => {
    console.log(e, 333);
    setstate({ ...state, [name]: e });
  };

  const handleBioChange = (e, name) => {
    console.log(e, 333);
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Box my={3}>
        <Box component="h2" mb={4} color={theme.palette.primary.main}>
          Register Dispatch Rider
        </Box>
        <Box mb="1rem">
          <FormTextField
            id="outlined-size-small"
            variant="outlined"
            size="small"
            // className={classes.eventBtn}
            name="ridersName"
            placeholder="Riders name"
            value={state.ridersName}
            onChange={handleBioChange}
            required
          />
        </Box>
        <Box mb="1rem">
          <FormTextField
            id="outlined-size-small"
            variant="outlined"
            size="small"
            // className={classes.eventBtn}
            type="email"
            name="ridersEmail"
            placeholder="Riders Email"
            value={state.ridersEmail}
            onChange={handleBioChange}
            required
          />
        </Box>
        <Box mb="1rem">
          <FormTextField
            id="outlined-size-small"
            variant="outlined"
            size="small"
            // className={classes.eventBtn}
            type="number"
            name="ridersPhoneNo"
            placeholder="Riders Phone No"
            value={state.ridersPhoneNo}
            onChange={handleBioChange}
            required
          />
        </Box>
        <Box mb="1rem" m="auto" width="22rem">
          <Select
            name="country"
            options={countries}
            placeholder="select country"
            value={state.country}
            onChange={(e) => SelectChangeHandler(e, "country")}
            required
          />
        </Box>
        {state.country && (
          <SubAccountForm countryAbbre={state.country} bioInfo={bioInfo} accountUser={{name: "dispatchRider"}} />
        )}
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DispatchRider);

const countries = [
  { value: "NG", label: "Nigeria" },
  { value: "KE", label: "Kenya" },
  { value: "GH", label: "Ghana" },
  { value: "UK", label: "United Kingdom" },
];

import React, { useState, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Button, Box, CircularProgress, FormLabel } from "@material-ui/core";
import { getCountry } from "country-currency-map";
import { FormTextField } from "../../../components/formTextField";
import { selectCurrentUser, selectIsAuthenticating } from "../../../redux/user/user.selectors";
import { selectIsRegistering } from "../../../redux/productStore/productStore.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useStyles } from "./styles";
import { productStoreRegisterStart } from "../../../redux/productStore/productStore.actions";
import SubAccountForm from "../../shared/dispatchRider/SubAccount";

function CountrySelector({ productStoreRegisterStart, user, isSaving, isReAuthenticating, history }) {
  const [state, setstate] = useState({
    country: null,
    storeCat: null,
    storeName: "",
    storeCoverImg: "",
    phoneNo: "",
    isLargeFile: false,
    storeDesc: "",
  });
  const [triedSubmit, setTriedSubmit] = useState(false);
  const formRef = React.useRef();
  const classes = useStyles();
  const SelectChangeHandler = (e, name) => {
    setstate({ ...state, [name]: e });
  };

  useEffect(() => {
    if (user.hasStore) {
      history.push("/verifyStore");
    }
  }, [user.hasStore, history]);
  const { storeName, storeDesc, isLargeFile, storeCat, country, phoneNo } = state;
  const handleChange = (e) => {
    console.log(e);
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    console.log(e.target.files);
    if (e.target.files[0]?.size > 1000000) {
      setstate({
        ...state,
        storeCoverImg: e.target.files[0],
        isLargeFile: true,
      });
    } else {
      setstate({
        ...state,
        storeCoverImg: e.target.files[0] || "",
        isLargeFile: false,
      });
    }
  };

  const handleSubmit = () => {
    setTriedSubmit(true);
    if (
      formRef.current.reportValidity() &&
      !isLargeFile &&
      storeCat &&
      country
    ) {
      // const countryDet = getCountry(country.label);
      // let currency = countryDet?.currency || "USD";
      let currency = "USD";

      const { isLargeFile, ...storeInfo } = state;
      console.log({ ...storeInfo, currency });
      productStoreRegisterStart({ ...storeInfo, currency }, user.id);
    }
  };
  console.log(state, 88888);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Box>
        <form className={classes.root} autoComplete="off" ref={formRef}>
          <Box textAlign="left" my={2} fontWeight="bold" fontSize="1.2rem">
            Settting up Store...
          </Box>
          <Box mb="1rem">
            <FormTextField
              id="outlined-size-small"
              variant="outlined"
              size="small"
              type="number"
              name="phoneNo"
              placeholder="Phone No"
              value={phoneNo}
              onChange={handleChange}
              required
            />
        </Box>
          <Box mb="1rem">
            <Box textAlign="left">
              <FormLabel htmlFor="files">
                select a cover image for your store
              </FormLabel>
            </Box>
            <FormTextField
              id="files"
              variant="outlined"
              size="small"
              type="file"
              onChange={handleFileSelect}
            />
            {isLargeFile && (
              <Box my={2} textAlign="left" color="red">
                please select a file not greater than 1mb
              </Box>
            )}
          </Box>
          <Box mb="1rem">
            <FormTextField
              id="outlined-size-small"
              variant="outlined"
              size="small"
              // className={classes.eventBtn}
              name="storeName"
              placeholder="store name"
              value={storeName}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb="1rem">
            <Select
              name="storeCat"
              options={storeCategories}
              placeholder="select store category"
              value={state.storeCat}
              onChange={(e) => SelectChangeHandler(e, "storeCat")}
              required
            />
          </Box>
          {!storeCat && triedSubmit && (
            <Box my={1} textAlign="left" color="red">
              please select a category
            </Box>
          )}
          <Box mb="1rem">
            <FormTextField
              variant="outlined"
              size="small"
              name="storeDesc"
              aria-label="minimum height"
              rows={3}
              placeholder="store description"
              multiline={true}
              value={storeDesc}
              onChange={handleChange}
              required
            />
          </Box>
          <Box>
            <Select
              name="country"
              placeholder="select your country"
              options={countries}
              value={state.country}
              onChange={(e) => SelectChangeHandler(e, "country")}
              required
            />
          </Box>
          {!country && triedSubmit && (
            <Box my={1} textAlign="left" color="red">
              please select your country
            </Box>
          )}
          <Box textAlign="end" my="1rem">
            <Button color="primary" variant="contained" onClick={handleSubmit} disabled={isSaving||isReAuthenticating}>
              {!isSaving  ? (
               !isReAuthenticating ? "continue" : "finishing..."
              ) : (
                <CircularProgress color="inherit" size={15} />
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

const storeCategories = [
  { value: "fashion", label: "fashion" },
  { value: "food", label: "food and beverages" },
  { value: "electronic", label: "electronic" },
  { value: "construction", label: "construction" },
  { value: "education", label: "education" },
  { value: "others", label: "others" },
];

const mapDispatchToProps = (dispatch) => ({
	productStoreRegisterStart: (storeData, userId) =>
    dispatch(productStoreRegisterStart({ storeData, userId })),
});

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  isSaving: selectIsRegistering,
  isReAuthenticating: selectIsAuthenticating
});

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);

const countries = [
  { value: "NG", label: "Nigeria" },
  { value: "KE", label: "Kenya" },
  { value: "GH", label: "Ghana" },
  { value: "UK", label: "United Kingdom" },
];


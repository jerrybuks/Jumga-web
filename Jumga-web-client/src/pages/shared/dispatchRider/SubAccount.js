import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  MenuItem,
  InputLabel,
  Box,
  Button,
  FormControl,
  Select as MaterialSelect,
  CircularProgress,
} from "@material-ui/core";
import useFetch from "../../../custom-hooks/useFetch";
import {
  FormTextField,
  BootstrapInput2,
} from "../../../components/formTextField";
import { useStyles } from "./styles";
import { registerSubStoreStart } from "../../../redux/productStore/productStore.actions";
import { selectIsRegistering } from "../../../redux/productStore/productStore.selector";
import { createStructuredSelector } from 'reselect';

const SubAccountForm = ({ countryAbbre, bioInfo, registerSubStoreStart, isSubmitting, accountUser }) => {
  const [state, setstate] = useState({
    bank_code: "",
    account_number: "",
    branches: [],
    destination_branch_code: "",
    loadingBranches: null,
  });
  const formRef = useRef();
  const classes = useStyles();

  const res = useFetch(
    `${process.env.REACT_APP_BASE_URL}/getBanksByCountry`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryAbbre: countryAbbre.value,
      }),
    },
    countryAbbre
  );

  const handleSubmit = () => {
    const payload = {
        ...bioInfo,
        account_bank: state.bank_code,
        account_number:state.account_number,
        country: countryAbbre.value,
        meta: [
            {
                meta_name: accountUser.name,
                meta_userId: accountUser.userId,
                meta_storeId: accountUser.storeId,
            }
        ],
        "split_type": "percentage",
        "split_value": 0.037
    }
      if(formRef.current.reportValidity()){
        registerSubStoreStart(payload)
      }

  };

  const { result, isLoading } = res;
  console.log(res, countryAbbre, 2222222222);
  useEffect(
    () => {
      console.log(state.bank_code, countryAbbre.value);
      if (state.bank_code && countryAbbre.value === "GH") {
        const bank = result?.data.find(({ code }) => code === state.bank_code);
        setstate({ ...state, loadingBranches: true });
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bankCode: bank.id,
          }),
        };
        fetch(
          `${process.env.REACT_APP_BASE_URL}/getBranchesByBank`,
          options
        )
          .then((resp) => resp.json())
          .then((result) => {
            setstate({
              ...state,
              branches: result?.data || [],
              loadingBranches: false,
            });
          })
          .catch((error) => {
            setstate({
              ...state,
              error,
              loadingBranches: false,
            });
          });
      }
    },
    //eslint-disable-next-line
    [state.bank_code]
  );
  console.log(state);
  const handleChange = (e) => {
    console.log(e, 4444);
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  const {
    account_number,
    bank_code,
    destination_branch_code,
    branches,
    loadingBranches
  } = state;

  return (
    <div>
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Box margin="0 auto" width="85%">
          <form autoComplete="off" ref={formRef}>
            <Box>
              {result?.data ? (
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-customized-select-label">
                    Bank
                  </InputLabel>
                  <MaterialSelect
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    name="bank_code"
                    value={bank_code}
                    onChange={handleChange}
                    input={<BootstrapInput2 />}
                    className={classes.selectEmpty}
                    required
                  >
                    {result?.data.map((bank) => (
                      <MenuItem value={bank.code} key={bank.code}>
                        {bank.name}
                      </MenuItem>
                    ))}
                  </MaterialSelect>
                </FormControl>
              ) : (
                <Box mt="24px">
                  <FormTextField
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    type="number"
                    name="bank_code"
                    placeholder="bank code -3 digit"
                    value={bank_code}
                    onChange={handleChange}
                    InputProps={{
                      inputProps: { min: 1, minLength: 3, maxLength: 3 },
                    }}
                    required
                  />
                </Box>
              )}
              {countryAbbre.value === "GH" && (
                <Box>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-customized-select-label">
                      Branch
                    </InputLabel>
                    <MaterialSelect
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      name="destination_branch_code"
                      value={destination_branch_code}
                      onChange={handleChange}
                      input={<BootstrapInput2 />}
                      className={classes.selectEmpty}
                      required
                    >
                      {loadingBranches ? (
                        <div>pleaase wait... </div>
                      ) : (
                        branches.map(({ branch_code, branch_name, id }) => (
                          <MenuItem value={branch_code} key={id}>
                            {branch_name}
                          </MenuItem>
                        ))
                      )}
                    </MaterialSelect>
                  </FormControl>
                </Box>
              )}
            </Box>
            <Box mt="24px">
              <FormTextField
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="number"
                name="account_number"
                placeholder="account number"
                value={account_number}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 1 } }}
                required
              />
            </Box>
           <Box my="1rem">
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                disabled={bioInfo.ridersName === "" || bioInfo.ridersPhoneNo === "" || bioInfo.ridersEmail === "" || isSubmitting}
              >
              {isSubmitting ?  <CircularProgress color="inherit" size={15} /> : "Register" }
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
	isSubmitting: selectIsRegistering,
});

const mapDispatchToProps = (dispatch) => ({
    registerSubStoreStart: (credentials) => dispatch(registerSubStoreStart(credentials))
});


export default connect(mapStateToProps, mapDispatchToProps)(SubAccountForm);


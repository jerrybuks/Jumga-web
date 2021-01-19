import React, { useState, useEffect } from "react";
import FormContainer from "../../components/formDialog";
import { Box } from "@material-ui/core";
import { FormTextField, BootstrapInput } from "../../components/formTextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useFlutterwave } from "flutterwave-react-v3";
import { withRouter } from "react-router-dom";
import { getCurrency } from "country-currency-map";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";

function GiftPurchaseForm(props) {
  const {
    BtnComp,
    items,
    cantEditName,
    cantEditAmount,
    totalItemAmount,
    currency,
  } = props;
  const deliveryFee = totalItemAmount * 0.075;
  const formRef = React.useRef();
  const [state, setstate] = useState({
    productName: "",
    name: "",
    amount: parseFloat(totalItemAmount),
    email: "",
  });
 
  const disaptchRiderEarning = 0.8 * deliveryFee;
  const storeOwnerEarning = 0.95 * totalItemAmount;
 console.log(props.storeDet,88888)
  const config = {
    public_key: process.env.REACT_APP_FW_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: props.totalItemAmount + deliveryFee,
    currency: props.currency,
    redirect_url: "/appreciation",
    payment_options: "account,card,banktransfer,mobilemoney,ussd",
    customer: {
      email: state.email,
      name: state.name,
    },
    meta: { storeId:props.storeDet.docId, paymentType: "purchase", productName: state.productName },
    subaccounts: [
      {
        id: props.storeDet.subaccount_id,
        // transaction_split_ratio: 9.07,
        transaction_charge_type: "flat_subaccount",
        transaction_charge: storeOwnerEarning
      },
      {
        id: props.storeDet.dispatcherSubAccId,
        // transaction_split_ratio: 0.558,
        transaction_charge_type: "flat_subaccount",
        transaction_charge: disaptchRiderEarning
      },
    ],
    customizations: {
      title: "Purchase Items(s)",
      description: "Purchase the items selected"
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  useEffect(() => {
    let itemsName = "";
    if (items.length > 0) {
      items.forEach(({ productName }, index) => {
        if (index === items.length - 1) {
          itemsName += `${productName}`;
        } else {
          itemsName += `${productName}, `;
        }
      });
    }

    setstate((state) => ({ ...state, productName: itemsName }));
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value, isExists: false });
    if (!cantEditAmount) {
      setstate((state) => ({
        ...state,
        [name]: value,
        isExists: false,
      }));
    }
    // else {
    // 	setstate({ ...state, [name]: value, isExists: false });
    // }
  };

  const submitForm = () => {
    console.log(state, config, "***********");

    if (formRef.current.reportValidity()) {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
        },
        onClose: () => {
          console.log("closed");
        },
      });
      return true;
    }
  };

  const { productName, name, email } = state;
  console.log(totalItemAmount, 333333333);
  return (
    <div>
      <FormContainer
        btn={(onOpen) => <BtnComp handleClickOpen={onOpen} />}
        saveFunc={submitForm}
        title="Buy Product(s)"
        saveVal="continue"
        // isSaving={isSaving}
      >
        <Box py={2.5} margin="0 auto">
          <form autoComplete="off" ref={formRef}>
            <Box my={1} mb="24px">
              <FormTextField
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="text"
                name="name"
                placeholder="input your full name"
                value={name}
                onChange={handleChange}
                required
              />
            </Box>
            <Box my={1} mb="24px">
              <FormTextField
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="email"
                name="email"
                placeholder="input your email address"
                value={email}
                onChange={handleChange}
                required
              />
            </Box>
            <FormTextField
              id="outlined-size-small"
              variant="outlined"
              size="small"
              type="text"
              name="productName"
              placeholder="input gift name"
              value={productName}
              onChange={handleChange}
              disabled={cantEditName}
              required
            />
            <Box my={1} display="flex">
              <FormControl>
                <InputLabel id="demo-customized-select-label">
                  Total Item cost
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="currency"
                  value={currency}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={currency} key={currency}>
                    {getCurrency(currency).symbolFormat || currency}
                  </MenuItem>
                </Select>
              </FormControl>
              <Box mt="24px">
                <FormTextField
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  type="number"
                  name="amount"
                  placeholder="amount"
                  value={totalItemAmount}
                  onChange={handleChange}
                  disabled={cantEditAmount}
                  InputProps={{ inputProps: { min: 1 } }}
                  required
                />
              </Box>
            </Box>
            <Box my={1} display="flex">
              <FormControl>
                <InputLabel id="demo-customized-select-label">
                  Delivery fee
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  name="currency"
                  value={currency}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={currency} key={currency}>
                    {getCurrency(currency).symbolFormat || currency}
                  </MenuItem>
                </Select>
              </FormControl>
              <Box mt="24px">
                <FormTextField
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  type="number"
                  name="amount"
                  placeholder="amount"
                  value={deliveryFee}
                  onChange={handleChange}
                  disabled={cantEditAmount}
                  InputProps={{ inputProps: { min: 1 } }}
                  required
                />
              </Box>
            </Box>
          </form>
          <Box width="22rem" fontWeight="bold">
            You will be charged a total of{" "}
            <Box color="red" component="span">{formatLocaleCurrency(
              totalItemAmount + deliveryFee,
              currency
            )}</Box>
            , click continue if you would like to proceed
          </Box>
        </Box>
      </FormContainer>
    </div>
  );
}

export default withRouter(GiftPurchaseForm);

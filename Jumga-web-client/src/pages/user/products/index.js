import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Navigation from "../../../components/navigation";
import { Box, FormLabel, Button } from "@material-ui/core";
import { useStyles } from "./styles";
import { FormTextField, BootstrapInput } from "../../../components/formTextField";
import FormContainer from '../../../components/formDialog';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LinkIcon from '@material-ui/icons/Link';
import {
  selectProducts,
  selectIsFetchingProductStore,
  selectStoreDetails,
  selectIsRegistering,
} from "../../../redux/productStore/productStore.selector";
import {
  getProductStoreStart,
  productRegisterStart,
} from "../../../redux/productStore/productStore.actions";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import Spinner from "../../../components/spinner/Spinner";
import FloatingAddBtn from "../../../components/floatingAddBtn";
import { ProductList } from "./productList";
import { getCurrency } from 'country-currency-map';

export const Products = ({
  getProductStoreStart,
  user: { id: userId,  currency: userCurrency },
  products,
  isLoading,
  productRegisterStart,
  isSaving,
  productStoreDet
}) => {
  console.log(userCurrency,88888)
  const classes = useStyles();
  const [state, setstate] = useState({
    productName: "",
    productCoverImg: "",
    isLargeFile: false,
    productDesc: "",
    amount: 1,
    currency: userCurrency || "USD" ,
    isExists: false,
  });
  const [link, setLink] = useState('')
  const formRef = React.useRef();

  useEffect(() => {
    if (userId && products.length === 0) getProductStoreStart(userId);
    //eslint-disable-next-line
  }, []);

  
	useEffect(() => {
		setTimeout(() => setLink(''), 3000);
  }, [link])
  
  const handleLinkSharing = () => {
		if(navigator.clipboard) {
			 navigator.clipboard.writeText(`${window.location.href}/${productStoreDet.id}`)
      setLink('copied!')
		}
  }
  console.log(link)
  const { productName, productDesc, isLargeFile, currency, amount, isExists } = state;

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value, isExists: false });
  };

  const handleFileSelect = (e) => {
    console.log(e.target.files);
    if (e.target.files[0]?.size > 1000000) {
      setstate({
        ...state,
        productCoverImg: e.target.files[0],
        isLargeFile: true,
        isExists: false,
      });
    } else {
      setstate({
        ...state,
        productCoverImg: e.target.files[0] || "",
        isLargeFile: false,
        isExists: false,
      });
    }
  };
  console.log(state, isLoading, "===========");
  const submitForm = () => {
    const isproductName = checkproductName(productName);
    setstate({ ...state, isExists: isproductName });
    console.log(state)
    if (formRef.current.reportValidity() && !isproductName && !isLargeFile) {
      productRegisterStart(state, productStoreDet.id);
      console.log("running.....")
      return true;
    }
  };

  const checkproductName = (name) => {
    return !!products.find(
      ({ productName }) => productName.toLowerCase().trim() === name.toLowerCase().trim()
    );
  };
console.log(products,isSaving,88888)
  return (
    <div>
      <Navigation path="products">
        <Box py={2} mx="1rem">
          <FormTextField
            id="outlined-size-small"
            variant="outlined"
            size="small"
            // className={classes.eventBtn}
            placeholder="search product by name"
          />
        </Box>
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
             {productStoreDet.id && <Box display="flex" mb={1} mx="1rem">
						<Button onClick={handleLinkSharing}>share link <LinkIcon /></Button>
						<Box color="red" alignSelf="center">{link}</Box>
					</Box>}
            <FormContainer
              btn={(onOpen) => <FloatingAddBtn handleClickOpen={onOpen} />}
              saveFunc={submitForm}
              isSaving={isSaving}
              title="Create Product"
            >
              <Box py={2} margin="0 auto">
                <form className={classes.root} autoComplete="off" ref={formRef}>
                  <Box mb="1rem">
                    <Box textAlign="left">
                      <FormLabel htmlFor="files">
                        upload the image for this product (optional)
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
                      <Box my={2} color="red">
                        please select a file not greater than 1mb
                      </Box>
                    )}
                  </Box>
                  <FormTextField
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    className={classes.eventBtn}
                    name="productName"
                    placeholder="Input product name"
                    value={productName}
                    onChange={handleChange}
                    required
                  />
                   {isExists && (
                    <Box my={1} color="red">
                      a product with this name already exists
                    </Box>
                  )}
                  <Box my={1} display="flex">
                    <FormControl>
                      <InputLabel id="demo-customized-select-label">
                        currency
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
                        value={amount}
                        onChange={handleChange}
                        InputProps={{ inputProps: { min: 1 } }}
                        required
                      />
                    </Box>
                  </Box>
                  <Box mb="1rem">
                    <FormTextField
                      variant="outlined"
                      size="small"
                      name="productDesc"
                      aria-label="minimum height"
                      rows={3}
                      placeholder="Product description"
                      multiline={true}
                      value={productDesc}
                      onChange={handleChange}
                    />
                  </Box>
                </form>
              </Box>
            </FormContainer>
            {products.length === 0 ? (
              "no products "
            ) : (
              <ProductList products={products} isSaving={isSaving} />
            )}
          </Fragment>
        )}
      </Navigation>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getProductStoreStart: (userId) => dispatch(getProductStoreStart(userId)),
  productRegisterStart: (eventDet, storeId) =>
    dispatch(productRegisterStart({ ...eventDet, storeId })),
});

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  products: selectProducts,
  isLoading: selectIsFetchingProductStore,
  isSaving: selectIsRegistering,
  productStoreDet: selectStoreDetails,
  // isAuthenticating: selectIsAuthenticating
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);

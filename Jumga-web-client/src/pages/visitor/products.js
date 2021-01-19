import React, { Fragment, useEffect, useState } from "react";
import useFetchFirebaseDoc from "../../custom-hooks/useFetchFirebaseDoc";
import { db } from "../../firebase/firebase.utils";
import { Card, Box, Button } from "@material-ui/core";
import { useStyles } from "./styles";
import { useTheme } from "@material-ui/core/styles";
import CustomCheckbox from "../../components/custom-checkBox";
import ProductPurchaseForm from "./ProductPurchaseForm";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";

export default function VisitorGifts(props) {
  const val = props.match ? props.match.params.productId : props.productId;
  const docRef = db.collection("stores").doc(val);
  const [state] = useFetchFirebaseDoc(docRef);

  return (
    <div>
      {state.loading ? (
        "loading"
      ) : state.data ? (
        <ProductItemsContainer storeDet={state.data} />
      ) : (
        "event page not found"
      )}
    </div>
  );
}

const ProductItemsContainer = ({ storeDet }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (selected.length > 0) {
      const sumVal = selected.reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) +
          parseFloat(currentValue.amount) * currentValue.quantity,
        0
      );
      console.log(7777777777777, sumVal);
      setSum(sumVal);
    }
  }, [selected]);

  const handleSelect = (addItem) => {
    if (selected.find((item) => item.productName === addItem.productName)) {
      setSelected((selected) => [
        ...selected.filter((item) => item.productName !== addItem.productName),
      ]);
    } else {
      setSelected((selected) => [...selected, addItem]);
    }
  };
  console.log(selected, 8888);

  const handleItemCountChange = (editItem) => {
    if (selected.find((item) => item.productName === editItem.productName)) {
      setSelected((selected) => [
        ...selected.filter((item) => item.productName !== editItem.productName),
        editItem,
      ]);
    }
  };

  const PayProductItemsBtn = ({ handleClickOpen }) => {
    return (
      <Box display="flex" justifyContent="flex-end" m="1rem">
        <Button
          color="primary"
          variant="contained"
          disabled={!selected.length}
          onClick={handleClickOpen}
        >
          checkout
        </Button>
      </Box>
    );
  };

  // console.log(products,5555)
  return (
    <div className={classes.cardConatiner}>
      {storeDet?.storeImgUrl && (
        <Box>
          <img
            src={storeDet?.storeImgUrl}
            alt="event cover"
            className={classes.coverImg}
          />
        </Box>
      )}
      <Box my={1} display="flex" justifyContent="center">
        <Box fontWeight="bold" mr={1}>
          Store Name:
        </Box>
        <Box>{storeDet?.storeName}</Box>
      </Box>
      <Box>
        <Box fontWeight="bold">Description:</Box>
        <Box>{storeDet?.storeDesc}</Box>
      </Box>
      <Fragment>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            {selected.length > 0 && (
              <Box display="flex" fontWeight="bold" ml={3}>
                <Box mr={1}> Total : </Box>
                <Box>{formatLocaleCurrency(sum, storeDet.currency)}</Box>
              </Box>
            )}
          </Box>
          <ProductPurchaseForm
            BtnComp={PayProductItemsBtn}
            items={selected}
            cantEditName={true}
            cantEditAmount={true}
            currency={storeDet.currency}
            totalItemAmount={sum}
            storeDet={storeDet}
          />
        </Box>
        {storeDet.products.length > 0 &&
          storeDet.products.map((product, index) => (
            <ProductItem
              product={product}
              key={product.productName + index}
              selectItem={handleSelect}
              handleItemCountChange={handleItemCountChange}
            />
          ))}
      </Fragment>
    </div>
  );
};

const ProductItem = ({ product, selectItem, handleItemCountChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const [itemCount, setItemCount] = useState(1);

  useEffect(() => {
    handleItemCountChange({ ...product, quantity: itemCount });
  }, [itemCount]);

  const increment = () => {
    setItemCount((state) => state + 1);
  };
  const decrement = () => {
    if (itemCount >= 2) setItemCount((state) => state - 1);
  };
  const { productName, currency, amount, productDesc, productImgUrl } = product;

  const handleChange = (event) => {
    setChecked(event.target.checked);
    selectItem({ ...product, quantity: itemCount });
  };
  return (
    <Card className={classes.productCard}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box className={classes.productName} mb={1} mr={1}>
            {productImgUrl ? (
              <img
                className={classes.productImg}
                src={productImgUrl}
                alt="product"
              />
            ) : (
              <Box className={classes.productWithoutImg}>No Image</Box>
            )}
          </Box>
          <Box className={classes.productName} mb={1}>
            {productName}
          </Box>
        </Box>
        {checked && (
          <Box className={classes.changeItemNumber}>
            <div className={classes.itemDecreaseNumber} onClick={decrement}>
              -
            </div>
            <input
              value={itemCount}
              className={classes.itemCountInput}
              readOnly
            />
            <div className={classes.itemIncreaseNumber} onClick={increment}>
              +
            </div>
          </Box>
        )}
        <Box display="flex" alignSelf="flex-start" mb={1}>
          <CustomCheckbox
            checked={checked}
            onChange={handleChange}
            color="default"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box textAlign="left">
          <Box color={theme.palette.common.ash} mb={1}>
            Prod. desc:{" "}
          </Box>
          {productDesc}
        </Box>
        <Box>
          <Box fontWeight="bold">
            {formatLocaleCurrency(itemCount * amount, currency)}
          </Box>
        </Box>
        {/* <Box>
          <ProductListMenu />
        </Box> */}
      </Box>
    </Card>
  );
};

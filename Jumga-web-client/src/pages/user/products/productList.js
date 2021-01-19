import React from "react";
import { connect } from "react-redux";
import { Card, Box } from "@material-ui/core";
import { formatLocaleCurrency } from "country-currency-map";
import { useStyles } from "./styles";
import ProductListMenu from "./productListMenu";
import { useTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

export const ProductList = ({ products, isSaving }) => {
  const classes = useStyles();
  console.log(products, 777);
  const outOfStockProducts = [];
  const inStockProducts = [];

  products.forEach((product) => {
    if (product.outOfStock) {
      outOfStockProducts.push(product);
    } else {
      inStockProducts.push(product);
    }
  });

  return (
    <div
      className={classes.cardConatiner}
      style={{ filter: isSaving ? "blur(1px)" : "none" }}
    >
      {inStockProducts.length > 0 && (
        <Box m="1rem" fontWeight="bold">
          In Stock Products
        </Box>
      )}
      {inStockProducts.map((product, index) => (
        <ProductItem key={product.productName + index} product={product} />
      ))}
      {outOfStockProducts.length > 0 && (
        <Box m="1rem" fontWeight="bold">
          Out Of Stock Products
        </Box>
      )}
      {outOfStockProducts.map((product, index) => (
        <ProductItem key={product.productName + index} product={product} />
      ))}
      {/* {products.length === 0 && <Box  m="1rem" fontWeight="bold">No products yet, please create an event</Box>} */}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

const ProductItemComp = ({ product }) => {
  const { productName, productImgUrl, productDesc, currency, amount } = product;
  const classes = useStyles();
  const theme = useTheme();
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
              <Box  className={classes.productWithoutImg}>No Image</Box>
            )}
          </Box>
          <Box className={classes.productName} mb={1}>
            {productName}
          </Box>
        </Box>
        <Box>
          <Box fontWeight="bold">{formatLocaleCurrency(amount, currency)}</Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Box color={theme.palette.common.ash} mb={1}>Prod. desc: </Box>
          {productDesc}
        </Box>
        <Box>
          <ProductListMenu />
        </Box>
      </Box>
    </Card>
  );
};

const ProductItem = withRouter(ProductItemComp);

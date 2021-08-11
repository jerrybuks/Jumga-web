import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Box } from "@material-ui/core";

export default function EmptyPurchase() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box>
        <Box>You have not made any recent Purchase</Box>
        <Box mt="1rem">
          <AddShoppingCartIcon color="error" style={{ fontSize: "10rem" }} />
        </Box>
      </Box>
    </Box>
  );
}

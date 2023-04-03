import { LensTwoTone } from "@mui/icons-material";
import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  var productData = [];
  // console.log(cartData);
  // console.log(productsData);
  for (var i = 0; i < cartData.length; i++) {
    for (var j = 0; j < productsData.length; j++) {
      // console.log(productsData[j]._id +" "+ cartData[i].productId)
      if (cartData[i].productId === productsData[j]._id) {
        productData.push({
          name: productsData[j].name,
          qty: cartData[i].qty,
          category: productsData[j].category,
          cost: productsData[j].cost,
          rating: productsData[j].rating,
          image: productsData[j].image,
          productid: productsData[j]._id,
        });
      }
    }
  }
  // console.log(productData);
  return productData;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let totalCost = 0;
  for (var i = 0; i < items.length; i++) {
    totalCost += items[i].cost * items[i].qty;
  }
  return totalCost;
};

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */

const ItemQuantity = ({ value, handleAdd, handleDelete, isReadOnly}) => {
  
  return (
    <Stack direction="row" alignItems="center">
      {!isReadOnly && (
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>) }
      {isReadOnly ? (
        <>
        <span>Qty:</span>
        <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      </>
      ) : (
        <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      )}      
      
      {!isReadOnly && (
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
      )}
    </Stack>
  );
};

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 *
 */
const getTotalProds = (items = []) => {
  console.log(items);
  return items.length;
}


const Cart = ({ products, items = [], handleQuantity, isReadOnly }) => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  // console.log(items);
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {items.map((item, id) => {
          return (
            <Box display="flex" alignItems="flex-start" padding="1rem" key={id}>
              <Box className="image-container">
                <img
                  // Add product image
                  src={item.image}
                  // Add product name as alt eext
                  alt={item.category}
                  width="100%"
                  height="100%"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{item.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  
                  {isReadOnly ? (
                    <ItemQuantity value = {item.qty} isReadOnly />
                  ) : (
                  <ItemQuantity
                    // Add required props by checking implementation
                    
                    handleAdd={async () =>
                      await handleQuantity(
                        token,
                        items,
                        products,
                        item.productid,
                        item.qty + 1,
                        { preventDuplicate: false }
                      )
                    }
                    handleDelete={async () =>
                      await handleQuantity(
                        token,
                        items,
                        products,
                        item.productid,
                        item.qty - 1,
                        { preventDuplicate: false }
                      )
                    }
                    value={item.qty}
                  /> )
                  }
                  <Box padding="0.5rem" fontWeight="700">
                    ${item.cost}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}

        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        {!isReadOnly && (
          <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={
              
              ()=>{
                history.push("/checkout")
              }
            }
          >
            Checkout
          </Button>
        </Box>
        )}  

      </Box>
      {isReadOnly && (
        <Box className="cart">
          <Box className="cart-row" padding={2}><h2>Order Details</h2></Box>
          
          <Stack spacing={2} padding={2}>
          <Box className="cart-row"><span>Products </span>{getTotalProds(items)}</Box>
          <Box className="cart-row"><span>Subtotal </span> ${getTotalCartValue(items)}</Box>
          <Box className="cart-row"><span>Shipping Charges </span> <span>$0</span></Box>
          <Box className="cart-row"><h4>Total</h4> <h4>${getTotalCartValue(items)}</h4></Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Cart;

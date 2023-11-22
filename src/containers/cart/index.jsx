"use client";
import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartData, setCartData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const token = localStorage.getItem("token");
  const router = useRouter();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const fetchUserCart = async () => {
    try {
      const response = await fetch(
        "https://ecommerce-server-le5a.onrender.com/api/product/getusercart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const cart = await response.json();
        setCartData(cart.data);
      } else {
        console.error("Failed to fetch user cart data");
      }
    } catch (error) {
      console.error("Error fetching user cart data:", error);
    }
  };

  const removeFromCart = async (productId) => {
    console.log("productId", productId);
    try {
      const response = await fetch(
        `https://ecommerce-server-le5a.onrender.com/api/product/removefromcart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        // Update cartData immediately after successful removal
        const updatedCart = cartData.filter(
          (product) => product.product_id._id !== productId
        );
        setCartData(updatedCart);
      } else {
        console.error("Failed to remove product from cart");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleIncrement = async (cartId) => {
    // console.log('productId', productId)
    const productToUpdate = cartData.find((product) => product._id === cartId);
    const updatedQuantity = productToUpdate.qty + 1;
    handleQuantityChange(cartId, updatedQuantity);
  };

  const handleDecrement = async (cartId, productId) => {
    console.log("productId", productId);
    const productToUpdate = cartData.find((product) => product._id === cartId);
    if (productToUpdate.qty > 1) {
      const updatedQuantity = productToUpdate.qty - 1;
      handleQuantityChange(cartId, updatedQuantity);
    }
    if (productToUpdate.qty === 1) {
      removeFromCart(productId);
    }
  };

  const handleQuantityChange = async (cartId, newQuantity) => {
    await updateCartQuantity(cartId, newQuantity);
    fetchUserCart();
  };

  const updateCartQuantity = async (cartId, newQuantity) => {
    try {
      const response = await fetch(
        `https://ecommerce-server-le5a.onrender.com/api/product/updatecart/${cartId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qty: newQuantity }),
        }
      );
      if (!response.ok) {
        console.error("Failed to update cart quantity");
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch(
        "https://ecommerce-server-le5a.onrender.com/api/product/createorder",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setSnackbarMessage("Order successful!");
        setSnackbarOpen(true);
        setTimeout(() => {
          router.push("order-history");
        }, 2000);
      } else {
        setSnackbarMessage("Error Order Create. Please try again.");
        setSnackbarOpen(true);
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserCart();
    }
  }, [token]);

  return (
    <>
      <Box
        sx={{
          marginTop: "15px",
          justifyContent: "center",
          gap: 4,
          display: { sm: "block", md: "flex" },
        }}
      >
        <>
          <Box>
            <Card sx={{ boxShadow: 4, minWidth: { md: "600px" } }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <KeyboardBackspaceOutlinedIcon
                  fontSize="large"
                  onClick={() => router.push("/")}
                />
                <Typography variant="h5">Continue Shopping</Typography>
              </Box>
              <Divider />

              {cartData?.map((product, id) => (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      padding: "10px",
                    }}
                    key={id}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Box
                        component="img"
                        src={`https://ecommerce-server-le5a.onrender.com/${product.product_id?.image}`}
                        height="100px"
                      ></Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginLeft: "15px",
                        }}
                      >
                        <Typography variant="body1">
                          {product?.product_id?.name}
                        </Typography>
                        <Typography>₹ {product?.product_id?.price}</Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          padding: "15px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleDecrement(product._id, product.product_id._id)
                          }
                        >
                          <RemoveIcon />
                        </Button>

                        <Typography>{product?.qty}</Typography>

                        <Button onClick={() => handleIncrement(product._id)}>
                          <AddIcon />
                        </Button>
                      </Box>

                      <Box sx={{ padding: "15px" }}>
                        <Typography variant="body1">
                          ₹ {product.product_id?.price * product.qty}
                        </Typography>
                      </Box>
                      <Box sx={{ padding: "15px" }}>
                        <DeleteIcon
                          onClick={() => removeFromCart(product.product_id._id)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </>
              ))}
              <Divider />
            </Card>
          </Box>

          <Box>
            <Card
              sx={{
                minWidth: "250px",
                boxShadow: 4,
                marginTop: { xs: "20px", md: "0px" },
              }}
            >
              <Box sx={{ padding: "5px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px",
                  }}
                >
                  <Typography variant="h5">Card Details</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "15px",
                    marginTop: "10px",
                    gap: 2,
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Card Holder's Name"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Card Number"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Expiration"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    label="CVV"
                    variant="outlined"
                  />
                  <Button variant="contained" onClick={createOrder}>
                    Process to Pay
                  </Button>
                  <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                    action={
                      <Button
                        color="secondary"
                        size="small"
                        onClick={handleCloseSnackbar}
                      >
                        Close
                      </Button>
                    }
                  />
                </Box>
              </Box>
            </Card>
          </Box>
        </>
      </Box>
    </>
  );
};

export default CartPage;

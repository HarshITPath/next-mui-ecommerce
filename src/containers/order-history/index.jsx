"use client";
import { extractDateComponents } from "@/utils/helper";
import { Box, Card, Container, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://ecommerce-server-le5a.onrender.com/api/product/getusersorder",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setOrderHistory(data.data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <>
      <Container>
        {orderHistory.map((order, index) => {
          return (
            <Box key={index} sx={{ marginTop: "15px" }}>
              <Card sx={{ padding: "5px" }}>
                <Typography variant="h5" sx={{ fontWeight: "600" }}>
                  Orders Details
                </Typography>
                <Divider />
                <Box
                  sx={{
                    marginTop: "15px",
                    display: "flex",
                    gap: { xs: 2, md: 5, lg: 10 },
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Box>
                    <Typography variant="body1">Order Id</Typography>
                    <Typography variant="body1">{order.order._id}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">Date Of Order</Typography>
                    <Typography variant="body1">
                      {extractDateComponents(order.order.createdAt)}
                    </Typography>
                  </Box>
                </Box>
                <Divider />

                {order.orderDetails.map((product, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Box
                        component="img"
                        src={`https://ecommerce-server-le5a.onrender.com/${product.product_id.image}`}
                        height="100px"
                        width="100px"
                        marginTop="25px"
                      ></Box>
                      <Box sx={{ display: "flex", gap: 4, flex: 1 }}>
                        <Typography
                          sx={{ flex: 1, whiteSpace: "unset" }}
                          variant="body1"
                        >
                          {product.product_id.name}
                        </Typography>
                        <Typography
                          sx={{ flex: 1, whiteSpace: "unset" }}
                          variant="body1"
                        >
                          ₹ {product.product_id.price}
                        </Typography>
                        <Typography
                          sx={{ flex: 1, whiteSpace: "unset" }}
                          variant="body1"
                        >
                          Quantity : {product.qty}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Card>
            </Box>
          );
        })}
      </Container>
    </>
  );
};

export default OrderHistoryPage;

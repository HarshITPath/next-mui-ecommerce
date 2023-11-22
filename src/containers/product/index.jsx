"use client";
import ProductCard from "@/components/card";
import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://ecommerce-server-le5a.onrender.com/api/product/getallProduct",
      // {
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //   },
      // }
    )
      .then((response) => {
        // console.log("response", response);
        return response.json();
      })
      .then((data) => {
        console.log('data', data)
        setProducts(data?.data?.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);
  return (
    <div>
      <Container maxWidth="xl" sx={{ marginTop: "25px" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <ClipLoader size={150} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {products?.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default ProductPage;

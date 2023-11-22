"use client";
import { theme } from "@/utils/theme";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import React, { useEffect, useState } from "react";


const ProductDetailsPage = ({ params }) => {
  console.log("details params", params);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ecommerce-server-le5a.onrender.com/api/product/getproductbyid/${params.slug}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data.Product);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [params.slug]);

  console.log("details products", products);

  return (
    <div>
      <Container>
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
          <Grid container spacing={1} sx={{ marginTop: "15px" }}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                width="auto"
                height="250px"
                image={`https://ecommerce-server-le5a.onrender.com/${products.image}`}
                alt="Product Name"
                variant="outlined"
                sx={{ height: "300px", objectFit: "contain" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent sx={{ padding: { xs: 0, md: 2 } }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="h4">{products.name}</Typography>
                  <Typography variant="h5">$ {products.price}</Typography>
                  <Typography>{products.desc}</Typography>
                  <Typography variant="h6">{products.category}</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default ProductDetailsPage;

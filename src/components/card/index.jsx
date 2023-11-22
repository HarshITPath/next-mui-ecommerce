import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { ICONS } from "../../assets/index";
import { theme } from "@/utils/theme";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";

const ProductCard = ({ product }) => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const router = useRouter();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const addToCart = async (id) => {
    console.log("id", id);
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(
          `https://ecommerce-server-le5a.onrender.com/api/product/addtocart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ product_id: id }),
          }
        );

        if (response.ok) {
          setSnackbarMessage("Product Added to Cart Successfully");
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage("Failed to Add Product in Cart ");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      console.error("Token not found in local storage");
    }
  };

  return (
    <Fragment>
      <Card variant="outlined">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            cursor: "pointer",
          }}
          onClick={() => {
            handleNavigation(`product/${product._id}`);
            console.log("id", product._id);
          }}
        >
          <CardMedia
            component="img"
            width="auto"
            image={`https://ecommerce-server-le5a.onrender.com/${product.image}`}
            alt="Product Name"
            sx={{ height: "200px", objectFit: "contain" }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                >
                  {product.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.4,
                    color: theme.palette.warning.main,
                  }}
                >
                  {product.bestSeller ? (
                    <ICONS.star
                      sx={{ fontSize: "15px" }}
                      style={{ marginBottom: "4px" }}
                    />
                  ) : null}
                </Box>
              </Box>
              <Typography
                variant="subtitle2"
                color={theme.palette.grey[500]}
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {product.desc}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="h6" fontWeight={600}>
                    ₹ {product.price}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.success.main,
                  fontWeight: 600,
                }}
              >
                {product.category}
              </Typography>
            </Box>
          </CardContent>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            addToCart(product._id);
          }}
        >
          Add To Cart
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
      </Card>
    </Fragment>
  );
};

export default ProductCard;

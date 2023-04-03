import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card" key={product._id}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
      ></CardMedia>
      <CardContent>
        <Typography variant="span">{product.name}</Typography>
        <Typography variant="h6">${product.cost}</Typography>
        <Rating name="read-only" value={product.rating} readOnly />
        <CardActions>
          <Button fullWidth variant="contained" onClick={handleAddToCart}>
            ADD TO CART
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

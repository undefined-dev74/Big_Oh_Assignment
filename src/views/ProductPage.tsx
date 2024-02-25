import { useFetchProducts } from "@/queries/productQueries";
import Product from "@/types/Product";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import AddProduct from "./AddProduct";

const ProductPage = () => {
  const { data, isLoading, isSuccess } = useFetchProducts();

  return (
    <Box>
      <Grid
        container
        flexDirection={"row"}
        rowSpacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg={12} md={12}>
          <AddProduct />
        </Grid>
        {isSuccess &&
          data?.products.reverse().map((item: Product) => (
            <Grid key={item.id} item lg={4} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={
                        item.thumbnail ??
                        "https://img.freepik.com/free-vector/cart-basket-shopping-icons-finance_24911-45461.jpg?w=740&t=st=1708832351~exp=1708832951~hmac=8f41c31cfa09109222173a65b3ceabe68a41713bc706b5700c3e65064d911b3d"
                      }
                      sx={{ bgcolor: red[500] }}
                      aria-label={item.title}
                    />
                  }
                  action={
                    <IconButton aria-label="settings">
                      {/* <MoreVertIcon /> */}
                    </IconButton>
                  }
                  title={item.title}
                  subheader={item.price}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={
                    item.thumbnail ??
                    "https://img.freepik.com/free-vector/cart-basket-shopping-icons-finance_24911-45461.jpg?w=740&t=st=1708832351~exp=1708832951~hmac=8f41c31cfa09109222173a65b3ceabe68a41713bc706b5700c3e65064d911b3d"
                  }
                  alt="brand image"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions> */}
              </Card>
            </Grid>
          ))}
        {isLoading && <p>Loading...</p>}
      </Grid>
    </Box>
  );
};

export default ProductPage;

import { FormInput } from "@/components/Forms/InputField";
import { useAddProduct } from "@/queries/productQueries";
import { zodResolver } from "@hookform/resolvers/zod";

import { Alert, Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Product name is required",
  }),
  description: z.string().min(1, {
    message: "Product description required.",
  }),
  price: z.string().min(1, { message: "Price is required!" }),
});

const AddProduct = () => {
  const { mutateAsync, isSuccess } = useAddProduct();
  const { control, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  });

  // submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values);
    reset();
  }

  return (
    <Box mt={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        flexDirection="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <FormInput name="title" label="Add Product" control={control} />
        </Grid>
        <Grid item>
          <FormInput
            name="description"
            label="Product description"
            control={control}
          />
        </Grid>
        <Grid item>
          <FormInput
            type="number"
            name="price"
            label="Price"
            control={control}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </Grid>
        {isSuccess ? (
          <Grid item lg={12}>
            <Alert severity="success">Product Added successfully!</Alert>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default AddProduct;

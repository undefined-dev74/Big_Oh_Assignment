import { addProduct, fetchAllProducts } from "@/services/products";
import { SuccessResponse } from "@/types";
import Product from "@/types/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      /* New added product will not be added to the server
        https://dummyjson.com/docs/products
        so we are just adding newly added product from the response to existing product
        
        reference of dummyjson 
            Adding a new product will not add it into the server.
            It will simulate a POST request and will return the new created product with a new id
    */

      // However if we want new added response we have the option like from queryClient
      // queryClient.invalidateQuery({queryKey:['products']})
      queryClient.setQueryData(
        ["products"],
        (prevProducts: SuccessResponse<Product[]>) => {
          return {
            ...prevProducts,
            products: [newProduct, ...prevProducts.products],
          };
        }
      );
    },
  });
};

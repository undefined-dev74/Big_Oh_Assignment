import apiClient from "@/services/apiClient";
import { SuccessResponse } from "@/types";
import Product from "@/types/Product";

export const fetchAllProducts = async (): Promise<
  SuccessResponse<Product[]>
> => {
  const response = await apiClient.get(`products`);
  return response.data;
};

export const addProduct = async (payload: {
  title: string;
  price: string;
  description: string;
}): Promise<SuccessResponse> => {
  const response = await apiClient.post("products/add", payload);
  return response.data;
};

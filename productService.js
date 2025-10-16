import { AxiosError } from "axios";
import axios from "./axios.js";

export async function getProductList(params) {
  try {
    const response = await axios.get("/products", { params });
    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status >= 400
    ) {
      console.error("Failed to fetch products");
    }
    throw error;
  }
}

export async function getProduct(productId) {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status >= 400
    ) {
      console.error("Failed to fetch product");
    }
    throw error;
  }
}

export async function createProduct(data) {
  try {
    const response = await axios.post("/products", data);
    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status >= 400
    ) {
      console.error("Failed to create product");
    }
    throw error;
  }
}
export async function patchProduct(productId, data) {
  try {
    const response = await axios.patch(`/products/${productId}`, data);
    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status >= 400
    ) {
      console.error("Failed to patch product");
    }
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await axios.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status >= 400
    ) {
      console.error("Failed to delete product");
    }
    throw error;
  }
}

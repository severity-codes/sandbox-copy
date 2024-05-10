// api.js

import axios from "axios";

const API_BASE_URL = "/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const searchRecipes = async (query) => {
  try {
    const response = await api.get("/search", { params: { query } });
    return response.data;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw new Error("Failed to search recipes");
  }
};

import axios from "axios";
import { API_URL } from "./ApiConstants";

const getHeaders = (isContentType?: boolean) => {
  let headers: Record<string, string> = {};
  if (isContentType) {
    headers = {
      "Content-Type": "application/json",
    };
  }
  return headers;
};

export const getAllTasks = async (url: string) => {
  const headers = getHeaders(true);
  try {
    const res = await axios.get(`${API_URL}${url}`, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in GET: ", error);
    throw error;
  }
};

export const addTask = async (url: string, data: any) => {
  const headers = getHeaders(true);
  try {
    const res = await axios.post(`${API_URL}${url}`, data, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in POST: ", error);
    throw error;
  }
};

export const deleteTask = async (url: string) => {
  const headers = getHeaders(true);
  try {
    const res = await axios.delete(`${API_URL}${url}`, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in DELETE: ", error);
    throw error;
  }
};

export const editTask = async ( url: string, data: any,) => {
  const headers = getHeaders(true);
  try {
    const res = await axios.post(`${API_URL}${url}`, data, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in PUT: ", error);
    throw error;
  }
};

export const changeStatus = async (url: string) => {
  const headers = getHeaders(true);
  try {
    const res = await axios.put(`${API_URL}${url}`, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in PUT: ", error);
    throw error;
  }
};

export const getTaskById = async (url: string) => {
  const headers = getHeaders(true);
  try {
    const res = await axios.get(`${API_URL}${url}`, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in GET: ", error);
    throw error;
  }
};

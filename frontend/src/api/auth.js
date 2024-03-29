import client from "./client";

export const createUser = async (userInfo) => {
  try {
    //data contains response from the backend
    const { data } = await client.post("/user/create", userInfo);
    return data;
  } catch (error) {
    //response is an important object contain responses from the backend
    const { response } = error;

    //if backend has specific error response
    if (response?.data) return response.data;

    //if backend doesn't have details about the error, return an object contains
    //the error message or the whole error object if not applicable
    return { error: error.message || error };
  }
};

export const verifyUserEmail = async (userInfo) => {
  try {
    //data contains response from the backend
    const { data } = await client.post("/user/verify-email", userInfo);
    return data;
  } catch (error) {
    //response is an important object contain responses from the backend
    const { response } = error;

    //if backend has specific error response
    if (response?.data) return response.data;

    //if backend doesn't have details about the error, return an object contains
    //the error message or the whole error object if not applicable
    return { error: error.message || error };
  }
};

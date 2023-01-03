import * as httpRequest from "../utils/httpRequest";

export const addCarts = async (userID, productID, quantity, price) => {
  try {
    const res = await httpRequest.post(`/users/${userID}/carts/${productID}`, {
      quantity,
      price,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCarts = async (userID, productID) => {
  try {
    const res = await httpRequest.delet(`/users/${userID}/carts/${productID}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

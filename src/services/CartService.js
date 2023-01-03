import * as httpRequest from "../utils/httpRequest";

export 
const Carts = async (userID) => {
  try {
    const res = await httpRequest.get(`/users/${userID}/carts`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

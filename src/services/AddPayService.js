import * as httpRequest from "../utils/httpRequest";

export const getPay = async (userID) => {
  try {
    const res = await httpRequest.post(`/users/${userID}/pay`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPay = async (userID, data) => {
  try {
    const res = await httpRequest.post(`/users/${userID}/pay`, {
      pay_data: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

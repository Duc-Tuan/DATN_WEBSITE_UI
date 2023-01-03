import * as httpRequest from "../utils/httpRequest";

export const getHistory = async (userID, histStatus = "") => {
  try {
    const res = await httpRequest.get(`/users/${userID}/history/${histStatus}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addHistory = async (userID, data) => {
  try {
    const res = await httpRequest.post(`/users/${userID}/history`, {
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

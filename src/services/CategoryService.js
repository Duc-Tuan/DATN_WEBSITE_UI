import * as httpRequest from "../utils/httpRequest";

export const getCategory = async () => {
  try {
    const res = await httpRequest.get(`/category`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

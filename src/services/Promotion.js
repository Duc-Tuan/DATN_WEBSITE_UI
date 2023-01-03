import * as httpRequest from "../utils/httpRequest";

export const getPromotion = async () => {
  try {
    const res = await httpRequest.get(`/promotion`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

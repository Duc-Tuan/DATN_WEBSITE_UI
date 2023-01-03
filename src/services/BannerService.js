import * as httpRequest from "../utils/httpRequest";

export const getBanner = async () => {
  try {
    const res = await httpRequest.get(`/banner`);
    return res.Banner;
  } catch (error) {
    console.log(error);
  }
};

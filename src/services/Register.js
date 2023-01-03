import * as httpRequest from "../utils/httpRequest";

export const UserRegister = async (data) => {
  try {
    const res = await httpRequest.post("users/register", {
      data
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

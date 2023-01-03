import * as httpRequest from "../utils/httpRequest";

export const UserPost = async (name, password) => {
  try {
    const res = await httpRequest.post("users/login", {
      name,
      password,
    });
    return res.token;
  } catch (error) {
    console.log(error);
  }
};

export const UserGet = async (token) => {
  try {
    if (token) {
      const res = await httpRequest.post("users/loginUser", {
        token,
      });
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const UserPatch = async (userID, data) => {
  try {
    const res = await httpRequest.patch(`users/${userID}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const UserGetComment = async (userID) => {
  try {
    const res = await httpRequest.get(`users/${userID}`);
    return res.user;
  } catch (error) {
    console.log(error);
  }
};

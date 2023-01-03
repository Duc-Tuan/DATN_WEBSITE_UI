import * as httpRequest from "../utils/httpRequest";

export const getCommentprod = async (productID) => {
  try {
    const res = await httpRequest.get(`/comments/${productID}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postCommentprod = async (productID, userID, content) => {
  try {
    const res = await httpRequest.post(`/comments/${productID}/${userID}`, {
      content
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

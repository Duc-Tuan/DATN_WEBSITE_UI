import * as httpRequest from "../utils/httpRequest";

export const products = async (page, pageSize) => {
  try {
    const res = await httpRequest.get("products", {
      params: {
        page,
        pageSize,
      },
    });
    return {
      data: res.data,
      totalPages: res.totalPage,
      currentpage: res.currentPage,
    };
  } catch (error) {
    console.log(error);
  }
};

export const productsID = async (productID) => {
  try {
    const res = await httpRequest.get(`products/${productID}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

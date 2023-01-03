import * as httpRequest from "../utils/httpRequest";

export const getProductCategory = async (name, page, pageSize) => {
  try {
    const res = await httpRequest.get(`/products/category/${name}`, {
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

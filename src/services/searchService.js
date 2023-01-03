import * as httpRequest from "../utils/httpRequest";

export const search = async (name, type = "less", page, pageSize) => {
  try {
    if (page !== undefined && pageSize !== undefined) {
      const res = await httpRequest.get("search/products", {
        params: {
          name,
          type,
          page,
          pageSize,
        },
      });
      return {
        data: res.data,
        totalPages: res.totalPage,
        currentpage: res.currentPage,
      };
    } else {
      const res = await httpRequest.get("search/products", {
        params: {
          name,
          type,
        },
      });
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

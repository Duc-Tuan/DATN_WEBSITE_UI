const routes = {
  home: "/",
  cart: "/carts",
  detailProduct: "/products/:ProductID",
  productCategory: "/products/category/:name",
  profileMy: "/profile/profileMy",
  profileAddress: "/profile/address",
  profileChangePass: "/profile/changePass",
  profileHistory: "/profile/history",
  search: "/search",
  login: "/login",
  resetPass: "/resetPassword",
  resetPassResult: "/resetPassword/:code/:userID",
  register: "/register",
  pay: "/pay",
  products: "/products",
  error: "/*",
};

export default routes;

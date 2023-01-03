import config from "../configs";

import { HeaderOnly, CategoryOnly, LayoutProfile } from "../Layouts";

import Home from "../pages/Home";
import Carts from "../pages/Cart";
import DetailProduct from "../pages/DetailProduct";
import {
  ProfileAddress,
  ProfileChangePass,
  ProfileHistory,
  ProfileMy,
} from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Pay from "../pages/Pay";
import Products from "../pages/Products";
import ProductCategory from "../pages/ProductCategory";
import Error from "../pages/Error";
import Search from "../pages/Search";
import ResetPass from "../pages/ResetPass";
import ResetPassResult from "../pages/ResetPassResult";

const publicRouters = [
  { path: config.routes.home, component: Home },
  { path: config.routes.cart, component: Carts, layout: HeaderOnly },
  {
    path: config.routes.detailProduct,
    component: DetailProduct,
    layout: HeaderOnly,
  },
  { path: config.routes.pay, component: Pay, layout: HeaderOnly },
  { path: config.routes.login, component: Login, layout: HeaderOnly },
  { path: config.routes.resetPass, component: ResetPass, layout: HeaderOnly },
  { path: config.routes.register, component: Register, layout: HeaderOnly },
  { path: config.routes.products, component: Products, layout: CategoryOnly },
  {
    path: config.routes.productCategory,
    component: ProductCategory,
    layout: CategoryOnly,
  },
  { path: config.routes.error, component: Error, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: HeaderOnly },
];

const privateRouters = [
  { path: config.routes.profileAddress, component: ProfileAddress, layout: LayoutProfile },
  { path: config.routes.profileChangePass, component: ProfileChangePass, layout: LayoutProfile },
  { path: config.routes.profileHistory, component: ProfileHistory, layout: LayoutProfile },
  { path: config.routes.profileMy, component: ProfileMy, layout: LayoutProfile },
];

const privateRoutersReset = [
  { path: config.routes.resetPassResult, component: ResetPassResult, layout: HeaderOnly },
]

export { publicRouters, privateRouters, privateRoutersReset };

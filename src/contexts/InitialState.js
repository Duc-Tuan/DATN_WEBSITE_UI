import { UserGet } from "../services/LoginService";
import { getBanner } from "../services/BannerService";
import { products } from "../services/ProductsService";
import { getPromotion } from "../services/Promotion";
import { getCategory } from "../services/CategoryService";
import * as CartService from "../services/CartService";
const token = localStorage.getItem("token");
let user = token ? UserGet(token) : null,
  banner = getBanner(),
  product = products(1, 12),
  promotion = getPromotion(),
  category = getCategory(),
  carts = token
  ? UserGet(token)
  .then(async (data) => {
    const cart = await CartService.Carts(data._id);
    localStorage.setItem("carts", JSON.stringify(cart.carst));
    return cart.carst;
  })
  .catch((error) => console.log(error))
  : [];
  
export const initialState = {
  user,
  carts,
  banner,
  product,
  promotion,
  category,
};

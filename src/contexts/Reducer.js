import * as AddCartService from "../services/AddCartsService";
import * as CartService from "../services/CartService";
import * as UserService from "../services/LoginService";

const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const SET_CARTS = "SET_CARTS";
const SET_SEARCH = "SET_SEARCH";
const DELETE_CARTS = "DELETE_CARTS";
const CODE = "CODE";

export const setUser = (playoad) => {
  return {
    type: SET_USER,
    playoad,
  };
};

export const setCart = (data) => {
  return {
    type: SET_CARTS,
    data,
  };
};

export const setDeleteCart = (data) => {
  return {
    type: DELETE_CARTS,
    data,
  };
};

export const setUpdateUSer = (id_user, data) => {
  return {
    type: UPDATE_USER,
    id_user,
    data,
  };
};

export const setSearchProd = (data) => {
  return {
    type: SET_SEARCH,
    data,
  };
};

export const setCode = (data) => {
  return {
    type: CODE,
    data,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.playoad,
      };
    case CODE:
      localStorage.setItem("codeXM", action.data);
      return {
        ...state,
      };
    case SET_SEARCH:
      return {
        ...state,
        dataS: action.data,
      };
    case UPDATE_USER:
      const fetchUpdateUser = async () => {
        const dataUpdate = await UserService.UserPatch(
          action.id_user,
          action.data
        );
        const token = await UserService.UserPost(
          dataUpdate.user_name,
          dataUpdate.user_password
        );
        localStorage.setItem("token", token);
        const cart = await CartService.Carts(action.id_user);
        localStorage.setItem("carts", JSON.stringify(cart.carst));
        return dataUpdate;
      };
      const dataUser = fetchUpdateUser();
      return {
        ...state,
        user: dataUser.then((data) => {
          return data;
        }),
      };
    case DELETE_CARTS:
      const fetchDeleteCarts = async () => {
        let carts;
        if (state.user.constructor === Object) {
          await AddCartService.deleteCarts(state.user._id, action.data);
          carts = CartService.Carts(state.user._id);
        } else {
          await state.user.then(async (data) => {
            await AddCartService.deleteCarts(data._id, action.data);
            carts = CartService.Carts(data._id);
          });
        }
        return carts;
      };
      fetchDeleteCarts()
        .then((data) => {
          localStorage.setItem("carts", JSON.stringify(data.carst));
        })
        .catch((error) => console.log(error));

      const newCart = JSON.parse(localStorage.getItem("carts"));

      return {
        ...state,
        carts:
          state.user.constructor === Object
            ? [...newCart]
            : state.carts.then((data) => {
                const a = data.filter((item) => item._id !== action.data);
                return [...a];
              }),
      };
    case SET_CARTS:
      const fetch = async () => {
        let carts;
        if (state.user.constructor === Object) {
          await AddCartService.addCarts(
            state.user._id,
            action.data.id,
            action.data.quantity,
            action.data.price
          );
          carts = CartService.Carts(state.user._id);
        } else {
          await state.user.then(async (data) => {
            await AddCartService.addCarts(
              data._id,
              action.data.id,
              action.data.quantity,
              action.data.price
            );
            carts = CartService.Carts(data._id);
          });
        }
        return carts;
      };
      fetch()
        .then((data) => {
          localStorage.setItem("carts", JSON.stringify(data.carst));
        })
        .catch((error) => console.log(error));

      const dataCart = JSON.parse(localStorage.getItem("carts"));

      return {
        ...state,
        carts:
          state.user.constructor === Object
            ? [...dataCart, action.data]
            : state.carts.then((data) => [...data, action.data]),
      };
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};

export default reducer;

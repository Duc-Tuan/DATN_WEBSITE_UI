import { useStateValue } from "../../contexts/StateProvider";
import clasName from "classnames/bind";
import style from "./Cart.module.scss";
import Button from "../../components/Button";
import cartNull from "../../assets/Images/9bdd8040b334d31946f49e36beaf32db.png";
import { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import MessProduct from "../../components/MessProduct";
import { setCart, setDeleteCart } from "../../contexts/Reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import * as PayService from "../../services/AddPayService";
import { useNavigate } from "react-router-dom";

const ctx = clasName.bind(style);

class UserCarts {
  constructor(id, avatar, name, monney, quantity) {
    this._id = id;
    this.avatar = avatar;
    this.name = name;
    this.price = monney;
    this.quantity = quantity;
  }
}

function Carts() {
  var dataCarts = JSON.parse(localStorage.getItem("carts")) ?? [];
  const [{ user, carts, product }, dispatch] = useStateValue();
  const [isMessager, setIsMessager] = useState(false);
  const [Messager, setMessager] = useState("");
  const [data, setData] = useState([]);
  const [cart, setCarts] = useState([]);
  const [length, setLength] = useState([]);
  const [totalMonney, setTotalMonney] = useState(0);

  const Navigate = useNavigate();

  useEffect(() => {
    product.then((data) => setData(data.data));
  }, [product]);

  useEffect(() => {
    if (carts.length === 0) {
      setCarts(dataCarts);
    } else {
      if (carts.constructor === Array) {
        setCarts(carts);
      } else {
        carts.then((data) => setCarts(data));
      }
    }
  }, [carts]);

  useEffect(() => {
    const total = length.reduce(function (sum, data) {
      return sum + data.price;
    }, 0);
    setTotalMonney(Math.round(total * 100) / 100);
  }, [length]);

  const handleBuy = () => {
    if (user !== null) {
      if (user.constructor === Object) {
        if (length.length !== 0) {
          PayService.addPay(user._id, length);
          return Navigate("/pay");
        } else {
          setIsMessager(true);
          setMessager("You have not selected any products!!!");
        }
      } else {
        user
          .then((data) => {
            if (length.length !== 0) {
              PayService.addPay(data._id, length);
              return Navigate("/pay");
            } else {
              setIsMessager(true);
              setMessager("You have not selected any products!!!");
            }
          })
          .catch((error) => console.log(error));
      }
    } else {
      setIsMessager(true);
      setMessager("Error you are not logged in!!!");
    }
    return setTimeout(() => {
      setIsMessager(false);
    }, 1000);
  };

  const handleAddCart = (data, price) => {
    if (user !== null) {
      const dataCarts = {
        id: data._id,
        name: data.product_name,
        avatar: data.product_img,
        quantity: 1,
        percent: data.product_percent,
        monney: data.product_monney,
        price: price,
      };
      dispatch(setCart(dataCarts));
      setIsMessager(true);
      setMessager("Successfully add to cart!");
    } else {
      setIsMessager(true);
      setMessager("Error you are not logged in!!!");
    }
    return setTimeout(() => {
      setIsMessager(false);
    }, 1000);
  };

  const handleDelete = (data) => {
    if (user !== null) {
      setIsMessager(true);
      setMessager("Successfully delete to cart!");
      dispatch(setDeleteCart(data));
      return setTimeout(() => {
        setIsMessager(false);
      }, 1000);
    }
  };

  const arrayCats = [];

  const handleCartPay = (dt, e) => {
    const btnCheckAll = document.querySelector('input[name="checkAll"]');
    const checkAll = document.querySelectorAll("input[name='chekbos[]']");
    const checkAllChecked = document.querySelectorAll(
      "input[name='chekbos[]']:checked"
    );

    const isCheck = checkAll.length === checkAllChecked.length;
    if (isCheck) {
      btnCheckAll.checked = true;
    } else {
      btnCheckAll.checked = false;
    }

    const price = (dt.monney - dt.monney * (dt.percent / 100)) * dt.quantity;
    const result = Math.round(price * 100) / 100;
    const dataCartsPay = new UserCarts(
      dt._id,
      dt.avatar,
      dt.name,
      result,
      dt.quantity
    );
    const a = { ...dataCartsPay };
    if (e.target.checked) {
      arrayCats.push(a);
      setLength((prev) => [...prev, ...arrayCats]);
    } else {
      const a = length.filter((item) => item._id !== dt._id);
      setLength(a);
    }
  };

  const handleCheckAll = (e) => {
    const checkAll = document.querySelectorAll("input[name='chekbos[]']");
    const b = [...checkAll];
    if (e.target.checked === true) {
      b.map((data) => {
        if (data.checked === false) {
          data.checked = true;
        }
        return 1;
      });
      carts.then((data) => setLength(data));
    } else {
      b.map((data) => {
        if (data.checked === true) {
          data.checked = false;
        }
        return 1;
      });
      setLength([]);
    }
  };

  return (
    <div className={ctx("wapper", "container")}>
      {isMessager && <MessProduct data={Messager} />}
      {user && cart?.length !== 0 ? (
        <div className={ctx("carts", "mt-3")}>
          <div className={ctx("cart__menu", "dfcenter")}>
            <div className={ctx("checkbox", "dfcenter")}>
              <input
                type="checkbox"
                onChange={(e) => handleCheckAll(e)}
                name="checkAll"
              />
            </div>
            <div className={ctx("Name", "dfcenter")}>Name</div>
            <div className={ctx("Price")}>Price</div>
            <div className={ctx("Quantity")}>Qty</div>
            <div className={ctx("Monney")}>Monney</div>
            <div className={ctx("Manipulation")}>Delet</div>
          </div>
          <div className={ctx("cart__content", "my-2")}>
            {cart &&
              cart.map((data, index) => {
                return (
                  <div className={ctx("sub", "dfcenter my-4")} key={index}>
                    <div className={ctx("checkbox", "dfcenter")}>
                      <input
                        type="checkbox"
                        name="chekbos[]"
                        onChange={(e) => handleCartPay(data, e)}
                        value={data}
                        id="checkbox"
                      />
                    </div>
                    <div className={ctx("Name", "dfcenter")}>
                      <div className={ctx("img")}>
                        <img width="100%" src={data.avatar[0].url} alt="" />
                      </div>
                      <h6 className={ctx("nameProduct")}>{data.name}</h6>
                    </div>
                    <div className={ctx("Price")}>
                      {data.percent !== 0 ? (
                        <div className={ctx("dfcenter")}>
                          <del>$ {data.monney}</del>
                          <span className={ctx("mx-2")}> - </span>
                          <div className={ctx("pri")}>
                            ${data.monney - data.monney * (data.percent / 100)}
                          </div>
                        </div>
                      ) : (
                        <h6>$ {data.monney}</h6>
                      )}
                    </div>
                    <div className={ctx("Quantity", "dfcenter")}>
                      <div className={ctx("dfcenter", "sub")}>
                        <input
                          id={`cart${index}`}
                          type="number"
                          placeholder={data.quantity}
                          min="1"
                          onChange={(e) =>
                            (data.quantity = parseInt(e.target.value))
                          }
                        />
                      </div>
                    </div>
                    <div className={ctx("Monney")}>
                      <h6>$ {data.price}</h6>
                    </div>
                    <div className={ctx("Manipulation", "delete")}>
                      <Button onClick={() => handleDelete(data._id)}>
                        <h6>
                          <FontAwesomeIcon icon={faTrash} />
                        </h6>
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={ctx("cart__pay", "dfcenter")}>
            <div className={ctx("checkbox", "dfcenter")}>
              <label className={ctx("mx-2 fs-6")}>
                Select all ({length.length})
              </label>
            </div>

            <div className={ctx("dfcenter")}>
              <h6 className={ctx("total_pay")}>
                Total pay: <span className={ctx("mx-2")}>$ {totalMonney}</span>
              </h6>
              <Button className={ctx("btnBuy")} onClick={handleBuy}>
                <h6>Buy</h6>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={ctx("cartNull", "dfcenter")}>
          <div>
            <div className={ctx("img", "dfcenter")}>
              <img src={cartNull} alt="" />
            </div>
            <h5 className={ctx("name")}>Cart is empty!!</h5>
            <div className={ctx("dfcenter", "mt-4")}>
              <Button to={"/products"} className={ctx("btn")}>
                <h5>buy now</h5>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className={ctx("productMore", "mt-4")}>
        <h5 className={ctx("nameMore")}>You may also like</h5>

        <div className={ctx("products", "my-4")}>
          <div className={ctx("row")}>
            {data.map((product) => {
              return (
                <div
                  key={product._id}
                  className={ctx("col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6")}
                >
                  <Product data={product} onClick={handleAddCart} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carts;

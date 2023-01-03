import { useStateValue } from "../../contexts/StateProvider";
import classNames from "classnames/bind";
import style from "./Pay.module.scss";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import * as PayService from "../../services/AddPayService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import UpdateAdrress from "../../components/UpdateAdrress";
import * as addHistory from "../../services/AddHistorysService";
import MessProduct from "../../components/MessProduct";

const ctx = classNames.bind(style);

function Pay() {
  const [{ user }, dispatch] = useStateValue();
  const [data, setData] = useState(user);
  const [dataAddress, setDataAddress] = useState([]);
  const [dataPayUser, setDataPayUser] = useState([]);
  const [isAddress, setIsAddress] = useState(false);
  const [total, setTotal] = useState(0);
  const [tuition, setTuition] = useState(10);

  const [isMessager, setIsMessager] = useState(false);
  const [Messager, setMessager] = useState("");

  useEffect(() => {
    if (user !== null && user !== undefined) {
      if (user.constructor !== Object) {
        user.then((data) => {
          setDataAddress(data);
          const pay = PayService.getPay(data._id);
          return setData(pay);
        });
      } else {
        setDataAddress(user);
      }
    }
  }, [user]);

  useEffect(() => {
    if (data !== null && data.constructor !== Object) {
      data
        .then((dataCart) => {
          if (dataCart.pay_data) {
            const totalMonney = dataCart.pay_data.reduce(function (sum, data) {
              return sum + data.price;
            }, 0);
            setTotal(totalMonney);
          }
          return setDataPayUser(dataCart.pay_data);
        })
        .catch((err) => console.log(err));
    } else if (data !== null && data.constructor === Object) {
      const pay = PayService.getPay(data._id);
      pay
        .then((dataCart) => {
          if (dataCart.pay_data.length !== 0) {
            const totalMonney = dataCart.pay_data.reduce(function (sum, data) {
              return sum + data.price;
            }, 0);
            setTotal(totalMonney);
          }
          return setDataPayUser(dataCart.pay_data);
        })
        .catch((err) => console.log(err));
    }
  }, [data]);

  const handlePay = async (totalMoney) => {
    setIsMessager(true);
    if (
      dataAddress.user_address !== undefined &&
      dataAddress.user_address !== null
    ) {
      if (dataPayUser.length !== 0) {
        const data = {
          addrress_name: dataAddress.user_name,
          addrress_phone: dataAddress.user_phone,
          addrress: dataAddress.user_address,
          history: dataPayUser,
          status: "Unfinished",
          totalMoney,
          messs:
            "The goods will be delivered to you within 3-5 days (If you are far away, it may take 7-8 days to receive the goods). Thank you!!!",
        };
        const history = await addHistory.addHistory(dataAddress._id, data);
        setDataPayUser([]);
        setTotal(0);
        await PayService.addPay(dataAddress._id, []);
        setMessager(history.suss);
      } else {
        setMessager("Can't buy without product!!!");
      }
    } else {
      setMessager(
        "Payment cannot be made when your address is not available. Please update your address!!!"
      );
    }
    return setTimeout(() => {
      setIsMessager(false);
    }, 1000);
  };

  return (
    <div className={ctx("container", "wapper")}>
      {isMessager && <MessProduct data={Messager} />}
      {isAddress && <UpdateAdrress onClick={() => setIsAddress(false)} />}
      {user ? (
        <div className={ctx("pay", "my-3")}>
          <div className={ctx("payUser")}>
            <div className={ctx("borders")}></div>
            <div className={ctx("Address", "my-3")}>
              <div className={ctx("dfcenter mb-3", "sub__title")}>
                <div className={ctx("dfcenter")}>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <h6 className={ctx("mx-2", "Delivery")}>Delivery address</h6>
                </div>
                <div className={ctx("Follow")}>
                  <Button to={"/profile/history"}>
                    <h6>Follow products</h6>
                  </Button>
                </div>
              </div>
              <hr></hr>
              <div className={ctx("dfcenter", "sub")}>
                <h6>Name: </h6>
                <div className={ctx("nameUser")}>
                  {dataAddress === null ? (
                    <div>No name yet!!!</div>
                  ) : (
                    <div>
                      <span>{dataAddress.user_aliases}</span>
                      <span>{dataAddress.user_phone}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={ctx("dfcenter mt-2", "sub", "sub-420")}>
                <div className={ctx("dfcenter")}>
                  <h6>Address: </h6>
                  <div className={ctx("dfcenter", "AddressSub")}>
                    <div className={ctx("addressUser")}>
                      {dataAddress.user_address === null ? (
                        <div>No address yet!!!</div>
                      ) : (
                        <div>{dataAddress.user_address}</div>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  className={ctx("btnUpdate")}
                  onClick={() => setIsAddress(true)}
                >
                  <h6>Update</h6>
                </Button>
              </div>
            </div>
          </div>

          <div className={ctx("content", "mt-3")}>
            <div className={ctx("pay__menu", "dfcenter")}>
              <div className={ctx("Name", "dfcenter")}>Name products</div>
              <div className={ctx("Quantity")}>Quantity</div>
              <div className={ctx("Monney")}>Monney</div>
            </div>
            <hr></hr>
            {dataPayUser && dataPayUser.length !== 0 ? (
              dataPayUser.map((data, index) => {
                return (
                  <div key={index} className={ctx("pay__content", "dfcenter")}>
                    <div className={ctx("Name", "dfcenter")}>
                      <div className={ctx("img")}>
                        <img width="100%" src={data.avatar[0].url} alt="" />
                      </div>
                      <h6 className={ctx("nameProduct")}>{data.name}</h6>
                    </div>
                    <div className={ctx("Quantity")}>
                      <h6>{data.quantity}</h6>
                    </div>
                    <div className={ctx("Monney")}>
                      <h6 className={ctx("colorPrimary")}>$ {data.price}</h6>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={ctx("dfcenter my-3")}>No products</div>
            )}
          </div>

          <div className={ctx("pay__product", "mt-3")}>
            <div className={ctx("totalMonney", "dfcenter my-3")}>
              <div className={ctx("costs")}>
                <h6 className="dfcenter mb-2">
                  <span className={ctx("costName")}>Transportation costs:</span>
                  <span className={ctx("costPrice")}>$ {tuition}</span>
                </h6>
                <h6 className="dfcenter mb-2">
                  <span className={ctx("costName")}> Product costs:</span>
                  <span className={ctx("costPrice")}>$ {total}</span>
                </h6>
                <h6 className="dfcenter mb-2">
                  <span className={ctx("costName")}> Total:</span>
                  <span className={ctx("costPrice")}>
                    $ {total !== 0 ? total + tuition : 0}
                  </span>
                </h6>
              </div>
            </div>

            <div className={ctx("dfcenter ", "sub")}>
              <div className={ctx("checkbox")}>
                <label className={ctx("mx-2 fs-6")}>
                  Click to buy means you agree to abide by our "Terms"
                </label>
              </div>
              <div className={ctx("dfcenter")}>
                <Button
                  className={ctx("btnBuy")}
                  onClick={() => handlePay(total + tuition)}
                >
                  <h6>Pay</h6>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={ctx("payNull", "dfcenter")}>
          <div className={ctx("borders")}></div>
          <h5 className={ctx("message")}>
            You are not logged in to perform the payment function!!!
          </h5>
          <Button className={ctx("btn", "mt-4")} to={"/login"}>
            <h5>Login</h5>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Pay;

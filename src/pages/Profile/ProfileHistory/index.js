import className from "classnames/bind";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import style from "./ProfileHistory.module.scss";
import null_history from "../../../assets/Images/null_history.png";
import * as HistoryServervice from "../../../services/AddHistorysService";
import { useStateValue } from "../../../contexts/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ctx = className.bind(style);
function ProfileHistory() {
  const [{ user }, dispatch] = useStateValue();

  const [Data, setData] = useState([]);
  const [Status, setStatus] = useState("");

  useEffect(() => {
    if (user !== null) {
      if (user.constructor === Object) {
        const fetch = async () => {
          const dataHisto = await HistoryServervice.getHistory(
            user._id,
            Status
          );
          return setData(dataHisto.data);
        };
        fetch();
      } else {
        user
          .then((data) => {
            return HistoryServervice.getHistory(data._id, Status);
          })
          .then((data) => {
            return setData(data.data);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [user, Status]);

  return (
    <div className={ctx("wapper")}>
      <div className={ctx("Menu", "dfcenter")}>
        <Button
          className={ctx("BtnHistory", `${Status === "" ? "active" : ""}`)}
          onClick={() => setStatus("")}
        >
          <h6>All</h6>
        </Button>
        <Button
          className={ctx(
            "BtnHistory",
            `${Status === "Finish" ? "active" : ""}`
          )}
          onClick={() => setStatus("Finish")}
        >
          <h6>Finish</h6>
        </Button>
        <Button
          className={ctx(
            "BtnHistory",
            `${Status === "Unfinished" ? "active" : ""}`
          )}
          onClick={() => setStatus("Unfinished")}
        >
          <h6>Unfinished</h6>
        </Button>
      </div>
      <div className={ctx("Content", "mt-3")}>
        <div className={ctx("dataAll", "dfcenter")}>
          {Data.length === 0 ? (
            <div>
              <img src={null_history} alt="" />
              <h5 className={ctx("mt-4 opcity-07")}>No orders yet!!!</h5>
            </div>
          ) : (
            <div>
              {Data.map((data, index) => {
                return (
                  <div key={index} className={ctx("products", "my-3")}>
                    <div className={ctx("product")}>
                      {data.history.map((product, index) => (
                        <div
                          key={index}
                          className={ctx("dfcenter my-2", "sub")}
                        >
                          <div className={ctx("img", "dfcenter p-1")}>
                            <img
                              width="100%"
                              src={product.avatar[0].url}
                              alt=""
                            />
                          </div>

                          <div className={ctx("dfcenter", "info")}>
                            <div className={ctx("name", "pb-4")}>
                              <h6>{product.name}</h6>
                            </div>
                            <div className={ctx("dfcenter", "sub__pri")}>
                              <div className={ctx("quantity", "opcity-08")}>
                                <h6>x {product.quantity}</h6>
                              </div>
                              <div className={ctx("price")}>
                                <h6>$ {product.price}</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr></hr>
                    <div className={ctx("dfcenter my-3", "sub__Status")}>
                      <div className={ctx("dfcenter", "total__monney")}>
                        <h6>Total monney: </h6>{" "}
                        <span className={ctx("mx-2")}>${data.totalMoney}</span>
                      </div>
                      <div>
                        {data.status === "Finish" ? (
                          <div className={ctx("dfcenter opcity-07", "finish")}>
                            <div className={ctx("mx-2")}>
                              <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <h6>{data.status}</h6>
                          </div>
                        ) : (
                          <Button className={ctx("btnStatus")}>
                            <h6>{data.status}</h6>
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className={ctx("my-3 opcity-06")}>{data.messs}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHistory;

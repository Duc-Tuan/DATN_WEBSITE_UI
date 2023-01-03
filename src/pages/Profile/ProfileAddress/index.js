import className from "classnames/bind";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import UpdateAdrress from "../../../components/UpdateAdrress";
import { useStateValue } from "../../../contexts/StateProvider";
import style from "./ProfileAddress.module.scss";

const ctx = className.bind(style);

function ProfileAddress() {
  const [{ user }, dispatch] = useStateValue();
  const [DataAdrress, setDataAdrress] = useState("");
  const [Data, setData] = useState([]);
  const [isAddress, setIsAddress] = useState(false);

  useEffect(() => {
    if (user !== null) {
      if (user.constructor === Object) {
        setData(user);
        return setDataAdrress(user.user_address);
      } else {
        user.then((data) => {
          setData(data);
          return setDataAdrress(data.user_address);
        });
      }
    }
  }, [user]);

  return (
    <div className={ctx("wapper")}>
      {isAddress && <UpdateAdrress onClick={() => setIsAddress(false)} />}
      <div className={ctx("title")}>
        <h5>My address</h5>
      </div>
      <hr></hr>

      <div className={ctx("info")}>
        <h6 className={ctx("title")}>Address</h6>
        <div className={ctx("dfcenter mt-3", "sub__title")}>
          <div className={ctx("group", "mb-3")}>
            <div className={ctx("infoUser", "dfcenter")}>
              <span className={ctx("name")}>{Data.user_aliases}</span>{" "}
              <span className={ctx("phone", "opcity-08")}>
                {Data.user_phone !== null ? (
                  Data.user_phone
                ) : (
                  <h6>Please update your phone number!!!</h6>
                )}
              </span>
            </div>
            <div className={ctx("content", "mx-2 opcity-08 mt-2")}>
              {DataAdrress !== null ? (
                `${DataAdrress}`
              ) : (
                <h6>Please update your address!!!</h6>
              )}
            </div>
          </div>

          <div className={ctx("update")}>
            <Button
              className={ctx("btnUpdate")}
              onClick={() => setIsAddress(true)}
            >
              <h6>Update</h6>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAddress;

// import * as UserService from "../../services/LoginService";
import MessProduct from "../MessProduct";
import { useStateValue } from "../../contexts/StateProvider";
import classNames from "classnames/bind";
import style from "./UpdateAdrress.module.scss";
import { useEffect, useState } from "react";
import Button from "../Button";

import { setUpdateUSer } from "../../contexts/Reducer";

const ctx = classNames.bind(style);

function UpdateAdrress({ onClick }) {
  const [{ user }, dispatch] = useStateValue();

  const [dataAddress, setDataAddress] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isMess, setIsMess] = useState(false);
  const [mess, setMess] = useState("");

  const [isMessager, setIsMessager] = useState(false);
  const [Messager, setMessager] = useState("");

  useEffect(() => {
    if (user !== null && user !== undefined) {
      if (user.constructor !== Object) {
        user.then((data) => {
          setName(data.user_aliases);
          setPhone(data.user_phone);
          setAddress(data.user_address);
          return setDataAddress(data);
        });
      } else {
        setName(user.user_aliases);
        setPhone(user.user_phone);
        setAddress(user.user_address);
        setDataAddress(user);
      }
    }
  }, [user]);

  const handleUpdateAddr = (dataUser) => {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    setIsMessager(true);
    if (regex.test(phone)) {
      const a = {
        user_aliases: name,
        user_address: address,
        user_phone: phone,
      };
      dispatch(setUpdateUSer(dataUser._id, a));
      setMessager("Successfully Update!!!");
      return setTimeout(() => {
        setIsMessager(false);
        onClick();
      }, 1000);
    } else {
      // setMess("phone number contains only numbers!!");
      setMessager("phone number contains only numbers!!");
      return setTimeout(() => {
        setIsMess(false);
        setIsMessager(false);
      }, 1000);
    }
  };
  return (
    <div className={ctx("wapper")}>
      {isMessager && <MessProduct data={Messager} />}
      <div className={ctx("UpdateAddress")}>
        <div className={ctx("dfcenter", "sub")}>
          <div className={ctx("dataAddress")}>
            <h5>Cập nhật địa chỉ</h5>
            <hr></hr>
            <div className={ctx("content")}>
              <div className={ctx("row")}>
                <div
                  className={ctx("group", "col-xl-6 col-lg-6 col-md-6 col-12")}
                >
                  <label htmlFor="name">Name</label>
                  <br />
                  <input
                    className={ctx("my-2 mt-1")}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div
                  className={ctx("group", "col-xl-6 col-lg-6 col-md-6 col-12")}
                >
                  <label htmlFor="phone">Phone</label>
                  <br />
                  <input
                    className={ctx("my-2 mt-1", `${isMess ? "error" : ""}`)}
                    type="text"
                    id="phone"
                    value={phone === null ? "" : `${phone}`}
                    placeholder="Enter phone number ..."
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  {isMess && <div className={ctx("mess")}>{mess}</div>}
                </div>
              </div>

              <div className={ctx("group")}>
                <label htmlFor="Address">Address</label>
                <br />
                <input
                  className={ctx("my-2 mt-1")}
                  type="text"
                  name="Address"
                  id="Address"
                  value={address === null ? "" : address}
                  placeholder="Enter address you..."
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className={ctx("btn", "dfcenter mt-3")}>
              <Button onClick={onClick}>
                <h6>Return</h6>
              </Button>
              <Button onClick={() => handleUpdateAddr(dataAddress)}>
                <h6>Update</h6>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAdrress;

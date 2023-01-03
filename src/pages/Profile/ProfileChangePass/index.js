import className from "classnames/bind";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import MessProduct from "../../../components/MessProduct";
import { setUpdateUSer } from "../../../contexts/Reducer";
import { useStateValue } from "../../../contexts/StateProvider";
import style from "./ProfileChangePass.module.scss";

const ctx = className.bind(style);

function ProfileChangePass() {
  const [{ user }, dispatch] = useStateValue();
  const [dataUser, setDataUser] = useState([]);

  const [isMessager, setIsMessager] = useState(false);
  const [Messager, setMessager] = useState("");

  const [PasswordOld, setPasswordOld] = useState("");
  const [PasswordANew, setPasswordANew] = useState("");
  const [PasswordRet, setPasswordRet] = useState("");

  const [Input, setInput] = useState("password");

  const [IsMessPassOld, setIsMessPassOld] = useState(false);
  const [IsMessPassRet, setIsMessPassRet] = useState(false);

  useEffect(() => {
    if (user !== null) {
      if (user.constructor === Object) {
        return setDataUser(user);
      } else {
        user.then((data) => {
          return setDataUser(data);
        });
      }
    }
  }, [user]);

  const handleChangPass = () => {
    if (PasswordOld !== "" && PasswordANew !== "" && PasswordRet !== "") {
      var regex = /^[A-Za-z0-9]+$/;
      if (regex.test(PasswordANew) && regex.test(PasswordRet)) {
        if (PasswordOld === dataUser.user_password) {
          if (PasswordANew === PasswordRet) {
            setPasswordOld("");
            setPasswordANew("");
            setPasswordRet("");
            const data = {
              user_password: PasswordRet,
            };
            setIsMessager(true);
            setMessager("Successfully Update!!!");
            dispatch(setUpdateUSer(dataUser._id, data));
          } else {
            setIsMessPassRet(true);
            return setTimeout(() => {
              setIsMessPassRet(false);
            }, 1500);
          }
        } else {
          setIsMessPassOld(true);
          return setTimeout(() => {
            setIsMessPassOld(false);
          }, 1500);
        }
      } else {
        setIsMessager(true);
        setMessager("Password does not contain spaces and punctuation!!!");
      }
    } else {
      setIsMessager(true);
      setMessager("Do not leave any fields blank!!!");
    }
    return setTimeout(() => {
      setIsMessager(false);
    }, 1000);
  };

  const handleShowPass = (e) => {
    const check = e.target.checked;
    check ? setInput("text") : setInput("password");
  };
  return (
    <div className={ctx("wapper")}>
      {isMessager && <MessProduct data={Messager} />}
      <div className={ctx("title")}>
        <h5>Change Password</h5>
        <div className={ctx("opcity-09 mt-2")}>
          <h6>For account security, please do not share your password with others.</h6>
        </div>
      </div>
      <hr></hr>

      <div className={ctx("dfcenter", "sub")}>
        <div className={ctx("info", "mx-3")}>
          <div className={ctx("group", "dfcenter mb-3")}>
            <div className={ctx("name")}><h6>User Name: </h6></div>
            <div className={ctx("content", "mx-2")}>
              <h5>{dataUser?.user_name}</h5>
            </div>
          </div>
          <div className={ctx("group", "dfcenter mb-3")}>
            <div className={ctx("name")}><h6>Old password: </h6></div>
            <div className={ctx("content", "mx-2")}>
              <input
                className={ctx(`${IsMessPassOld && "active"}`)}
                type={Input}
                placeholder="******"
                value={PasswordOld}
                onChange={(e) => setPasswordOld(e.target.value)}
              />
              <div className={ctx("error")}>
                {IsMessPassOld && (
                  <span>
                    The old password is incorrect. Please check again!!!
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={ctx("group", "dfcenter mb-3")}>
            <div className={ctx("name")}><h6>A new password: </h6></div>
            <div className={ctx("content", "mx-2")}>
              <input
                type={Input}
                value={PasswordANew}
                placeholder="******"
                onChange={(e) => setPasswordANew(e.target.value)}
              />
            </div>
          </div>
          <div className={ctx("group", "dfcenter mb-3")}>
            <div className={ctx("name")}><h6>Retype password: </h6></div>
            <div className={ctx("content", "mx-2")}>
              <input
                className={ctx(`${IsMessPassRet && "active"}`)}
                type={Input}
                value={PasswordRet}
                placeholder="******"
                onChange={(e) => setPasswordRet(e.target.value)}
              />
              <div className={ctx("error")}>
                {IsMessPassRet && (
                  <span>
                    The re-entered password does not match the new password.
                    Please check again!!!
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={ctx("group", "dfcenter mb-3")}>
            <div className={ctx("name")}></div>
            <div className={ctx("dfcenter mx-2", "content", "sub__showPass")}>
              <input
                type="checkbox"
                id="checkbox"
                onChange={(e) => handleShowPass(e)}
              />
              <label htmlFor="checkbox" className={ctx("mx-2")}>
                <h6>Show password.</h6>
              </label>
            </div>
          </div>

          <div className={ctx("save")}>
            <Button className={ctx("btnSave")} onClick={handleChangPass}>
              <h5>Save</h5>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileChangePass;

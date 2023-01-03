import className from "classnames/bind";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import style from "./ResetPass.module.scss";
import * as ResetPassService from "../../services/ResetPassService";
import bgLogin from "../../assets/Images/bg_logina.png";
import { useStateValue } from "../../contexts/StateProvider";
import { setCode } from "../../contexts/Reducer";
import MessProduct from "../../components/MessProduct";
import { useNavigate } from "react-router-dom";

const ctx = className.bind(style);

function ResetPass() {
  const navigate = useNavigate()
  const [{ user }, dispatch] = useStateValue();
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Messager, setMessager] = useState("");
  const [isMessager, setIsMessager] = useState(false);

  const handleSubmit = async () => {
    setIsMessager(true)
    if (UserName !== "" && Email !== "") {
      const code = Math.round(Math.random() * 1000000);
      const codeResult =
        code.toString().slice(0, 1) +
        Math.random().toString(36).substring(2, 7) +
        code.toString().slice(1, 3) +
        Math.random().toString(36).substring(2, 5) +
        code.toString().slice(3, 5) +
        Math.random().toString(36).substring(2, 6) +
        code.toString().slice(5);
      const dataSubmit = {
        UserName,
        Email,
        code,
      };
      const result = await ResetPassService.UserRegister(dataSubmit);
      localStorage.setItem("code", JSON.stringify(codeResult));
      dispatch(setCode(code));
      if (result.data === 1) {
        setMessager("Successfully. We have sent a password reset notice to your email. Please check back in email!!!");
        console.log("oke");
        return setTimeout(() => {
          setIsMessager(false)
          navigate("/")
        }, 1500)
      } else {
        setMessager("Your email does not match your account's email. Please check again!!!");
        return setTimeout(() => {
          setIsMessager(false)
        }, 1500)
      }
    } else {
      setMessager("Please enter full information!!!");
      return setTimeout(() => {
        setIsMessager(false)
      }, 1000)
    }
  };

  return (
    <div className={ctx("wapper")}>
      {isMessager && <MessProduct data={Messager} />}
      <img width="100%" src={bgLogin} alt="" />
      <div className={ctx("form", "container")}>
        <h4 className={ctx("my-2")}>Info User</h4>
        <div className={ctx("group")}>
          <label htmlFor="UserName">UserName: </label>
          <br />
          <input
            className={ctx("mt-2")}
            type="text"
            id="UserName"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name..."
          />
        </div>
        <div className={ctx("group", "mt-4")}>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            className={ctx("mt-2")}
            type="text"
            id="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
          />
        </div>
        <button className={ctx("btn", "mt-4")} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ResetPass;

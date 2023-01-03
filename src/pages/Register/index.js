import className from "classnames/bind";
import { useState } from "react";
import style from "./Register.module.scss";
import * as Register from "../../services/Register";
import { useNavigate } from "react-router-dom";
import bgLogin from "../../assets/Images/bg_logina.png";
import Button from "../../components/Button";

const ctx = className.bind(style);

function Login() {
  const natagate = useNavigate();

  const [messRegister, setMessRegister] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [notification, setnotification] = useState();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [aliases, setAliases] = useState("");

  const [messager, setMessager] = useState("");
  const [messaName, setMessName] = useState(false);

  const [messaEmail, setMessEmail] = useState(false);
  const [messaE, setMessE] = useState("");

  const [messaPas, setMessPas] = useState("");
  const [messaPass, setMessPass] = useState(false);

  const [messaAliases, setMessAliases] = useState("");
  const [messaA, setMessA] = useState(false);

  const handleRegexUseName = (data) => {
    var regex = /^[A-Za-z0-9]+$/;
    if (regex.test(data)) {
      return true;
    } else {
      setMessName(true);
      setMessager("Do not use spaces or accented characters!!!");
      return setTimeout(() => {
        setMessName(false);
      }, 1000);
    }
  };

  const handleRegexPass = (data) => {
    var regex = /^[A-Za-z0-9]+$/;
    if (regex.test(data)) {
      return true;
    } else {
      setMessPass(true);
      setMessPas("Do not password spaces or accented characters!!!");
      return setTimeout(() => {
        setMessPass(false);
      }, 1000);
    }
  };

  const handleRegexEmail = (data) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(data)) {
      return true;
    } else {
      setMessEmail(true);
      setMessE("Email entered wrong format!!!");
      return setTimeout(() => {
        setMessEmail(false);
      }, 1000);
    }
  };

  const handleRegexAliases = (data) => {
    if (data !== "") {
      return true;
    } else {
      setMessA(true);
      setMessAliases("cannot be left blank!!!");
      return setTimeout(() => {
        setMessA(false);
      }, 1000);
    }
  };

  const dataSubmit = {
    user_aliases: aliases,
    user_password: passWord,
    user_email: email,
    user_name: userName,
  };

  const handleSubmit = async () => {
    if (
      handleRegexEmail(email) === true &&
      handleRegexAliases(aliases) === true &&
      handleRegexUseName(userName) === true &&
      handleRegexPass(passWord) === true
    ) {
      const data = await Register.UserRegister(dataSubmit);
      setIsRegister(true);
      if (data.suss) {
        setUserName("");
        setEmail("");
        setPassWord("");
        setAliases("");
        setMessRegister(data.suss);
        setnotification("suss");
        setTimeout(() => {
          natagate("/login");
        }, 1600);
      } else {
        setMessRegister(data.error);
        setnotification("error");
      }
      return setTimeout(() => {
        setIsRegister(false);
      }, 1500);
    }
  };

  return (
    <div className={ctx("wapper")}>
      <img width="100%" src={bgLogin} alt="" />
      <div className={ctx("container", "form")}>
        <h4 className={ctx("my-2")}>Register</h4>
        <div className={ctx("group")}>
          <label htmlFor="email">email: </label>
          <br />
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
            className={ctx("mt-1", `${messaEmail ? "error" : ""}`)}
          />
          <div className={ctx("mess", "mt-2")}>
            {messaEmail && <div className={ctx("errorMess")}>{messaE}</div>}
          </div>
        </div>
        <div className={ctx("group")}>
          <label htmlFor="aliases">aliases: </label>
          <br />
          <input
            type="text"
            id="aliases"
            value={aliases}
            onChange={(e) => setAliases(e.target.value)}
            placeholder="Enter aliases..."
            className={ctx("mt-1", `${messaA ? "error" : ""}`)}
          />
          <div className={ctx("mess", "mt-2")}>
            {messaA && <div className={ctx("errorMess")}>{messaAliases}</div>}
          </div>
        </div>
        <div className={ctx("group")}>
          <label htmlFor="UserName">UserName: </label>
          <br />
          <input
            type="text"
            id="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name..."
            className={ctx("mt-1", `${messaName ? "error" : ""}`)}
          />
          <div className={ctx("mess", "mt-2")}>
            {messaName && <div className={ctx("errorMess")}>{messager}</div>}
          </div>
        </div>
        <div className={ctx("group")}>
          <label htmlFor="PassWord">PassWord: </label>
          <br />
          <input
            type="passWord"
            id="PassWord"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            placeholder="Enter password..."
            className={ctx("mt-1", `${messaPass ? "error" : ""}`)}
          />
          <div className={ctx("mess", "mt-2")}>
            {messaPass && <div className={ctx("errorMess")}>{messaPas}</div>}
          </div>
        </div>
        <button className={ctx("btn")} onClick={handleSubmit}>
          Submit
        </button>
        <div className={ctx("messError", "my-1")}>
          {isRegister && (
            <div className={ctx(`${notification}`)}>{messRegister}</div>
          )}
        </div>

        <div className={ctx("login", "mt-1 dfcenter")}>
          <h6>Do you already have an account?</h6>
          <Button className={ctx("btnLogin")} to={"/login"}>
            <h6>Login</h6>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;

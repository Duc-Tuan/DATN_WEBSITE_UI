import className from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
import { useStateValue } from "../../contexts/StateProvider";
import * as UserService from "../../services/LoginService";
import * as CartService from "../../services/CartService";
import { setUser } from "../../contexts/Reducer";
import bgLogin from "../../assets/Images/bg_logina.png";
import Button from "../../components/Button"

const ctx = className.bind(style);

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [Messager, setMessager] = useState("");
  const [isMessager, setIsMessager] = useState(false);

  const [{ user }, dispatch] = useStateValue();

  const dataSubmit = {
    name: userName,
    password: passWord,
  };

  const handleSubmit = () => {
    setIsMessager(true);
    if (userName === "" && passWord === "") {
      setMessager("Username or password is empty. Enter!!!");
      return setTimeout(() => {
        setIsMessager(false);
      }, 1500);
    } else {
      const fetchUser = async () => {
        const token = await UserService.UserPost(
          dataSubmit.name,
          dataSubmit.password
        );
        return token;
      };
      fetchUser()
        .then(async (token) => {
          await localStorage.setItem("token", token);
          const dataUser = await UserService.UserGet(token);
          dispatch(setUser(dataUser));
          return dataUser;
        })
        .then(async (data) => {
          if (data !== null) {
            const cart = await CartService.Carts(data._id);
            localStorage.setItem("carts", JSON.stringify(cart.carst));
            return navigate("/");
          } else {
            setMessager(
              "Incorrect account or password information. Please re-enter!!!"
            );
            return setTimeout(() => {
              localStorage.clear();
              setIsMessager(false);
            }, 1500);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className={ctx("wapper")}>
      <img width="100%" src={bgLogin} alt="" />
      <div className={ctx("form", "container")}>
        <h4 className={ctx("my-2")}>Login</h4>
        <div className={ctx("group")}>
          <label htmlFor="UserName">UserName: </label>
          <br />
          <input
            className={ctx("mt-2")}
            type="text"
            id="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name..."
          />
        </div>
        <div className={ctx("group", "mt-4")}>
          <label htmlFor="PassWord">PassWord: </label>
          <br />
          <input
            className={ctx("mt-2")}
            type="passWord"
            id="PassWord"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            placeholder="Enter password..."
          />
        </div>
        <button className={ctx("btn", "mt-4")} onClick={handleSubmit}>
          Submit
        </button>
        <div className={ctx("messError", "my-2")}>
          {isMessager && <div className={ctx("error")}>{Messager}</div>}
        </div>
        <div className={ctx("register", "mt-2 dfcenter")}>
          <h6>you are new to our site?</h6>
          <Button className={ctx("btnRegister")} to={'/register'}><h6>Register</h6></Button>
        </div>
        <div className={ctx("Forgot", "dfcenter")}>
          <Button className={ctx("btnForgot")} to={'/resetPassword'}><h6>Forgot Password?</h6></Button>
        </div>
      </div>
    </div>
  );
}

export default Login;

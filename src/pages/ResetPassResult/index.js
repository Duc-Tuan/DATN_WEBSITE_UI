import className from "classnames/bind";
import { useNavigate } from "react-router-dom";
import style from "./ResetPass.module.scss";
import bgLogin from "../../assets/Images/bg_logina.png";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useStateValue } from "../../contexts/StateProvider";
import { setUpdateUSer } from "../../contexts/Reducer";
import MessProduct from "../../components/MessProduct";

const ctx = className.bind(style);

function ResetPassResult() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const { userID } = useParams();
  const [Password, setPassword] = useState("");
  const [PasswordRet, setPasswordRet] = useState("");

  const [TypeInput, setTypeInput] = useState("password");

  const [Messager, setMessager] = useState("");
  const [isMessager, setIsMessager] = useState(false);

  const handleSubmit = async () => {
    setIsMessager(true);
    if (Password !== "" && PasswordRet !== "") {
      var regex = /^[A-Za-z0-9]+$/;
      if (regex.test(Password) && regex.test(PasswordRet)) {
        const a = {
          user_password: PasswordRet,
        };
        dispatch(setUpdateUSer(userID, a));
        localStorage.removeItem("code");
        localStorage.removeItem("codeXM");
        setMessager("Successfully update password.");
        return setTimeout(() => {
          setIsMessager(false);
          navigate("/login");
        }, 1000);
      } else {
        setMessager("Do not password spaces or accented characters!!!");
      }
    } else {
      setMessager("Full information required!!!");
    }
    return setTimeout(() => {
      setIsMessager(false);
    }, 1000);
  };

  const handleShowPass = (e) => {
    if (e.target.checked) {
      setTypeInput("type")
    } else {
      setTypeInput("password")
    }
  }

  return (
    <div className={ctx("wapper")}>
      {isMessager && <MessProduct data={Messager} />}
      <img width="100%" src={bgLogin} alt="" />
      <div className={ctx("form", "container")}>
        <h4 className={ctx("my-2")}>Reset password</h4>
        <div className={ctx("group")}>
          <label htmlFor="password">PassWord New: </label>
          <br />
          <input
            className={ctx("mt-2")}
            type={TypeInput}
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
        <div className={ctx("group", "mt-4")}>
          <label htmlFor="passwordRet">Re-enter password: </label>
          <br />
          <input
            className={ctx("mt-2")}
            type={TypeInput}
            id="passwordRet"
            value={PasswordRet}
            onChange={(e) => setPasswordRet(e.target.value)}
            placeholder="********"
          />
        </div>
        <div className={ctx("group", "mt-4")}>
          <input
            type="checkbox"
            id= "checkbox"
            onChange={(e) => handleShowPass(e)}
          />
          <label htmlFor="checkbox" className={ctx("mx-2")}>Show password.</label>
        </div>
        <button className={ctx("btn", "mt-4")} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ResetPassResult;

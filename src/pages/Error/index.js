import className from "classnames/bind";
import style from "./Error.module.scss";
import Button from "../../components/Button";
import ImageError from "../../assets/Images/404 Error with a cute animal-pana.png";

const ctx = className.bind(style);

function Error() {
  return (
    <div className={ctx("wapper", "dfcenter")}>
      <div className={"fileError"}>
        <div className={ctx("img", "dfcenter my-3")}>
          <img width="34%" src={ImageError} alt="" />
        </div>

        <div className={ctx("dfcenter")}>
          <Button className={ctx("btn")} to={"/"}>Home</Button>
        </div>
      </div>
    </div>
  );
}

export default Error;

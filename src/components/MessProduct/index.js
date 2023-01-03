import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import style from "./MessProduct.module.scss";

const ctx = classNames.bind(style);

function MessProduct({ onClick, data }) {
  return (
    <>
      <div
        className={ctx(
          "mess",
          "dfcenter",
          `${data.search("Successfully") !== -1 ? "suss" : ""}`
        )}
      >
        <div className={ctx("notification")}>
          <span>
            {data.search("Successfully") !== -1 ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faXmark} />
            )}
          </span>
          {data}
        </div>
      </div>
    </>
  );
}

export default MessProduct;

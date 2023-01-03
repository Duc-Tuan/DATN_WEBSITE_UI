import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "../Button";
import style from "./Product.module.scss";

const ctx = className.bind(style);

function Product({ data, onClick }) {
  return (
    <div className={ctx("wapper")}>
      <div className={ctx("product")}>
        <Link to={`/products/${data._id}`} className={ctx("dfcenter", "sub")}>
          <div className={ctx("dfcenter", "img")}>
            <img width="100px" src={`${data.product_img[0].url}`} alt="" />
          </div>
          <div className={ctx("info")}>
            <h6 className={ctx("name")}>{data.product_name}</h6>
          </div>
        </Link>
        {data.product_percent !== 0 && (
          <div className={ctx("percent")}>
            <span>Percent: </span>
            {data.product_percent} %
          </div>
        )}
        <div className={ctx("dfcenter", "addCart__price")}>
          <div className={ctx("price")}>
            <span>$ </span>
            {data.product_percent !== 0
              ? data.product_monney -
                data.product_monney * (data.product_percent / 100)
              : data.product_monney}
          </div>
          <Button
            onClick={() => {
              const price =
                data.product_percent !== 0
                  ? data.product_monney -
                    data.product_monney * (data.product_percent / 100)
                  : data.product_monney;
              return onClick(data, price);
            }}
            className={ctx("icon")}
          >
            <h6>
              <FontAwesomeIcon icon={faCartArrowDown} />
            </h6>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Product;

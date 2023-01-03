import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Carts.module.scss";

const ctx = classNames.bind(style);

function ProductCarts({ data }) {
  return (
    <Link to={`/products/${data._id}`} className={ctx("wrapper", "dfcenter")}>
      <div className={ctx("avatar")}>
        <img
          width="100%"
          src={`${data.avatar[0].url}`}
          alt={data.product_name}
        />
      </div>
      <div className={ctx("info", "dfcenter")}>
        <div className={ctx("name")}>{data.name}</div>
        <div className={ctx("qty")}>sl: {data.quantity}</div>
        <div className={ctx("monney")}>
          <span>$ {data.price}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCarts;

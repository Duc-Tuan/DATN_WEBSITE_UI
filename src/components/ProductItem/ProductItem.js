import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Product.module.scss";

const ctx = classNames.bind(style);

function ProductItem({data, onClick}) {
  return (
    <Link to={`/products/${data._id}`} className={ctx("wrapper")} onClick={onClick}>
      <img className={ctx("avatar")} src={`${data.product_img[0].url}`} alt={data.product_name} />
      <div className={ctx("info")}>
        <h6 className={ctx("name")}>
          <span>{data.product_name}</span>
        </h6>
      </div>
    </Link>
  );
}

export default ProductItem;

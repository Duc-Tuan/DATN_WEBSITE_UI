import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as CategoryProduct from "../../services/ProductCategoryService";

import className from "classnames/bind";
import style from "./ProductCategory.module.scss";
import MessProduct from "../../components/MessProduct";
import Product from "../../components/Product/Product";
import { useStateValue } from "../../contexts/StateProvider";
import { setCart } from "../../contexts/Reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const ctx = className.bind(style);

function ProductCategory() {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [TotalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [{ user }, dispatch] = useStateValue();
  const [isMessager, setIsMessager] = useState(false);
  const [Messager, setMessager] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const result = await CategoryProduct.getProductCategory(name, page, 20);
      setData(result.data);
      const totaPage = [];
      for (var i = 1; i <= result.totalPages; i++) {
        totaPage.push(i);
      }
      setTotalPage(totaPage);
      setCurrentPage(result.currentpage);
    };

    fetch();
  }, [name, page]);

  const handleAddCart = (data, price) => {
    if (user !== null) {
      const dataCarts = {
        id: data._id,
        name: data.product_name,
        avatar: data.product_img,
        quantity: 1,
        percent: data.product_percent,
        monney: data.product_monney,
        price: price,
      };
      dispatch(setCart(dataCarts));
      setIsMessager(true);
      setMessager("Successfully add to cart!");
    } else {
      setIsMessager(true);
      setMessager("Error you are not logged in!!!");
    }
    return setTimeout(() => {
      setIsMessager(false);
    }, 1000);
  };

  return (
    <div className={ctx("wapper", "container my-3")}>
      {isMessager && <MessProduct data={Messager} />}
      <div className={ctx("dfcenter my-3", "link")}>
        <Link className={ctx("dfcenter")} to={"/"}>
          <span>
            <FontAwesomeIcon icon={faHome} />
          </span>
          <h6 className={ctx("mlr-6")}>Home</h6>
        </Link>
        <span>/</span>
        <Link className={ctx("mlr-6")} to={`/products`}>
          <h6>Products</h6>
        </Link>
        <span>/</span>
        <Link className={ctx("mlr-6")} to={`/products/category/${name}`}>
          <h6>{name}</h6>
        </Link>
      </div>
      <h5 className={ctx("my-3", "category")}>
        <span className={ctx("nameCategory")}>{name}</span>
      </h5>
      {data.length !== 0 ? (
        <div className={ctx("row")}>
          {data.map((product) => {
            return (
              <div
                key={product._id}
                className={ctx("col-xl-3 col-lg-4 col-md-6 col-sm-4 col-6")}
              >
                <Product data={product} onClick={handleAddCart} />
              </div>
            );
          })}
          <div className={ctx("paginations", "my-4")}>
            <ul className={ctx("dfcenter", "pagination")}>
              {currentPage > 1 && (
                <li
                  className={ctx("prev")}
                  onClick={() => {
                    page === 1 ? setPage(1) : setPage(page - 1);
                  }}
                >
                  prev
                </li>
              )}
              {TotalPage.map((data, index) => {
                return (
                  <li
                    key={index}
                    className={ctx(`${currentPage === data ? "active" : ""}`)}
                    onClick={() => setPage(data)}
                  >
                    {data}
                  </li>
                );
              })}
              {currentPage < TotalPage.length && (
                <li className={ctx("next")} onClick={() => setPage(page + 1)}>
                  next
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className={ctx("dfcenter", "categoryNull")}>
          <h5 className={ctx("content")}>
            There are currently no products. Invite admin to add products!!!
          </h5>
        </div>
      )}
    </div>
  );
}

export default ProductCategory;

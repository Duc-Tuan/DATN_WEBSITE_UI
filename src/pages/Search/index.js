import { useStateValue } from "../../contexts/StateProvider";
import className from "classnames/bind";
import style from "./Search.module.scss";
import { useEffect, useState } from "react";
import MessProduct from "../../components/MessProduct";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Product from "../../components/Product/Product";
import { setCart } from "../../contexts/Reducer";
import * as searchService from "../../services/searchService";

const ctx = className.bind(style);

function Search() {
  const [{ user, dataS }, dispatch] = useStateValue();
  const [data, setData] = useState([]);

  const [totalPagin, setTotalPagin] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [page, setPage] = useState(1);
  const [isMessager, setIsMessager] = useState(false);
  const [Messager, setMessager] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const datasSearch = await searchService.search(dataS, "less", page, 20);
      setData(datasSearch.data);
      const totaPage = [];
      for (var i = 1; i <= datasSearch.totalPages; i++) {
        totaPage.push(i);
      }
      setTotalPagin(totaPage);
      setCurrentPage(datasSearch.currentpage);
    };

    fetch();
  }, [page, dataS]);

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
    }, 1500);
  };

  return (
    <div className={ctx("wapper", "container")}>
      {isMessager && <MessProduct data={Messager} />}
      <div className={ctx("dfcenter my-3", "link")}>
        <Link className={ctx("dfcenter")} to={"/"}>
          <span>
            <FontAwesomeIcon icon={faHome} />
          </span>
          <h6 className={ctx("mlr-6")}>Home</h6>
        </Link>
        <span>/</span>
        <Link className={ctx("mlr-6")} to={`/search`}>
          <h6>Search</h6>
        </Link>
      </div>
      <h5 className={ctx("my-3", "product")}>
        Result search:{" "}
        <span className={ctx("nameCategory", "mx-2")}>{dataS}</span>
      </h5>
      {data.length !== 0 ? (
        <>
          <div className={ctx("row")}>
            {data.map((product) => {
              return (
                <div
                  key={product._id}
                  className={ctx("col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6")}
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
                {totalPagin.map((data, index) => {
                  return (
                    <li
                      key={index}
                      className={ctx(`${currentPage === data.toString() ? "active" : ""}`)}
                      onClick={() => setPage(data)}
                    >
                      {data}
                    </li>
                  );
                })}
                {currentPage < totalPagin.length && (
                  <li className={ctx("next")} onClick={() => setPage(page + 1)}>
                    next
                  </li>
                )}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className={ctx("productNull", "dfcenter")}>
          <h5>
          No products found with the name: {dataS}
          </h5>
        </div>
      )}
    </div>
  );
}

export default Search;

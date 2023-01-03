import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as productService from "../../services/ProductsService";
import className from "classnames/bind";
import style from "./DetailProduct.module.scss";
import SliderProduct from "../../components/SliderImages";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faHome,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../../contexts/StateProvider";
import { setCart } from "../../contexts/Reducer";
import MessProduct from "../../components/MessProduct";
import * as CategoryProduct from "../../services/ProductCategoryService";
import * as CommentService from "../../services/CommentService";
import Product from "../../components/Product/Product";
import CommentUSer from "../../components/CommentUSer";

const ctx = className.bind(style);

function DetailProduct() {
  const [dataProduct, setDataProduct] = useState();
  const [qty, setQty] = useState(1);
  const [PriceNew, setPriceNew] = useState();
  const { ProductID } = useParams();
  const [isMessager, setIsMessager] = useState(false);
  const [Messager, setMessager] = useState("");
  const [isDetail, setIsDetail] = useState(true);
  const [isComment, setIsComment] = useState(false);

  const [dataCategory, setDataCategory] = useState([]);
  const [comment, setComment] = useState([]);
  const [dataComment, setDataComment] = useState("");

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const fetch = async () => {
      return await productService.productsID(ProductID);
    };

    fetch()
      .then((data) => {
        setDataProduct(...data);
        var CategoryProduct;
        data.map(async (a) => (CategoryProduct = a.product_category));
        return CategoryProduct;
      })
      .then((data) => {
        return CategoryProduct.getProductCategory(data, 1, 10);
      })
      .then((data) => setDataCategory(data.data))
      .catch((error) => console.log(error));
  }, [ProductID]);

  useMemo(() => {
    if (dataProduct && dataProduct.product_monney !== 0) {
      const price =
        dataProduct.product_monney * (dataProduct.product_percent / 100);
      setPriceNew(dataProduct.product_monney - price);
      const dtComments = [...dataProduct.product_comments.comment_content];
      setComment(dtComments.reverse());
      window.scrollTo(0, 0);
    }
  }, [dataProduct]);

  const handleAddProduct = () => {
    if (user !== null) {
      const price = dataProduct.product_percent / 100;
      const resultPrice =
        (dataProduct.product_monney - price * dataProduct.product_monney) * qty;
      const result = Math.round(resultPrice * 100) / 100;
      const dataCarts = {
        id: dataProduct._id,
        name: dataProduct.product_name,
        avatar: dataProduct.product_img,
        quantity: qty,
        price: result,
        percent: dataProduct.product_percent,
        monney: dataProduct.product_monney,
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
  const handleQtyRemove = () => {
    if (qty === 1) {
      setQty(1);
    } else {
      setQty(qty - 1);
    }
  };
  const handleQtyAdd = () => {
    setQty(qty + 1);
  };

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

  const handleComment = () => {
    if (user !== null) {
      if (dataComment !== "") {
        if (user.constructor === Object) {
        } else {
          user
            .then(async (dt) => {
              const datas = await CommentService.postCommentprod(
                dataProduct._id,
                dt._id,
                dataComment
              );
              setDataComment("");
              return datas.comment_content;
            })
            .then(async (dataa) => {
              const a = dataa.reverse();
              setIsMessager(true);
              setMessager("Successfully comment!!!");
              return setComment([...a]);
            });
        }
      } else {
        setIsMessager(true);
        setMessager("Can not be empty!!!");
      }
    } else {
      setIsMessager(true);
      setMessager("You need to login to be able to comment!!!");
    }
    return setTimeout(() => {
      setIsMessager(false);
    }, 1000);
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
        <Link className={ctx("mlr-6")} to={`/products`}>
          <h6>Products</h6>
        </Link>
        <span>/</span>
        <Link
          className={ctx("mlr-6")}
          to={`/products/category/${dataProduct?.product_category}`}
        >
          <h6 className={ctx("nameCategor")}>
            {dataProduct?.product_category}
          </h6>
        </Link>
        <span>/</span>
        <Link className={ctx("mlr-6")} to={`/products/${dataProduct?._id}`}>
          <h6 className={ctx("nameProduct")}>{dataProduct?.product_name}</h6>
        </Link>
      </div>
      {dataProduct && (
        <>
          <div className={ctx("detail")}>
            <div className={ctx("row")}>
              <div
                className={ctx("col-xl-4 col-lg-6 col-md-6 col-sm-7 col-12")}
              >
                <SliderProduct
                  img={dataProduct.product_img}
                  imgs={dataProduct.avatar}
                />
              </div>
              <div
                className={ctx("col-xl-8 col-lg-6 col-md-6 col-sm-5 col-12")}
              >
                <div className={ctx("info")}>
                  <div className={ctx("name")}>
                    <h4>{dataProduct.product_name}</h4>
                  </div>

                  <div className={ctx("monney", "my-3")}>
                    {dataProduct.product_percent === 0 ? (
                      <div className={ctx("dfcenter", "sub")}>
                        <span className={ctx("namePrice")}>Price: </span> $
                        {dataProduct.product_monney}
                      </div>
                    ) : (
                      <div className={ctx("dfcenter", "sub", "sub990")}>
                        <div className={ctx("dfcenter")}>
                          <span>Price </span>
                          <div className={ctx("price", "dfcenter")}>
                            <del className={ctx("old-price")}>
                              ${dataProduct.product_monney}
                            </del>
                            <span className={ctx("separation")}>-</span>
                            <span className={ctx("new-price")}>
                              ${PriceNew}
                            </span>
                          </div>
                        </div>
                        <div className={ctx("percent")}>
                          <span>Percent </span>
                          {dataProduct.product_percent} %
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={ctx("description", "my-3")}>
                    <span>Shipping from </span>
                    <div className={ctx("content")}>
                      {dataProduct.product_warehouse}
                    </div>
                  </div>

                  <div className={ctx("status", "my-3")}>
                    <span>Status </span>
                    <div className={ctx("content")}>
                      {dataProduct.product_status}
                    </div>
                  </div>
                  <div className={ctx("dfcenter", "amount", "my-3")}>
                    <span>Amount </span>
                    <div className={ctx("content")}>
                      <div className={ctx("dfcenter", "sub")}>
                        <button
                          onClick={handleQtyRemove}
                          className={ctx("btnQty")}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input
                          type="number"
                          value={qty}
                          min="1"
                          onChange={(e) => e.target.value}
                        />
                        <button
                          onClick={handleQtyAdd}
                          className={ctx("btnQty")}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button
                    className={ctx("addCart", "mt-3")}
                    rightIcon={<FontAwesomeIcon icon={faCartArrowDown} />}
                    onClick={(e) => handleAddProduct(e)}
                  >
                    <h6>Add cart</h6>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className={ctx("info_product", "my-3")}>
            <div className={ctx("menu")}>
              <div className={ctx("dfcenter")}>
                <Button
                  className={ctx("btn", `${isDetail ? "active" : ""}`)}
                  onClick={() => {
                    setIsDetail(true);
                    setIsComment(false);
                  }}
                >
                  <h6>Describe</h6>
                </Button>
                <Button
                  className={ctx("btn", `${isComment ? "active" : ""}`)}
                  onClick={() => {
                    setIsDetail(false);
                    setIsComment(true);
                  }}
                >
                  <h6>Comment</h6>
                </Button>
              </div>
            </div>
            {isDetail && (
              <div className={ctx("content")}>
                <h5 className={ctx("name", "mb-4")}>Product Description</h5>
                <pre>{dataProduct.product_detail}</pre>
              </div>
            )}
            {isComment && (
              <div className={ctx("content")}>
                <div className={ctx("submitComment", "dfcenter mb-4")}>
                  <input
                    type="text"
                    value={dataComment}
                    placeholder="Enter comment..."
                    onChange={(e) => setDataComment(e.target.value)}
                  />
                  <Button onClick={handleComment}>
                    <h6>Submit</h6>
                  </Button>
                </div>

                <div className={ctx("commentUser")}>
                  <CommentUSer data={comment} productId={dataProduct._id} />
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <div className={ctx("together", "my-3 mt-4")}>
        <h5 className={ctx("name", "my-3")}>
          Similar products that you may like
        </h5>
        {dataCategory && (
          <div className={ctx("row")}>
            {dataCategory.map((product) => {
              return (
                <div
                  key={product._id}
                  className={ctx("col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6")}
                >
                  <Product data={product} onClick={handleAddCart} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailProduct;

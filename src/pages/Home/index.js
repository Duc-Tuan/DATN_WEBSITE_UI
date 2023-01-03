import { useEffect, useState } from "react";
import className from "classnames/bind";
import style from "./Home.module.scss";
import { useStateValue } from "../../contexts/StateProvider";
import Button from "../../components/Button";
import { setCart } from "../../contexts/Reducer";
import Product from "../../components/Product/Product";
import MessProduct from "../../components/MessProduct";

const ctx = className.bind(style);
function Home() {
  const [data, setData] = useState([]);
  const [{ user, product }, dispatch] = useStateValue();
  const [isMessager, setIsMessager] = useState(false);
  const [Messager, setMessager] = useState("");

  useEffect(() => {
    product.then((data) => setData(data.data));
  }, [product]);

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
      setIsMessager(true);
      setMessager("Successfully add to cart!");
      dispatch(setCart(dataCarts));
    } else {
      setIsMessager(true);
      setMessager("Error you are not logged in!!!");
    }
    return setTimeout(() => {
      setIsMessager(false);
    }, 1000);
  };

  return (
    <div className={ctx("wapper")}>
      {isMessager && <MessProduct data={Messager} />}
      <h5 className={ctx("my-4")}>Products:</h5>
      {data.length !== 0 ? (
        <>
          <div className={ctx("row")}>
            {data.map((product) => {
              return (
                <div
                  key={product._id}
                  className={ctx("col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6")}
                >
                  <Product data={product} onClick={handleAddCart} />
                </div>
              );
            })}
          </div>
          <div className={ctx("more", "dfcenter my-4")}>
            <Button className={ctx("btnMore")} to={"/products"}>
              <h6>More</h6>
            </Button>
          </div>
        </>
      ) : (
        <div className={ctx("dfcenter", "productNull")}>
          <h5>
            There are currently no products. Invite admin to add products!!!
          </h5>
        </div>
      )}
    </div>
  );
}

export default Home;

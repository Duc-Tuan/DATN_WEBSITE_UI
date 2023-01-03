import className from "classnames/bind";
import { useEffect, useState } from "react";
import { useStateValue } from "../../../contexts/StateProvider";
import styles from "./Sidebar.module.scss";
import "./index.css";
import { Link } from "react-router-dom";

const ctx = className.bind(styles);

function Sidebar() {
  const [dataCategory, setDataCategory] = useState([]);
  const [{ category }, dispatch] = useStateValue();

  useEffect(() => {
    category.then((data) => setDataCategory(data));
  }, [category]);
  return (
    <div className={ctx("wapper", "container")}>
      <h5 className={ctx("mb-4", "nameCategory")}>Category</h5>
      {dataCategory.length !== 0 ? (
        dataCategory &&
        dataCategory.map((data) => {
          return (
            <Link
              key={data._id}
              to={`/products/category/${data.category_name}`}
            >
              <div className={ctx("category")}>
                <div className={ctx("name")}>{data.category_name}</div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className={ctx("categoryNull", "dfcenter")}>
          <h5 className={ctx("content")}>
            No categories have been added yet!!!
          </h5>
        </div>
      )}
    </div>
  );
}

export default Sidebar;

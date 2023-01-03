import className from "classnames/bind";
import { useEffect, useState } from "react";
import { useStateValue } from "../../../contexts/StateProvider";
import styles from "./Sidebar.module.scss";
import Slider from "react-slick";
import "./index.css";
import { Link } from "react-router-dom";

const ctx = className.bind(styles);

function Sidebar() {
  const [dataCategory, setDataCategory] = useState([]);
  const [{ category }, dispatch] = useStateValue();

  useEffect(() => {
    category.then((data) => setDataCategory(data));
  }, [category]);

  const settings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 7,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 7,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 5,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 3,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className={ctx("wapper", "container")}>
      <h5 className={ctx("mb-4")}>Category</h5>
      {dataCategory.length !== 0 ? (
        <Slider {...settings}>
          {dataCategory &&
            dataCategory.map((data) => {
              return (
                <Link key={data._id} to={`/products/category/${data.category_name}`}>
                  <div className={ctx("category")}>
                    <div className={ctx("img")}>
                      <img width="100%" src={data.category_image.url} alt="" />
                    </div>
                    <div className={ctx("name")}>{data.category_name}</div>
                  </div>
                </Link>
              );
            })}
        </Slider>
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

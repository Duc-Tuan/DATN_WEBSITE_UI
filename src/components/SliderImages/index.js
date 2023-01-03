import classNames from "classnames/bind";
import { useState } from "react";
import style from "./SliderImage.module.scss";

const ctx = classNames.bind(style);

function SliderProduct({ img, imgs }) {
  const [image, setImage] = useState(img);
  const handleImage = (data) => {
    setImage([data]);
  };
  
  return (
    <div className={ctx("wapper")}>
      <div className={ctx("mainImage", "dfcenter")}>
        <div className={ctx("image", "dfcenter")}>
          <img src={`${image[0].url}`} alt="" />
        </div>
      </div>

      <div className={ctx("content", "row pt-3", "dfcenter")}>
        {imgs &&
          imgs.map((data, id) => {
            return (
              <div
                key={id}
                onClick={(e) => handleImage(data, e)}
                className={ctx(`col-${12 / imgs.length}`, "dfcenter")}
              >
                <div
                  className={ctx(
                    "btnImge",
                    "dfcenter",
                    `${image[0].url === data.url ? "active" : ""}`
                  )}
                >
                  <img width="100%" src={`${data.url}`} alt="" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SliderProduct;

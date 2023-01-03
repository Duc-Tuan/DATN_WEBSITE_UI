import { useEffect, useState } from "react";
import Slider from "react-slick";
import Button from "../Button";
import "./index.css";

import className from "classnames/bind";
import style from "./Banner.module.scss";
import { useStateValue } from "../../contexts/StateProvider";

const ctx = className.bind(style);

function Banner() {
  const [{ banner }, dispatch] = useStateValue();
  const [Banner, setBanner] = useState([]);

  useEffect(() => {
    banner.then((data) => setBanner(data));
  }, [banner]);
  var settings = {
    zIndex: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={ctx("wapper")}>
      {Banner.length === 0 ? (
        <div className={ctx("bannerNull", "dfcenter")}>
          <h5 className={ctx("content")}>
            There are currently no ads. Please contact the new shop owner to
            advertise!!!
          </h5>
        </div>
      ) : (
        <>
          <Slider {...settings}>
            {Banner.map((data, index) => (
              <div key={index} className={ctx("banner")}>
                <div className={ctx("img")}>
                  <img width="100%" src={`${data.Banner_image.url}`} alt="" />
                </div>

                <div className={ctx("info")}>
                  <h5 className={ctx("contact")}>{data.Banner_contact}</h5>
                  <div className={ctx("dfcenter")}>
                    <Button
                      target={"_blank"}
                      href={data.Banner_url}
                      className={ctx("btn", "mt-2")}
                    >
                      <h6>click here</h6>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
}

export default Banner;

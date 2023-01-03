import { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/StateProvider";
import className from "classnames/bind";
import style from "./Promotion.module.scss";

const ctx = className.bind(style);

function Promotion() {
  const [{ promotion }, dispatch] = useStateValue();
  const [data, setData] = useState([]);

  useEffect(() => {
    promotion
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => console.log(error));
  }, [promotion]);
  return (
    <div className={ctx("wapper")}>
      {data.length === 0 ? (
        <div className={ctx("promotionNull", "dfcenter")}>
          <h5 className={ctx("content")}>
            There are currently no promotions!!!
          </h5>
        </div>
      ) : (
        data.map((promotion) => (
          <div key={promotion._id} className={ctx("promotion")}>
            <div className={ctx("sub")}>
              {/* <div className={ctx("img")}> */}
                <img src={`${promotion.Promotion_image.url}`} alt="" />
              {/* </div> */}
              <div className={ctx("percent")}>
                <h6>Giảm: {promotion.Promotion_percent}%</h6>
              </div>
              <div className={ctx("date", "dfcenter")}>
                <span className={ctx("apply")}>APPLY: </span>
                <div className={ctx("date_start")}>
                  {promotion.Promotion_start}
                </div>
                <span> - </span>
                <div className={ctx("date_end")}>{promotion.Promotion_end}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Promotion;

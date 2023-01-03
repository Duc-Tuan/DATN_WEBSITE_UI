import { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./CommentUSer.module.scss";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ctx = classNames.bind(style);

function CommentUSer({ data, productId }) {
  const [dataComm, setDataComm] = useState([]);
  const { ProductID } = useParams();

  useEffect(() => {
    if (productId !== ProductID) {
      setDataComm([]);
    } else {
      setDataComm(data);
    }
  }, [data, productId, ProductID]);

  return (
    <div className={ctx("wapper")}>
      {dataComm.length !== 0 ? (
        dataComm.map((dataComment, index) => {
          return (
            <div key={index} className={ctx("mb-4")}>
              <div className={ctx("dfcenter my-1", "sub")}>
                <div className={ctx("infoUser")}>
                  <div className={ctx("image", "dfcenter")}>
                    {dataComment.name_avatar ? (
                      <img width="100%" src={dataComment.name_avatar} alt="" />
                    ) : (
                      <FontAwesomeIcon icon={faUser} />
                    )}
                  </div>
                </div>
                <div className={ctx("mx-2")}>
                  <span className={ctx("time")}>{dataComment.date}</span>
                  <h6 className={ctx("nameUser")}>{dataComment.name_user}</h6>
                </div>
              </div>
              <div className={ctx("contentComment", "my-2")}>
                <p>{dataComment.content}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className={ctx("commentNull", "dfcenter my-3")}>
          <h6>No one has commented on this product yet!!!</h6>
        </div>
      )}
    </div>
  );
}

export default memo(CommentUSer);

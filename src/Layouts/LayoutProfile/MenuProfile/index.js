import {
  faClockRotateLeft,
  faPencil,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames/bind";
import { useEffect, useState } from "react";
import { useStateValue } from "../../../contexts/StateProvider";
import styles from "./MenuProfile.module.scss";
import Button from "../../../components/Button";
import { useHref } from "react-router-dom";

const ctx = className.bind(styles);

function MenuProfile({ onClickClose }) {
  const [{ user }, dispatch] = useStateValue();
  const [dataUser, setDataUser] = useState([]);

  const [OpenCloseMenu, setOpenCloseMenu] = useState(true);

  const href = useHref();

  useEffect(() => {
    if (user !== null) {
      if (user.constructor === Object) {
        setDataUser(user);
      } else {
        user.then((data) => {
          return setDataUser(data);
        });
      }
    }
  }, [user]);
  return (
    <div className={ctx("wapper")}>
      <div className={ctx("title", "dfcenter")}>
        <div className={ctx("image")}>
          <div className={ctx("img")}>
            {dataUser.avatar !== null ? (
              <img width="100%" src={dataUser.avatar} alt="" />
            ) : (
              <div className={ctx("avatarNull", "dfcenter")}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
          </div>
        </div>

        <div className={ctx("nameUser", "mx-2")}>
          <h6 className={ctx("name")}>{dataUser?.user_aliases}</h6>
          <span>
            <FontAwesomeIcon icon={faPencil} /> Edit profile
          </span>
        </div>
      </div>
      <hr></hr>
      <div className={ctx("menu", "mt-3")}>
        <div className={ctx("my_profile")}>
          <Button
            to="/profile/profileMy"
            onClick={() => setOpenCloseMenu(!OpenCloseMenu)}
          >
            <div className={ctx("dfcenter")}>
              <h6>
                <FontAwesomeIcon icon={faUserShield} />
              </h6>
              <h6 className={ctx("mx-2")}>My account</h6>
            </div>
          </Button>

          {OpenCloseMenu && (
            <div className={ctx("menu__sub", "mt-2")}>
              <div className={ctx("my-1")}>
                <Button to="/profile/profileMy" onClick={() => onClickClose()}>
                  <h6
                    className={ctx(
                      `${href === "/profile/profileMy" ? "active" : ""}`
                    )}
                  >
                    Profile
                  </h6>
                </Button>
              </div>
              <div className={ctx("my-1")}>
                <Button to="/profile/address" onClick={() => onClickClose()}>
                  <h6
                    className={ctx(
                      `${href === "/profile/address" ? "active" : ""}`
                    )}
                  >
                    Address
                  </h6>
                </Button>
              </div>
              <div className={ctx("my-1")}>
                <Button to="/profile/changePass" onClick={() => onClickClose()}>
                  <h6
                    className={ctx(
                      `${href === "/profile/changePass" ? "active" : ""}`
                    )}
                  >
                    Change Password
                  </h6>
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className={ctx("history_buy")}>
          <Button
            to="/profile/history"
            onClick={() => {
              onClickClose();
              return setOpenCloseMenu(false);
            }}
          >
            <div className={ctx("dfcenter")}>
              <h6>
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </h6>
              <h6
                className={ctx(
                  "mx-2",
                  `${href === "/profile/history" ? "active" : ""}`
                )}
              >
                History buy
              </h6>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MenuProfile;

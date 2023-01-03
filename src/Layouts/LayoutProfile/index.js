import className from "classnames/bind";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import styles from "./DefaultLayout.module.scss";
import MenuProfile from "./MenuProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const ctx = className.bind(styles);

function LayoutProfile({ children }) {
  const refMenu = useRef();
  const handleMenu = () => {
    refMenu.current.classList.toggle(ctx("active"));
  };
  const handleClose = () => {
    refMenu.current.classList.remove(ctx("active"));
  };
  return (
    <div className={ctx("wapper")}>
      <Header />
      <div className={ctx("content__menu")}>
        <div className={ctx("container", "top-4")}>
          <div className={ctx("dfcenter", "sub")}>
            <div className={ctx("BtnMenu")}>
              <div className={ctx("btn")} onClick={handleMenu}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
            <div ref={refMenu} className={ctx("MenuProfile")}>
              <div className={ctx("BtnClose")} onClick={handleClose}>
                <FontAwesomeIcon icon={faClose} />
              </div>
              <MenuProfile onClickClose={handleClose} />
            </div>
            <div className={ctx("content")}>{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LayoutProfile;

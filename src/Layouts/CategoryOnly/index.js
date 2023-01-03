import className from "classnames/bind";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "./Slidebar";

const ctx = className.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={ctx("wapper")}>
      <Header />
      <div className={ctx("container")}>
        <div className={ctx("row")}>
          <div className={ctx("sliderba", "col-xl-2 col-lg-3 col-md-4 my-4")}>
            <Sidebar />
          </div>
          <div className={ctx("content", "col-xl-10 col-lg-9 col-md-8 mt-3")}>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;

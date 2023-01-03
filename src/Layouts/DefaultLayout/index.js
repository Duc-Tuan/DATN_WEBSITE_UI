import className from "classnames/bind";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "./Slidebar";
import Banner from "../../components/Banner";
import Promotion from "../../components/Promotion";

const ctx = className.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={ctx("wapper")}>
      <Header />
      <div className={ctx("container")}>
      <div className={ctx("row", "mt-4")}>
        <div className={ctx("col-xl-8 col-lg-12 col-md-12")}>
          <Banner />
        </div>
        <div className={ctx("col-xl-4 col-lg-12 col-md-12")}>
          <Promotion />
        </div>
      </div>
        <div className={ctx("sliderba", "my-4")}>
          <Sidebar />
        </div>
        <div className={ctx("content", "mt-3")}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;

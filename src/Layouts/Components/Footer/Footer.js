import classNames from "classnames/bind";
import style from "./Footer.module.scss";

const ctx = classNames.bind(style);

function Footer() {
  return (
    <footer className={ctx("Wapper")}>
      <div className={ctx("footer_copyright", "dfcenter")}>
        <small>&copy; Website made by Mr.Tuan</small>
      </div>
    </footer>
  );
}

export default Footer;

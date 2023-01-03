import HeadlessTippy from "@tippyjs/react/headless";
import Button from "../../../components/Button";
import classNames from "classnames/bind";
import style from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesUp,
  faCaretDown,
  faCartArrowDown,
  faIdCard,
  faMagnifyingGlass,
  faMoneyBill,
  faPhone,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../Search/Search";
import Logo from "../../../assets/Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../contexts/StateProvider";
import { setUser } from "../../../contexts/Reducer";
import { useEffect, useState } from "react";
import { ProductCarts } from "../../../components/ProductItemCart";
import cartNull from "../../../assets/Images/9bdd8040b334d31946f49e36beaf32db.png"

const ctx = classNames.bind(style);

function Header() {
  var dataCarts = JSON.parse(localStorage.getItem("carts")) ?? [];
  const navation = useNavigate();
  const [{ user, carts }, dispatch] = useStateValue();
  const [Login, setLogin] = useState();
  const [cart, setCarts] = useState([]);

  const handleDX = () => {
    localStorage.clear();
    setCarts([]);
    setLogin(null);
    dispatch(setUser(null));
    navation("/")
  };

  useEffect(() => {
    if (user !== null && user !== undefined) {
      if (user.constructor === Object) {
        setLogin(user);
      } else if (user === null) {
        setLogin(null);
      } else {
        user.then((data) => setLogin(data));
      }
    }
  }, [user]);

  useEffect(() => {
    if (carts.length === 0) {
      setCarts(dataCarts);
    } else {
      if (carts.constructor === Array) {
        setCarts(carts);
      } else {
        carts.then((data) => setCarts(data));
      }
    }
  }, [carts]);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      const header = document.querySelector("#header");
      const BtnUp = document.querySelector("#head");
      if (window.scrollY >= 100) {
        header.classList.add(ctx("active"));
        BtnUp.classList.add(ctx("active"));
      } else {
        header.classList.remove(ctx("active"));
        BtnUp.classList.remove(ctx("active"));
      }
    });

    const BtnSearch = document.querySelector("#btnSearch");
    const search = document.querySelector("#search");
    BtnSearch.addEventListener("click", function () {
      search.classList.toggle(ctx("active"));
    });
  }, []);

  const handleCarts = () => {};

  const handleHead = () => {
    window.scrollTo(0, 0);
  };

  const login = Login ? true : false;
  
  return (
    <header className={ctx("Wapper")}>
      <div className={ctx("contact")}>
        <div className={ctx("container")}>
          <div className={ctx("header_contact", "row")}>
            <div className={ctx("col-xl-4 col-lg-4 col-md-4 col-5")}>
              <HeadlessTippy
                interactive
                offset={[10, 4]}
                placement={"bottom-start"}
                render={(attrs) => (
                  <div>
                    {login ? (
                      <div
                        className={ctx("login_true")}
                        tabIndex="-1"
                        {...attrs}
                      >
                        <Button
                          className={"hover"}
                          leftIcon={<FontAwesomeIcon icon={faIdCard} />}
                          to={"/profile/profileMy"}
                        >
                          <h6>Profile</h6>
                        </Button>
                        <Button
                          className={"hover"}
                          leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                          onClick={handleDX}
                        >
                          <h6>Logout</h6>
                        </Button>
                      </div>
                    ) : (
                      <div
                        className={ctx("login_true")}
                        tabIndex="-1"
                        {...attrs}
                      >
                        <Button
                          className={"hover"}
                          leftIcon={<FontAwesomeIcon icon={faIdCard} />}
                          to={`/login`}
                        >
                          <h6>Logout</h6>
                        </Button>
                        <Button
                          className={"hover"}
                          leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                          to={`/register`}
                        >
                          <h6>Register</h6>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              >
                <div>
                  {login ? (
                    <Button className={ctx("leftButton p0", "info")}>
                      <div className={ctx("infoName", "dfcenter")}>
                        {Login.avatar !== null ? (
                          <div className={ctx("avatar", "dfcenter")}>
                            <img
                              src={`${Login.avatar}`}
                              alt=""
                            />
                          </div>
                        ) : (
                          <h6 className={ctx("clWhite")}>
                            <FontAwesomeIcon icon={faUser} />
                          </h6>
                        )}
                        <h6 className={ctx("name__user")}>
                          {Login.user_aliases}
                        </h6>
                        <h6 className={ctx("clWhite")}>
                          <FontAwesomeIcon icon={faCaretDown} />
                        </h6>
                      </div>
                    </Button>
                  ) : (
                    <Button className={ctx("leftButton p0")}>
                      <div className={ctx("dfcenter", "userNull")}>
                        <h6 className={ctx("clWhite")}>
                          <FontAwesomeIcon icon={faUser} />
                        </h6>
                        <h6 className={ctx("name__user")}>Account</h6>
                        <h6 className={ctx("clWhite")}>
                          <FontAwesomeIcon icon={faCaretDown} />
                        </h6>
                      </div>
                    </Button>
                  )}
                </div>
              </HeadlessTippy>
            </div>
            <div className={ctx("col-xl-8 col-lg-8 col-md-8 col-7")}>
              <div className={ctx("row", "right")}>
                <div className={ctx("col-xl-6 col-4", "p0")}>
                  <Button
                    className={ctx("clWhite")}
                    leftIcon={<FontAwesomeIcon icon={faPhone} />}
                  >
                    <span className={ctx("none")}>0123456789</span>
                  </Button>
                </div>
                <div className={ctx("col-xl-3 col-4", "p0")}>
                  <Button
                    className={ctx("clWhite")}
                    leftIcon={<FontAwesomeIcon icon={faCartArrowDown} />}
                    to={"/carts"}
                    onClick={handleCarts}
                  >
                    <span className={ctx("none")}>Cart</span>
                  </Button>
                </div>
                <div className={ctx("col-xl-3 col-4", "p0")}>
                  <Button
                    className={ctx("clWhite")}
                    leftIcon={<FontAwesomeIcon icon={faMoneyBill} />}
                    to={"/pay"}
                  >
                    <span className={ctx("none")}>Pay</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={ctx("header")} id="header">
        <div className={ctx("container")}>
          <div className={ctx("header_content", "row")}>
            <div className={ctx("col-3")}>
              <Link to={"/"}>
                <img className={ctx("logo")} src={Logo} alt="" />
              </Link>
            </div>
            <div className={ctx("col-9")}>
              <div className={ctx("row", "right")}>
                <div
                  className={ctx(
                    "col-xl-9 col-lg-9 col-md-9 col-6",
                    "dfcenter"
                  )}
                >
                  <div className={ctx("btnSearch")} id="btnSearch">
                    <Button>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </div>
                  <div className={ctx("search")} id="search">
                    <Search />
                  </div>
                </div>
                <div
                  className={ctx(
                    "col-xl-3 col-lg-3 col-md-3 col-6",
                    "dfcenter"
                  )}
                >
                  <HeadlessTippy
                    interactive
                    placement={"bottom-end"}
                    offset={[10, 12]}
                    render={(attrs) => (
                      <div
                        className={ctx("search-result")}
                        tabIndex="-1"
                        {...attrs}
                      >
                        <div className={ctx("carts")}>
                          {cart && cart.length !== 0  ? (
                            <div>
                              <div className={ctx("cart")}>
                                {cart.map((data, index) => (
                                  <ProductCarts key={index} data={data} />
                                ))}
                              </div>
                              <Button className={ctx("viewCart")} to={"/carts"}>
                                <h5>View all cart</h5>
                              </Button>
                            </div>
                          ) : (
                            <div className={ctx("dfcenter")}>
                              <div className={ctx("cartNull")}>
                                <img src={cartNull} alt="" />
                                <h6>Cart null</h6>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  >
                    <div>
                      <Button>
                        <div className={ctx("Cartbtn")}>
                          <FontAwesomeIcon icon={faCartArrowDown} />
                          <span className={ctx("qty", "dfcenter")}>
                            {cart && cart.length}
                          </span>
                        </div>
                      </Button>
                    </div>
                  </HeadlessTippy>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={ctx("head")} id="head">
        <Button className={ctx("btn_head")} onClick={handleHead}>
          {<FontAwesomeIcon icon={faAnglesUp} />}
        </Button>
      </div>
    </header>
  );
}

export default Header;

import { useEffect, useRef, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import useDebounced from "../../../hooks/useDebounced";
import * as searchService from "../../../services/searchService";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import classNames from "classnames/bind";
import style from "./Search.module.scss";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { useStateValue } from "../../../contexts/StateProvider";
import { setSearchProd } from "../../../contexts/Reducer";
import { useNavigate } from "react-router-dom";

const ctx = classNames.bind(style);

function Search() {
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [laoding, setLoading] = useState(false);

  const debounced = useDebounced(searchValue, 300);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchService.search(debounced);
      setSearchResult(result);

      setLoading(false);
    };

    fetchApi();
  }, [debounced]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handlehide = () => {
    setShowResult(false);
    setSearchValue("");
  };

  window.addEventListener("keydown", (e) => {
    if (e.which === 13) {
      dispatch(setSearchProd(searchValue));
      setShowResult(false);
      return navigate("/search");
    }
  });

  const handleSearchData = (e) => {
    dispatch(setSearchProd(searchValue));
    setShowResult(false);
    return navigate("/search");
  };

  return (
    <div className={ctx("wapper")}>
      <HeadlessTippy
        interactive
        placement={"bottom-start"}
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={ctx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={ctx("search-title")}>Products</h4>
              <div className={ctx("searchData")}>
                {searchResult.map((result) => (
                  <ProductItem
                    onClick={handlehide}
                    key={result._id}
                    data={result}
                  />
                ))}
              </div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={ctx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search name product..."
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !laoding && (
            <button className={ctx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {laoding && (
            <FontAwesomeIcon className={ctx("laoding")} icon={faSpinner} />
          )}
          <button
            className={ctx("search-btn")}
            onClick={handleSearchData}
            onMouseDown={(e) => e.preventDefault()}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;

import classNames from "classnames/bind";
import { useState } from "react";
import style from "./Pagination.module.scss";

const ctx = classNames.bind(style);

function Pagination({ totalPg, currentPg, pg }) {
  const [totalPagin, setTotalPagin] = useState(totalPg);
  const [currentPage, setCurrentPage] = useState(currentPg);
  const [page, setPage] = useState(pg);

  return (
    <div className={ctx("paginations", "my-4")}>
      <ul className={ctx("dfcenter", "pagination")}>
        <li
          className={ctx("prev")}
          onClick={() => {
            page === 1 ? setPage(1) : setPage(page - 1);
          }}
        >
          prev
        </li>
        {totalPagin.map((data, index) => {
          return (
            <li
              key={index}
              className={ctx(`${currentPage === data ? "active" : ""}`)}
              onClick
            >
              {data}
            </li>
          );
        })}
        <li className={ctx("next")} onClick={() => setPage(page + 1)}>
          next
        </li>
      </ul>
    </div>
  );
}

export default Pagination;

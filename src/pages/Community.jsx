import React, { useEffect, useState } from "react";
import "../styles.css";
import "../components/community/community.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Items({ currentItems }) {
  let navigate = useNavigate();

  return (
    <>
      {currentItems?.map((doc, i) => (
        <div key={i} onClick={() => navigate("/view", { state: { arg: doc.data() } })}>
          <div className="num">{doc.data().num}</div>
          <div className="tit">{doc.data().title}</div>
          <div className="date">{doc.data().date.substring(0, 10)}</div>
          <div className="name">{doc.data().writer}</div>
          <div className="count">0</div>
        </div>
      ))}
    </>
  );
}

function Community({ itemsPerPage }) {
  let navigate = useNavigate();
  const [items, setItems] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const docRef = collection(db, "post");
      const writingSnap = await getDocs(docRef);
      setItems(writingSnap);
    };
    fetchData();
  }, []);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.docs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items?.docs.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items?.docs.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <div className="wrap">
      <nav className="mt-24"></nav>
      <div className="area section">
        <div className="tab flexedclear">
          <div className="write">
            <button
              onClick={() => {
                navigate("/write");
              }}
            >
              글쓰기
            </button>
          </div>
        </div>
        <div className="board">
          <div className="board_header">
            <div className="num">No.</div>
            <div className="tit">제목</div>
            <div className="date">등록일</div>
            <div className="name">작성자</div>
            <div className="count">조회수</div>
          </div>
          {/* <!-- 시작 --> */}
          <div className="board_list">
            <Items currentItems={currentItems} />
          </div>
        </div>
        <ReactPaginate
          activeClassName={"item active "}
          breakClassName={"item break-me "}
          breakLabel={"..."}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          nextLabel=">"
          pageClassName={"item pagination-page "}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousClassName={"item previous"}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
      <div className="mb-24"></div>
    </div>
  );
}

export default Community;

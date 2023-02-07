import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";

function View() {
  const location = useLocation();
  const navigate = useNavigate();
  const writingRef = collection(db, "post");
  const [pre, setPre] = useState();
  const [next, setNext] = useState();
  const [inputs, setInputs] = useState({
    name: "",
    text: "",
    password: "",
  });
  const [deleteModal, setDeleteModal] = useState(true);
  const { name, text, password } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const fetchData = async () => {
    // 번호만 있는 컬렉션
    const preRef = doc(db, "post", parseInt(location.state.arg.num) - 1 + "");
    const preSnap = await getDoc(preRef);
    const nextRef = doc(db, "post", parseInt(location.state.arg.num) + 1 + "");
    const nextSnap = await getDoc(nextRef);

    setPre(preSnap.data());
    setNext(nextSnap.data());
  };
  useEffect(() => {
    fetchData();
  }, []);

  // 댓글 기능
  const onSubmit = async () => {
    await setDoc(doc(writingRef, location.state.arg.num), {
      title: location.state.arg.title,
      content: location.state.arg.content,
      writer: location.state.arg.writer,
      password: location.state.arg.password,
      date: location.state.arg.date,
      num: location.state.arg.num,
      comment: [
        ...location.state.arg.comment,
        {
          name: inputs.name,
          text: inputs.text,
          password: inputs.password,
        },
      ],
    });

    navigate("/community");
  };

  const onDelete = async () => {
    await deleteDoc(doc(db, "post", location.state.arg.num));
    // console.log(location.state.arg.num);
    navigate("/community");
  };

  return (
    <div className="wrap">
      <nav className="mt-24"></nav>
      <div className="area section">
        <div className="board_view_wrap">
          <div className="board_view">
            <div className="title">
              <span className="count">{location.state.arg.num}</span>
              <h2 className="tit">{location.state.arg.title}</h2>
              <div className="info">
                <div className="group">
                  <div className="item_tit">등록일</div>
                  <div className="item_cont">{location.state.arg.date.substring(0, 10)}</div>
                </div>
                <div className="group">
                  <div className="item_tit">작성자</div>
                  <div className="item_cont">{location.state.arg.writer}</div>
                </div>
                <div className="group">
                  <div className="item_tit">조회수</div>
                  <div className="item_cont">0</div>
                </div>
              </div>
            </div>
            <div className="cont">{location.state.arg.content}</div>
          </div>
        </div>
        <div className="view_bt_wrap">
          <div className="left_wrap">
            <div className="btn">
              <button
                onClick={() => {
                  navigate("/rewrite", { state: { arg: location.state.arg } });
                }}
              >
                수정
              </button>
            </div>
            <div className="btn">
              <button className="open" onClick={() => setDeleteModal(false)}>
                삭제
              </button>
              {deleteModal ? (
                ""
              ) : (
                <div className="modal ">
                  <div className="modal_overlay"></div>
                  <div className="modal_content">
                    <div className="md_tit">
                      <strong>안내</strong>
                      <button className="close" onClick={() => setDeleteModal(true)}>
                        <span>닫기</span>
                        <svg
                          width="2rem"
                          height="2rem"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                    <span className="md_cont">
                      정말 삭제하시겠습니까?
                      <br />
                      삭제하시려면 비밀번호를 입력해주세요.
                    </span>
                    <div className="md_input">
                      <div className="">
                        <div>작성자</div>
                        <div className="fild_off px-20 py-4">{location.state.arg.writer}</div>
                      </div>
                      <div className="password">
                        <div>비밀번호</div>
                        <div>
                          <input type="password" placeholder="입력하세요" name="" id="" />
                        </div>
                      </div>
                    </div>
                    <button className="confirm" onClick={() => onDelete()}>
                      확인
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="cmt_wrap">
          <h2 className="tab">댓글보기</h2>
          <div className="cmt_list">
            {location.state.arg.comment.map((doc, i) => (
              <div key={i}>
                <span className="name">{doc.name}</span>
                <span className="del open">
                  <button>삭제</button>
                </span>
                <div className="cont">{doc.text}</div>
              </div>
            ))}
          </div>
          <div className="cmt_write">
            <div className="group">
              <div className="item_tit cont">댓글</div>
              <div className="item_cont">
                <textarea
                  name="text"
                  placeholder="300자까지 입력 가능"
                  maxLength="300"
                  rows="1"
                  onChange={onChange}
                  value={text}
                ></textarea>
              </div>
            </div>
            <div className="info_g">
              <div className="group">
                <div className="item_tit name">작성자</div>
                <div className="item_cont">
                  <input
                    type="text"
                    placeholder="8자까지 입력 가능"
                    name="name"
                    onChange={onChange}
                    value={name}
                    maxLength="8"
                  />
                </div>
              </div>
              <div className="group">
                <div className="item_tit psword">비밀번호</div>
                <div className="item_cont">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="영문/숫자 혼합 10자 이상 입력"
                  />
                </div>
              </div>
            </div>
            <div className="btn">
              <button onClick={() => onSubmit()}>등록</button>
            </div>
          </div>
        </div>
        <div className="board">
          <div className="board_header">
            <div className="num"></div>
            <div className="tit">제목</div>
            <div className="date">등록일</div>
            <div className="name">작성자</div>
            <div className="count">조회수</div>
          </div>
          <div className="board_list">
            <div>
              <div className="num">다음글</div>
              <div className="tit">
                <a href="view.html">{next?.title}</a>
              </div>
              <div className="date">{next?.date.substring(0, 10)}</div>
              <div className="name">{next?.writer}</div>
              <div className="count">0</div>
            </div>
            <div>
              <div className="num">이전글</div>
              <div className="tit">
                <a href="view.html">{pre?.title}</a>
              </div>
              <div className="date">{pre?.date.substring(0, 10)}</div>
              <div className="name">{pre?.writer}</div>
              <div className="count">0</div>
            </div>
          </div>
          <span>
            <a>목록으로</a>
          </span>
        </div>
      </div>
      <div className="mb-24"></div>
    </div>
  );
}

export default View;

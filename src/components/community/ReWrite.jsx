import React, { useState } from "react";
import "../../styles.css";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";

function ReWrite() {
  let navigate = useNavigate();
  const location = useLocation();
  const writingRef = collection(db, "post");
  const [inputs, setInputs] = useState({
    title: location.state.arg.title,
    content: location.state.arg.content,
    writer: location.state.arg.writer,
    password: location.state.arg.password,
  });
  const { title, content, writer, password } = inputs;
  const [deleteModal, setDeleteModal] = useState(true);

  const onDelete = async () => {
    await deleteDoc(doc(db, "post", location.state.arg.num));
    // console.log(location.state.arg.num);
    navigate("/community");
  };

  const onSubmit = async () => {
    await setDoc(doc(writingRef, location.state.arg.num), {
      title: inputs.title,
      content: inputs.content,
      writer: inputs.writer,
      password: inputs.password,
      date: location.state.arg.date,
      num: location.state.arg.num,
      comment: location.state.arg.comment,
    });

    navigate("/community");
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <div className="wrap">
      <nav className="mt-24"></nav>
      <div className="area section">
        <div className="tab flexedclear">
          <h2>커뮤니티 | 자유게시판</h2>
        </div>
        <div className="board_write_wrap">
          {/* <!-- 시작 --> */}
          <form className="">
            <div className="my-2">
              <div className="flex items-center">
                <div className="w-24">제목</div>
                <div className="border w-full p-3">
                  <input
                    className="w-full"
                    name="title"
                    type="text"
                    placeholder="제목 입력"
                    onChange={onChange}
                    value={title}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex items-top">
                <div className="w-24">내용</div>
                <div className="border w-full p-3">
                  <textarea
                    className="w-full h-52"
                    name="content"
                    type="text"
                    placeholder="내용 입력"
                    onChange={onChange}
                    value={content}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end">
                <span>0/1,000자</span>
              </div>
            </div>
            <div className="flex ">
              <div className="flex w-full items-center">
                <div className="w-24">작성자</div>
                <div className="border w-full p-3 mr-3">
                  <input
                    className="w-full"
                    name="writer"
                    type="text"
                    placeholder="닉네임"
                    onChange={onChange}
                    value={writer}
                  />
                </div>
              </div>
              <div className="flex w-full items-center">
                <div className="w-24">비밀번호</div>
                <div className="border w-full p-3">
                  <input
                    className="w-full"
                    type="password"
                    name="password"
                    placeholder="영문/숫자 혼합 10자 이상 입력"
                    onChange={onChange}
                    value={password}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="bt_wrap">
            <div className="right">
              <button
                onClick={() => {
                  navigate("/community");
                }}
              >
                취소
              </button>
            </div>
            <div className="left_wrap">
              <div className="btn">
                <button onClick={() => onSubmit()}>수정완료</button>
              </div>
              <div className="btn">
                <a href="/">삭제</a>
              </div>
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
      </div>
      <div className="mb-24"></div>
    </div>
  );
}

export default ReWrite;

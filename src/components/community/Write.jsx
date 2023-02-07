import React, { useEffect, useState } from "react";
import "../../styles.css";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const writingRef = collection(db, "post");
  const numRef = doc(db, "num", "post");
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    writer: "",
    password: "",
    postNum: "",
  });
  const { title, content, writer, password } = inputs;
  const [num, setNum] = useState();

  const fetchData = async () => {
    // 번호만 있는 컬렉션
    const docRef = doc(db, "num", "post");
    const numSnap = await getDoc(docRef);

    setNum(numSnap.data().num);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const now = year + "." + month + "." + day + "." + hours + "." + minutes;

    await setDoc(doc(writingRef, num), {
      title: inputs.title,
      content: inputs.content,
      writer: inputs.writer,
      password: inputs.password,
      date: now,
      num: num,
      comment: [],
    });

    await updateDoc(numRef, {
      num: parseInt(num) + 1 + "",
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
      <div className="area ">
        <div className="">
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
            <div className="left_wrap mb-24">
              <div className="btn">
                <button onClick={() => onSubmit()}>등록</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;

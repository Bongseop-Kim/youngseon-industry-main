import React from "react";
import { useState } from "react";
// import contactBg from "../image/contactBg.png";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import close from "../image/close.png";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    accountNumber: "",
    request: "",
  });

  const { name, company, phone, email, accountNumber, request } = form;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const RadioInput = ({ label, value, checked, setter }) => {
    return (
      <label className="px-2.5">
        <input type="radio" checked={checked === value} onChange={() => setter(value)} />
        <span className="px-2.5">{label}</span>
      </label>
    );
  };

  const [tie, setTie] = React.useState();
  const [fabric, setFabric] = React.useState();
  const [design, setDesign] = React.useState();
  const [label, setLabel] = React.useState();
  const [box, setBox] = React.useState();
  const [account, setAccount] = React.useState();

  const fileInput = React.useRef(null);
  const [designFile, setDesignFile] = useState();

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };
  const handleChange = (e) => {
    setDesignFile(e.target.files[0]);
  };

  const radioData = { tie, fabric, design, label, box, account };

  let today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  var hours = today.getHours();
  var minuutes = today.getMinutes();
  var dateString = year + "-" + month + "-" + day + "-" + hours + "-" + minuutes;

  const [confirm, setConfirm] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (true) {
      console.log("오류");
    }
    var storageRef = ref(storage, dateString + "-" + designFile.name);
    uploadBytes(storageRef, designFile).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      setConfirm(true);
    });
    await setDoc(doc(db, form.company, dateString), {
      form,
      radioData,
    });
  };
  return (
    <>
      {confirm ? (
        <div>
          <div className="fixed w-full h-full bg-black opacity-50 top-0 left-0 "></div>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white px-7 rounded-md pb-9">
            <div className="flex justify-between pb-5 pt-9">
              <p>색상 선택</p>
              <img src={close} alt="close" onClick={() => setConfirm(!confirm)} />
            </div>
            <div className="flex justify-end">
              <div
                className="bg-blue w-1/2 py-4 rounded-md flex justify-center mt-5"
                onClick={() => setConfirm(!confirm)}
              >
                <p className="text-white">적 용 하 기</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* 소개 시작 */}
      <div className="wrap">
        <div className="cont_bg h-[30vh] md:h-[18.75rem] overflow-hidden">
          <div className="area px-3.5 xl:px-0 ">
            <p className="pt-10 sm:pt-20 md:pt-28 text-3xl leading-[2.8rem] text-blue pb-5 font-bold">견적 문의</p>
            <span className="text-subgray leading-[1.8rem] text-over-ellipsis">
              영선산업에서 제공하는 최상의 품질과 기술력을 직접 경험해보세요.
              <br />
              문의를 남겨주시면 최대한 빠르게 답변드리겠습니다.
              <br />
              📞견적 상담 : 010-4945-7422
            </span>
          </div>
        </div>
        {/* 본문 시작 */}
        <div className="area pt-10 ms:pt-16 md:pb-48 sm:pb-32 pb-16 px-3.5 xl:px-0">
          <div className="bg-gray py-5 px-6 md:px-16 mb-8 rounded-md">
            <p className="font-semibold mb-2">
              정보 작성 및 이미지 첨부 후 문의하기 버튼을 누르시면 견적서가 발송됩니다.
            </p>
            <p>
              디자인파일 또는 로고, 그 외 참조파일은 40MB까지 첨부 가능합니다. 40MB를 초과하는 경우{" "}
              <a
                className="font-light bg-opacity-80 text-white bg-blue sm:bg-transparent sm:text-inherit sm:p-0 sm:rounded-none sm:font-normal rounded-md p-1"
                href="mailto:ystie@naver.com"
                title="이름_업체명_참조파일"
              >
                메일<span className="hidden sm:inline">(biblecookie@naver.com)</span>
              </a>
              로 보내주세요.
            </p>
          </div>
          <div className="text-[90%] sm:text-base">
            <div className="flex py-3">
              <div className="font-semibold bg-gray w-2/6 sm:w-44 flex justify-center rounded-md leading-[3.75rem] mr-3 sm:mr-7 shrink-0">
                이름
              </div>
              <form>
                <input
                  className="border border-inpgray py-2.5 pl-3 rounded-md sm:w-80 focus:ring-1 focus:outline-none focus:border-blue focus:ring-blue h-full text-subgray w-full"
                  value={name}
                  placeholder="이름을 입력해주세요."
                  name="name"
                  onChange={onChange}
                />
              </form>
            </div>
            <div className="flex py-4">
              <div className="font-semibold bg-gray w-2/6 sm:w-44 flex justify-center leading-[3.75rem] rounded-md mr-3 sm:mr-7 shrink-0">
                회사명
              </div>
              <form>
                <input
                  className="border border-inpgray py-2.5 pl-3 rounded-md sm:w-80 focus:ring-1 focus:outline-none focus:border-blue focus:ring-blue h-full text-subgray w-full"
                  value={company}
                  placeholder="회사명을 입력해주세요."
                  name="company"
                  onChange={onChange}
                />
              </form>
            </div>
            <div className="flex py-4">
              <div className="font-semibold bg-gray w-2/6 sm:w-44 flex justify-center leading-[3.75rem] rounded-md mr-3 sm:mr-7 shrink-0">
                연락처
              </div>
              <form>
                <input
                  className="border border-inpgray py-2.5 pl-3 rounded-md sm:w-80 focus:ring-1 focus:outline-none focus:border-blue focus:ring-blue h-full text-subgray w-full"
                  value={phone}
                  placeholder="연락처를 입력해주세요."
                  name="phone"
                  onChange={onChange}
                />
              </form>
            </div>
            <div className="flex py-4">
              <div className="font-semibold bg-gray w-2/6 sm:w-44 flex justify-center leading-[3.75rem] rounded-md mr-3 sm:mr-7 shrink-0">
                이메일
              </div>
              <form>
                <input
                  className="border border-inpgray py-2.5 pl-3 rounded-md sm:w-80 focus:ring-1 focus:outline-none focus:border-blue focus:ring-blue h-full text-subgray w-full"
                  value={email}
                  placeholder="이메일을 입력해주세요."
                  name="email"
                  onChange={onChange}
                />
              </form>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="md:flex items-center py-4">
                <label className="md:w-44 w-full font-semibold bg-gray leading-[3.75rem] rounded-md block text-center">
                  넥타이 종류
                </label>
                <div className="md:pl-4 grid grid-cols-2 flex-1 md:grid-cols-[repeat(auto-fill,_minmax(18%,_1fr))] gap-x-2 gap-y-4 mt-4 md:mt-0">
                  <RadioInput label="일반 넥타이(날염)" value="일반 넥타이(날염)" checked={tie} setter={setTie} />
                  <RadioInput label="일반 넥타이(선염)" value="일반 넥타이(선염)" checked={tie} setter={setTie} />
                  <RadioInput label="지퍼타이" value="지퍼타이" checked={tie} setter={setTie} />
                  <RadioInput label="보타이" value="보타이" checked={tie} setter={setTie} />
                  <RadioInput label="스카프" value="스카프" checked={tie} setter={setTie} />
                </div>
              </div>
              <div className="md:flex items-center py-4">
                <label className="md:w-44 w-full font-semibold bg-gray leading-[3.75rem] rounded-md block text-center">
                  원단 재질
                </label>
                <div className="md:pl-4 grid grid-cols-2 flex-1 md:grid-cols-[repeat(auto-fill,_minmax(18%,_1fr))] gap-x-2 gap-y-4 mt-4 md:mt-0">
                  <RadioInput label="실크" value="실크" checked={fabric} setter={setFabric} />
                  <RadioInput label="폴리에스터" value="폴리에스터" checked={fabric} setter={setFabric} />
                </div>
              </div>
              <div className="md:flex items-center py-4">
                <label className="md:w-44 w-full font-semibold bg-gray leading-[3.75rem] rounded-md block text-center">
                  디자인
                </label>
                <div className="md:pl-4 grid grid-cols-2 auto-fill flex-1 md:grid-cols-[repeat(auto-fill,_minmax(18%,_1fr))] gap-x-2 gap-y-4 mt-4 md:mt-0 items-center ">
                  <RadioInput label="디자인 있음" value="디자인 있음" checked={design} setter={setDesign} />
                  <RadioInput label="디자인 없음" value="디자인 없음" checked={design} setter={setDesign} />
                  <React.Fragment>
                    <div
                      className="border border-inpgray py-2 rounded-md col-span-3 md:col-end-auto flex items-center cursor-pointer"
                      onClick={handleButtonClick}
                    >
                      <input
                        className="px-2 py-1 rounded-md mx-1 "
                        type="file"
                        accept="image/*"
                        ref={fileInput}
                        onChange={handleChange}
                      />
                    </div>
                  </React.Fragment>
                </div>
              </div>
              <div className="md:flex items-center py-4 ">
                <label className="md:w-44 w-full font-semibold bg-gray leading-[3.75rem] rounded-md block text-center">
                  라벨
                </label>
                <div className="md:pl-4 grid grid-cols-3 auto-fit flex-1 md:grid-cols-[repeat(auto-fill,_minmax(18%,_1fr))] gap-x-2 gap-y-4 mt-4 md:mt-0 items-center break-keep">
                  <RadioInput label="품표(기본)" value="품표(기본)" checked={label} setter={setLabel} />
                  <RadioInput label="로고 라벨" value="로고 라벨" checked={label} setter={setLabel} />
                  <RadioInput label="필요 없음" value="필요 없음" checked={label} setter={setLabel} />
                </div>
              </div>
              <div className="md:flex items-center py-4">
                <label className="md:w-44 w-full font-semibold bg-gray leading-[3.75rem] rounded-md block text-center">
                  포장
                </label>
                <div className="md:pl-4 grid grid-cols-3 auto-fit flex-1 md:grid-cols-[repeat(auto-fill,_minmax(18%,_1fr))] gap-x-2 gap-y-4 mt-4 md:mt-0 items-center tracking-tighter">
                  <RadioInput label="개별 폴리백(기본)" value="개별 폴리백(기본)" checked={box} setter={setBox} />
                  <RadioInput label="고급 하드케이스" value="고급 하드케이스" checked={box} setter={setBox} />
                  <RadioInput label="일반 케이스(종이)" value="일반 케이스(종이)" checked={box} setter={setBox} />
                </div>
              </div>
              <div className="md:flex items-center py-4">
                <label className="md:w-44 w-full font-semibold bg-gray leading-[3.75rem] rounded-md block text-center">
                  수량
                </label>
                <div className="tracking-tighter md:pl-4 grid grid-cols-3 auto-fit flex-1 md:grid-cols-[repeat(auto-fill,_minmax(18%,_1fr))] gap-x-2 gap-y-4 mt-4 md:mt-0 items-center">
                  <RadioInput label="100개" value="100개" checked={account} setter={setAccount} />
                  <RadioInput label="300개" value="300개" checked={account} setter={setAccount} />
                  <RadioInput label="500개" value="500개" checked={account} setter={setAccount} />
                  <div className="flex col-span-4 md:col-span-2 items-center justify-between">
                    <RadioInput label="기타" value="기타" checked={account} setter={setAccount} />
                    <input
                      className="py-2.5 pl-3 rounded-md ml-2 border border-inpgray focus:ring-1 focus:outline-none focus:border-blue focus:ring-blue h-full w-full sm:w-3/4 "
                      value={accountNumber}
                      placeholder="수량을 입력해주세요."
                      name="accountNumber"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="md:flex py-4 w-full">
                <label className="md:w-44 w-full font-semibold bg-gray leading-[3.75rem] h-min rounded-md block text-center">
                  요청사항
                </label>
                <div className="md:pl-4 flex-1 w-full mt-4 md:mt-0">
                  <textarea
                    className="py-2.5 pl-3 rounded-md w-full h-[7rem] border border-inpgray focus:ring-1 focus:outline-none focus:border-blue focus:ring-blue text-subgray"
                    value={request}
                    placeholder="요청사항을 입력해주세요."
                    name="request"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="md:flex justify-center mt-[2rem] md:mt-16">
                <button className="bg-blue text-white w-full md:w-[27rem] h-[5.625rem] rounded-md" type="submit">
                  견적 문의하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ContactForm;

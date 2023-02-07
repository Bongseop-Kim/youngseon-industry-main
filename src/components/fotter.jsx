import React from "react";
import logo from "../image/logobol.png";

export default function footer() {
  return (
    <footer className="bg-[#222222] pt-12 pb-20 ">
      <form className="area flex items-center justify-between flex-col md:flex-row text-white md:items-end px-3.5 xl:px-0">
        <div>
          <div className="flex items-center pb-7 justify-center md:justify-start">
            <div className="ml-[-.5rem]">
              <img src={logo} alt="logo" className="w-6" />
            </div>
            <span className=" text-lg font-bold pl-2.5">영 선 산 업</span>
          </div>
          <ul className="text-sm text-center md:text-left">
            <li className="pb-3.5">
              <strong className="sm:pr-4">주소</strong>
              <br className="sm:hidden" />
              대전 동구 가양 2동 408-7
            </li>
            <li className="pb-3.5">
              <strong className="sm:pr-4">사업자 번호</strong>
              <br className="sm:hidden" />
              305-26-32033
            </li>
            <div className="flex items-center md:item-normal flex-col md:flex-row">
              <li className="sm:pr-4 pb-3.5 md:pb-0">
                <strong className="sm:pr-4 ">제품 및 샘플문의 전화</strong>
                <br className="sm:hidden" />
                010-4945-7422
              </li>
              <li>
                <strong className="sm:pr-4">팩스</strong>
                <br className="sm:hidden" />
                042-632-4442
              </li>
            </div>
          </ul>
        </div>
        <span className=" text-xs mt-7 md:mt-0 text-center">ⓒ 2022 영선산업™.All rights reserved</span>
      </form>
    </footer>
  );
}

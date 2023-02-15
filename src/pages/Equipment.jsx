import React from "react";
import sohanRed from "../image/sohanRed.jpeg";
import sohanBlue from "../image/sohanBlue.jpeg";
import sohanBlack from "../image/sohanBlack.jpeg";
import post from "../image/post.jpeg";

const products = [
  {
    name: "소언한복",
    image: sohanRed,
  },
  {
    name: "소언한복",
    image: sohanBlue,
  },
  {
    name: "소언한복",
    image: sohanBlack,
  },
  {
    name: "우정사업본부",
    image: post,
  },
];

function Equipment() {
  return (
    <div className="wrap">
      <div className="eq_bg h-[30vh] md:h-[18.75rem] overflow-hidden">
        <div className="area px-3.5 xl:px-0 mb-20">
          <p className="pt-10 sm:pt-20 text-3xl leading-[2.8rem] text-blue pb-5 font-bold">포트폴리오</p>
          <span className="text-subgray leading-[1.8rem] text-over-ellipsis">
            영선산업은 이미지 홍보 단체 상품에 기업의 아이덴티티를 녹여내어
            <br />
            외적 이미지 및 기업이 주는 인상에 크게 기여할 수 있는 최상급 품질의 상품을 제작해드립니다.
          </span>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product, i) => (
              <div key={i} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.image}
                    alt="imagetie"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="/">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equipment;

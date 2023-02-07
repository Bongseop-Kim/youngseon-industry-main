import { Map, MapMarker } from "react-kakao-maps-sdk";
// import mapBg from "../image/mapBg.png";

function HomeMap() {
  return (
    <>
      <div className="wrap">
        <div className="hm_bg h-[30vh] md:h-[18.75rem] overflow-hidden">
          <div className="area px-3.5 xl:px-0">
            <p className="pt-10 sm:pt-20 md:pt-28 text-3xl leading-[2.8rem] text-blue pb-5 font-bold">오시는 길</p>
            <span className="text-subgray leading-[1.8rem] text-over-ellipsis">
              영선산업은 가양네거리 근처
              <br />
              큰길거리에 위치하여 쉽게 찾아오실 수 있습니다.
            </span>
          </div>
        </div>
      </div>
      {/* 본문 시작 */}
      <div className="area pt-16 md:pb-48 sm:pb-32 pb-16">
        <div>
          <article className="grid sm:grid-cols-[1.5fr_1fr] px-3.5 xl:px-0 gap-12 sm:gap-4">
            <dl className="text-lg leading-8">
              <h6 className="text-blue font-bold pb-4 sm:pb-8 text-center sm:text-left">주소</h6>
              <div className="flex flex-col sm:flex-auto items-center sm:items-baseline">
                <dt className="font-bold md:w-24 sm:pr-3">지번 주소</dt>
                <dd className="text-base">대전 동구 가양2동 408-7</dd>
              </div>
              <div className="flex flex-col sm:flex-auto items-center sm:items-baseline">
                <dt className="font-bold md:w-24 sm:pr-3 mt-2">도로명 주소</dt>
                <dd className="text-base">대전 광역시 동구 우암로 246번길 9-16</dd>
              </div>
            </dl>
            <dl className="text-lg leading-8">
              <h6 className="text-blue font-bold pb-4 sm:pb-8 text-center sm:text-left">연락처</h6>
              <div className="flex flex-col sm:flex-auto items-center sm:items-baseline">
                <dt className="font-bold md:w-24 sm:pr-3">전화</dt>
                <dd className="text-base">010-4945-7422</dd>
              </div>
              <div className="flex flex-col sm:flex-auto items-center sm:items-baseline">
                <dt className="font-bold md:w-24 sm:pr-3 mt-2">팩스</dt>
                <dd className="text-base">042-632-4442</dd>
              </div>
            </dl>
          </article>

          <div className="pt-16 md:pt-10 px-3.5 xl:px-0">
            <Map center={{ lat: 36.34416288797099, lng: 127.44461677147773 }} style={{ width: "100%", height: "40vh" }}>
              <MapMarker position={{ lat: 36.34416288797099, lng: 127.44461677147773 }}></MapMarker>
            </Map>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeMap;

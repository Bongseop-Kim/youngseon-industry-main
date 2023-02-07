import { Link } from "react-router-dom";
import logo from "../image/logobol.png";

export default function Gnb() {
  // const [navbar, setNavbar] = useState(false);

  return (
    <nav className="area flex justify-between items-center py-3 px-3.5 xl:px-0">
      <div className="ml-[-.5rem]">
        <Link to="/" className="pr-2.5 flex items-center">
          <img src={logo} alt="logo" className="w-6" />
          <span className="text-lg font-bold pl-2.5 hidden sm:block">영 선 산 업</span>
        </Link>
      </div>

      <ul className="flex flex-1 list-none justify-between flex-wrap w-[25rem] sm:flex-initial text-sm sm:text-base">
        <li>
          <Link to="/design">디자인</Link>
        </li>
        <li>
          <Link to="/map" className="navBar_menu_menu">
            오시는 길
          </Link>
        </li>
        <li>
          <Link to="/equipment" className="navBar_menu_menu">
            포트폴리오
          </Link>
        </li>
        <li>
          <Link to="/contact" className="navBar_menu_menu">
            견적 문의
          </Link>
        </li>
      </ul>

      <button id="menu-btn" class="block hamberger md:hidden focus:outline-none">
        <span class="hamberger-top"></span>
        <span class="hamberger-middle"></span>
        <span class="hamberger-bottom"></span>
      </button>
    </nav>
  );
}

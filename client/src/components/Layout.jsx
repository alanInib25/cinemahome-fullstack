//react-router-dom
import { Outlet } from "react-router-dom";

//components
import Header from "./header/Header";

//css
import "../../style.css";

function Layout() {

  return (
    <div className="layout-container">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

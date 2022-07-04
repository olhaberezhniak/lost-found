import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MyRequirements from "./EditMyRequirement";
import MyLostFoundItems from "./MyLostFoundItems";
import MyBuySellItems from "./MyBuySellItems";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout() {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route
            exact
            path="/myOwnBuySellItems"
            element={<MyBuySellItems />}
          />
          <Route
            exact
            path="/myOwnLostFoundItems"
            element={<MyLostFoundItems />}
          />
          <Route
            exact
            path="/myOwnRequirements"
            element={<MyRequirements />}
          />
        </Routes>
      </Sidebar>
    </Router>
  );
}

export default Layout;

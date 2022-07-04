import Dcards from "../components/Dashboard/DashboardCards";

import "../components/Dashboard/DashboardCards.css";
import Navbar from "../components/Appbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar visibleSearch={false} />
      <div className="cont-dashboard">
        <Dcards />
      </div>
    </>
  );
};

export default Dashboard;

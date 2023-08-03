import Auction from "../components/Auction";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Auction />
    </div>
  );
};

export default DashboardPage;

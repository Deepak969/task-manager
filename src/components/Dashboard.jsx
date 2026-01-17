import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TaskList from "../components/task/TaskList";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <main className="nxl-container">
        <div className="nxl-content">

          {/* Page Header */}
          <div className="page-header">
            <h5>Dashboard</h5>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <TaskList />
          </div>

        </div>
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;

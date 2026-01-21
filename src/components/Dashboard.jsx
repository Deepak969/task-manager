import DashboardLayout from "./layout/DashboardLayout";
import TaskList from "../components/task/TaskList";

const Dashboard = () => {
  return (
    <DashboardLayout title="Task List">
      <TaskList />
    </DashboardLayout>
  );
};

export default Dashboard;

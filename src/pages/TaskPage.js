import DashboardLayout from "../components/layout/DashboardLayout";
import MyTaskList from "../components/task/MyTaskList";

const TaskPage = () => {
  return (
    <DashboardLayout title="My Assigned Tasks">
      <MyTaskList />
    </DashboardLayout>
  );
};

export default TaskPage;
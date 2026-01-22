import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import TaskDetailsModal from "./TaskDetailsModal";

const MyTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  // ✅ Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  /* -----------------------------------
     AUTH USER
  ----------------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsub();
  }, []);

  /* -----------------------------------
     FETCH TASKS
  ----------------------------------- */
  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const q = query(
        collection(db, "tasks"),
        where("assignedTo", "==", userId)
      );

      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setTasks(list);
    } catch (err) {
      console.error("Task fetch error:", err);
    }
  };

  /* -----------------------------------
     OPEN MODAL
  ----------------------------------- */
  const openModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShowModal(true);
  };

  return (
    <div className="main-content">
      <div className="row g-4">

        {tasks.length === 0 ? (
          <div className="col-12 text-center text-muted py-5">
            No tasks found
          </div>
        ) : (
          tasks.map((task) => (
            <div className="col-xxl-3 col-lg-4 col-md-6" key={task.id}>
              <div className="card stretch stretch-full h-100">
                <div className="card-body">

                  {/* HEADER */}
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <h6 className="fw-bold">{task.taskName}</h6>
                      <p className="fs-12 text-muted">
                        {task.taskDescription}
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="fs-12 text-muted mb-2">
                    <i className="feather-mail me-1"></i>
                    {task.email}
                  </div>

                  {/* DATE */}
                  <div className="fs-12 text-muted mb-3">
                    {task.createdAt?.seconds
                      ? new Date(task.createdAt.seconds * 1000).toDateString()
                      : "-"}
                  </div>

                  {/* STATUS */}
                  <span className={`badge mb-3 d-inline-block
                    ${task.status === "Completed"
                      ? "bg-success"
                      : "bg-primary"}
                  `}>
                    {task.status}
                  </span>

                  {/* ACTION */}
                  {task.status !== "Completed" && (
                    <button
                      className="btn btn-outline-success btn-sm w-100 mt-3"
                      onClick={() => openModal(task.id)}
                    >
                      Update Task
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))
        )}

      </div>

      {/* ✅ MODAL COMPONENT */}
      <TaskDetailsModal
        show={showModal}
        taskId={selectedTaskId}
        onClose={() => setShowModal(false)}
        onUpdated={fetchTasks}
      />
    </div>
  );
};

export default MyTaskList;

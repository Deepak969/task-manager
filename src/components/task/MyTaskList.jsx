import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const MyTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in UID:", user.uid);
        setUserId(user.uid);
      }
    });
    return () => unsub();
  }, []);

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
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTasks(list);
    } catch (err) {
      console.error("Task fetch error:", err);
    }
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

                  {/* Header */}
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="d-flex gap-3 align-items-center">
                      <div className="avatar-text avatar-lg bg-gray-200">
                        <i className="feather feather-clipboard"></i>
                      </div>

                      <div>
                        <div className="fs-15 fw-bold text-dark text-truncate">
                          {task.taskName}
                        </div>
                        <div className="fs-12 text-muted text-truncate-2-line">
                          {task.taskDescription}
                        </div>
                      </div>
                    </div>                  
                  </div>

                  {/* Email */}
                  <div className="fs-12 text-muted mb-2">
                    <i className="feather feather-mail me-1"></i>
                    {task.email}
                  </div>
                
                  {/* Files */}
                  <div className="mb-3">
                    {task.files && task.files.length > 0 ? (
                      task.files.map((file, i) => (
                        <div key={i}>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fs-12 fw-semibold text-primary"
                          >
                            {file.name}
                          </a>
                        </div>
                      ))
                    ) : (
                      <span className="fs-12 text-muted">No files</span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="fs-11 text-muted">
                      {task.createdAt?.seconds
                        ? new Date(
                          task.createdAt.seconds * 1000
                        ).toLocaleDateString()
                        : "—"}
                    </span>

                    <span
                      className={`badge ${task.status === "Completed"
                          ? "bg-soft-success text-success"
                          : task.status === "Assigned"
                            ? "bg-soft-primary text-primary"
                            : task.status === "In Progress"
                              ? "bg-soft-warning text-warning"
                              : "bg-soft-secondary text-secondary"
                        }`}
                    >
                      {task.status}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          ))
        )}
      </div>     
    </div>
  );
};

export default MyTaskList;

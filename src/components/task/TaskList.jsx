import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");

  // 🔹 Fetch Tasks
  const fetchTasks = async () => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const taskList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTasks(taskList);
  };

  // 🔹 Fetch Users (role = user)
  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const userList = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((u) => u.role === "user");

    setUsers(userList);
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // 🔹 Assign Task
  const assignTask = async () => {
    if (!selectedTaskId || !selectedUserId) return;

    const user = users.find((u) => u.id === selectedUserId);

    await updateDoc(doc(db, "tasks", selectedTaskId), {
      assignedTo: user.id,
      assignedUserName: user.name,
      status: "Assigned",
    });

    setSelectedTaskId(null);
    setSelectedUserId("");
    fetchTasks();
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

                    {/* Action */}
                    {!task.assignedTo && (
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-light"
                          data-bs-toggle="dropdown"
                        >
                          <i className="feather feather-more-vertical"></i>
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => setSelectedTaskId(task.id)}
                            >
                              <i className="feather feather-user-plus me-2"></i>
                              Assign Task
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="fs-12 text-muted mb-2">
                    <i className="feather feather-mail me-1"></i>
                    {task.email}
                  </div>

                  {/* Assigned User */}
                  {task.assignedUserName && (
                    <div className="fs-11 text-success mb-2">
                      <i className="feather feather-user me-1"></i>
                      Assigned to {task.assignedUserName}
                    </div>
                  )}

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

                  {/* COMPLETION DETAILS (ADMIN VIEW) */}
                  {task.status === "Completed" && (
                    <div className="border-top pt-3 mt-3">

                      <div className="fs-12 fw-semibold text-success mb-1">
                        <i className="feather-check-circle me-1"></i>
                        Task Completed
                      </div>

                      {task.completionDescription && (
                        <p className="fs-12 text-muted mb-2">
                          {task.completionDescription}
                        </p>
                      )}

                      {task.completionFile && (
                        <a
                          href={task.completionFile.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="feather-eye me-1"></i>
                          View Proof
                        </a>
                      )}

                      <div className="fs-11 text-muted mt-2">
                        Completed on:{" "}
                        {task.completedAt?.seconds
                          ? new Date(task.completedAt.seconds * 1000).toLocaleDateString()
                          : "-"}
                      </div>

                    </div>
                  )}

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

      {/* ASSIGN MODAL */}
      {selectedTaskId && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Assign Task</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedTaskId(null)}
                />
              </div>

              <div className="modal-body">
                <select
                  className="form-select"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedTaskId(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={assignTask}>
                  Assign
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const TaskDetailsModal = ({ show, taskId, onClose, onUpdated }) => {
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && taskId) fetchTask();
  }, [show, taskId]);

  const fetchTask = async () => {
    const snap = await getDoc(doc(db, "tasks", taskId));
    if (snap.exists()) setTask(snap.data());
  };

  const uploadFile = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("files[]", file);

    const res = await fetch("https://data.upgov.net/api/upload.php", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    return data.files?.[0] || null;
  };

  const submit = async () => {
    try {
      setLoading(true);
      const uploadedFile = await uploadFile();

      await updateDoc(doc(db, "tasks", taskId), {
        status: "Completed",
        completionDescription: description,
        completionFile: uploadedFile,
        completedAt: serverTimestamp()
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Update Task</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <h6>{task?.taskName}</h6>
              <p className="text-muted">{task?.taskDescription}</p>

              <div className="mb-3">
                <label className="form-label">Completion Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Proof</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={submit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Mark Completed"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default TaskDetailsModal;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const TaskPage = () => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [email, setEmail] = useState("");
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskName || !taskDescription || !email) return;

        try {
            // 🔹 Upload files to cPanel
            const uploadedFiles = [];

            if (files.length > 0) {
                const formData = new FormData();

                for (const file of files) {
                    formData.append("files[]", file);
                }

                const response = await fetch(
                    "https://data.upgov.net/api/upload.php",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const result = await response.json();

                if (!result.success) {
                    throw new Error("File upload failed");
                }

                uploadedFiles.push(...result.files);
            }

            // 🔹 Save to Firestore
            await addDoc(collection(db, "tasks"), {
                taskName,
                taskDescription,
                email,
                files: uploadedFiles,
                status: "Pending",
                assignedTo: null,
                createdAt: serverTimestamp(),
            });

            alert("✅ Task saved successfully");

            setTaskName("");
            setTaskDescription("");
            setEmail("");
            setFiles([]);

        } catch (error) {
            console.error("Error:", error);
            alert("❌ Task save failed");
        }
    };

    return (
        <div className="main-content">
            <div className="container-fluid">
                {/* Center Wrapper */}
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-9">

                        <div className="card stretch stretch-full mt-5">
                            <div className="card-body">

                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h4 className="fw-bold mb-0">
                                        Create New Task
                                    </h4>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>

                                    {/* Task Name */}
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Task Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter task name"
                                            value={taskName}
                                            onChange={(e) => setTaskName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Task Description */}
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Task Description <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Enter task description"
                                            value={taskDescription}
                                            onChange={(e) => setTaskDescription(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="example@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Attach Files
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            multiple
                                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                            onChange={(e) => setFiles(e.target.files)}
                                        />
                                        {files.length > 0 && (
                                            <small className="text-muted">
                                                {files.length} file(s) selected
                                            </small>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-flex gap-2 mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-40"
                                        >
                                            Save Task
                                        </button>

                                    </div>

                                </form>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TaskPage;

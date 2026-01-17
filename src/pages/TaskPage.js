import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { db, storage, auth } from "../firebase";

import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from "@mui/material";

function TaskPage() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth).catch(console.error);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Sample tasks
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));

    const taskList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setTasks(taskList);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!taskName || !taskDescription || !email) return;

  try {
    // 🔹 Upload files
    const uploadedFiles = [];

    for (const file of files) {
      const fileRef = ref(storage, `tasks/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      uploadedFiles.push({
        name: file.name,
        url
      });
    }

    // 🔹 Save task to Firestore
    await addDoc(collection(db, "tasks"), {
      taskName,
      taskDescription,
      email,
      files: uploadedFiles,
      status: "Pending",
      createdAt: serverTimestamp()
    });

    // 🔹 Update UI
    setTasks([
      ...tasks,
      {
        taskName,
        taskDescription,
        email,
        files: uploadedFiles.map((f) => f.name),
        status: "Pending"
      }
    ]);

    // 🔹 Reset form
    setTaskName("");
    setTaskDescription("");
    setEmail("");
    setFiles([]);

    alert("Task saved successfully!");
  } catch (error) {
    console.error("Error saving task:", error);
    alert("Failed to save task");
  }
};




  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #e4e8ef)",
        py: 6
      }}
    >
      <Container maxWidth="md">
        {/* Task Form */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Typography variant="h5" align="center" fontWeight={600} mb={3}>
            Create Task
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Task Name"
              fullWidth
              margin="normal"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />

            <TextField
              label="Task Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />

            <TextField
              label="Email ID"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
              Upload Files
              <input
                type="file"
                hidden
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => setFiles(e.target.files)}
              />
            </Button>

            {files.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {files.length} file(s) selected
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 3
              }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Save Task
              </Button>

              <Button
                variant="outlined"
                fullWidth
                size="large"
                sx={{ borderRadius: 2 }}
                onClick={() => window.history.back()}
              >
                Back
              </Button>


            </Box>
          </form>
        </Paper>

        {/* Task Table */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Task List
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Task Name</b></TableCell>
                  <TableCell><b>Description</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Files</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.taskName}</TableCell>
                      <TableCell>{task.taskDescription}</TableCell>
                      <TableCell>{task.email}</TableCell>

                      {/* Files */}
                      <TableCell>
                        {task.files && task.files.length > 0 ? (
                          task.files.map((file, i) => (
                            <Typography
                              key={i}
                              variant="body2"
                              color="primary"
                              sx={{ cursor: "pointer" }}
                              onClick={() => window.open(file.url, "_blank")}
                            >
                              {file.name}
                            </Typography>
                          ))
                        ) : (
                          "—"
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Chip
                          label={task.status}
                          color={statusColor(task.status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}

export default TaskPage;

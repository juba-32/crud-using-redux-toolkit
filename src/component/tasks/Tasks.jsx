import "../tasks/Tasks.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTask, DeleteTask, EditTask } from "../redux/TodoSlice";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
export default function Tasks() {
  const [taskname, setTaskname] = useState("");
  const [taskcontent, setTaskcontent] = useState("");
  const [isUpdating, setIsupdating] = useState(false);
  const [task, setTask] = useState(null);

  const dispatch = useDispatch();
  const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

  const taskList = useSelector((state) => state.tasks.taskList);
  const handleTaskName = (e) => {
    setTaskname(e.target.value);
  };

  const handleTaskContent = (e) => {
    setTaskcontent(e.target.value);
  };

  const handleSubmit = (e) => {
    if (isUpdating) {
      e.preventDefault();
      dispatch(
        EditTask({
          ...task,
          taskname: taskname,
          taskcontent: taskcontent,
        })
      );

      setIsupdating(false);
      setTaskname("");
      setTaskcontent("");
    } else {
      e.preventDefault();
      dispatch(AddTask({ id: uniqueId(), taskname, taskcontent }));
      setTaskname("");
      setTaskcontent("");
    }
  };

  return (
    <div className="container">
      <h2>create task</h2>
      <div className="form">
        <form action="submit">
          <TextField
            onChange={handleTaskName}
            value={taskname}
            id="outlined-basic"
            label="Task Name"
            variant="outlined"
            multiline
            maxRows={8}
          />
          <TextField
            onChange={handleTaskContent}
            value={taskcontent}
            id="outlined-basic"
            label="Task Content"
            variant="outlined"
            multiline
            maxRows={8}
          />
        </form>
        
        <Button
          onClick={handleSubmit}
          disabled={!taskname || !taskcontent}
          variant="contained"
        >
          {isUpdating ? "update" : "create"}
        </Button>
        
      </div>

      <h2>task list</h2>
      {taskList?.map((task) => (
        <div key={task.id} className="tasklist">
          <div className="task-content">
            <h3>{task.taskname}</h3>
            <p>{task.taskcontent}</p>
          </div>
          <div className="task-actions">
            <Button
              onClick={() => {
                dispatch(DeleteTask(task.id));
              }}
            >
              delete
            </Button>
            <Button
              onClick={() => {
                console.log(task);

                setIsupdating(true);
                setTask(task);
                setTaskname(task.taskname);
                setTaskcontent(task.taskcontent);
              }}
            >
              edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

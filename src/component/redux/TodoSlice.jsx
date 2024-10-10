import { createSlice } from "@reduxjs/toolkit";

export const Todoslice = createSlice({
  name: "tasks",
  initialState: {
    taskList: [],

  },
  reducers: {
    AddTask: (state, action) => {
      const newTask = action.payload;
      state.taskList.push(newTask);
    },
    DeleteTask: (state, action) => {
      const deleteTask = action.payload;
      state.taskList = state.taskList.filter((task) => task.id !== deleteTask);
    },
    EditTask: (state, action) => {
      const taskToUpdate = state.taskList.find(
        (task) => task.id === action.payload.id
      );
      
      if (taskToUpdate) {
        taskToUpdate.taskname = action.payload.taskname;
        taskToUpdate.taskcontent = action.payload.taskcontent;
      }
    },
  },
});
export const { AddTask, DeleteTask, EditTask } = Todoslice.actions;
export default Todoslice.reducer;

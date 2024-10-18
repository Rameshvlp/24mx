import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './App.css';

function App() {
  const { control, handleSubmit, reset } = useForm();
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = data;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, data]);
    }
    reset(); // Clear form fields after submission
  };

  const handleEdit = (index) => {
    const taskToEdit = tasks[index];
    setEditIndex(index);
    reset(taskToEdit); // Set the form fields with the task to edit
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <label>
            Title:
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <input type="text" {...field} required />
              )}
            />
          </label>
          <br />
          <label>
            Description:
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <input type="text" {...field} required />
              )}
            />
          </label>
          <br />
          <label>
            Deadline:
            <Controller
              name="deadline"
              control={control}
              defaultValue=""
              rules={{ required: 'Deadline is required' }}
              render={({ field }) => (
                <input type="date" {...field} required />
              )}
            />
          </label>
          <br />
          <button type="submit">
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>
      </div>

      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.deadline}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
  
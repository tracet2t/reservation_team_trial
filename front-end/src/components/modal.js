import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const Modal = ({ isOpen, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [priority, setPriority] = useState(task.priority || '');
  const [expiration, setExpiration] = useState(task.expiration || '');
  const [completed, setCompleted] = useState(task.completed);

  const handleSave = () => {
    onSave({
      id: task.id,
      title,
      description,
      dueDate,
      priority,
      expiration,
      completed,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md max-w-lg w-full">
        <h2 className="text-2xl mb-4">Edit Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border rounded p-2 mb-4 w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border rounded p-2 mb-4 w-full"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded p-2 mb-4 w-full"
        />
        <input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Priority"
          className="border rounded p-2 mb-4 w-full"
        />
        <input
          type="date"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          className="border rounded p-2 mb-4 w-full"
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            className="mr-2"
          />
          Completed
        </label>
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-gray-500 text-white mr-2">Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-500 text-white">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

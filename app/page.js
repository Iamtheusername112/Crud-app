'use client';

import { useState, useEffect } from 'react';

export default function TaskManager() {
  // Initialize tasks from localStorage or use default tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [notifications, setNotifications] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('crud-app-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        // If there's an error, use default tasks
        setDefaultTasks();
      }
    } else {
      // If no saved tasks, use default tasks
      setDefaultTasks();
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      try {
        localStorage.setItem('crud-app-tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
        addNotification('Error saving tasks to storage', 'error');
      }
    }
  }, [tasks]);

  // Function to set default tasks
  const setDefaultTasks = () => {
    const defaultTasks = [
      { id: 1, title: 'Learn React', description: 'Complete React tutorial', completed: false, priority: 'high' },
      { id: 2, title: 'Build CRUD App', description: 'Create a functional CRUD application', completed: false, priority: 'medium' },
      { id: 3, title: 'Deploy to Vercel', description: 'Deploy the application to production', completed: true, priority: 'low' }
    ];
    setTasks(defaultTasks);
  };

  // Notification functions
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // CREATE - Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        priority: newTask.priority
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', priority: 'medium' });
      addNotification(`Task "${task.title}" created successfully!`, 'success');
    }
  };

  // READ - Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // UPDATE - Toggle task completion
  const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    addNotification(
      `Task "${task.title}" marked as ${!task.completed ? 'completed' : 'pending'}!`, 
      'info'
    );
  };

  // UPDATE - Edit task
  const updateTask = (e) => {
    e.preventDefault();
    if (editingTask.title.trim()) {
      const originalTask = tasks.find(t => t.id === editingTask.id);
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? editingTask : task
      ));
      addNotification(`Task "${editingTask.title}" updated successfully!`, 'success');
      setEditingTask(null);
    }
  };

  // DELETE - Remove task
  const deleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    addNotification(`Task "${task.title}" deleted successfully!`, 'warning');
  };

  // DELETE - Clear all tasks
  const clearAllTasks = () => {
    if (tasks.length > 0) {
      setTasks([]);
      localStorage.removeItem('crud-app-tasks');
      addNotification('All tasks cleared successfully!', 'warning');
    }
  };

  // Utility function to save tasks to localStorage
  const saveTasksToStorage = (tasksToSave) => {
    try {
      localStorage.setItem('crud-app-tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      addNotification('Error saving tasks to storage', 'error');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-500 border-green-600';
      case 'warning': return 'bg-orange-500 border-orange-600';
      case 'info': return 'bg-blue-500 border-blue-600';
      case 'error': return 'bg-red-500 border-red-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      case 'error': return '✕';
      default: return '•';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`${getNotificationColor(notification.type)} text-white px-4 py-3 rounded-lg shadow-lg border-l-4 flex items-center gap-3 min-w-80 max-w-96 transform transition-all duration-300 ease-in-out animate-slide-in`}
          >
            <span className="text-lg font-bold">
              {getNotificationIcon(notification.type)}
            </span>
            <span className="flex-1 text-sm font-medium">
              {notification.message}
            </span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Task Manager - CRUD Application
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Data automatically saved to browser storage</span>
            </div>
          </div>

          {/* CREATE - Add Task Form */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Task</h2>
            <form onSubmit={addTask} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>
              <div className="flex gap-4 items-center">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>

          {/* Filter Controls and Actions */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Completed
              </button>
            </div>
            {tasks.length > 0 && (
              <button
                onClick={clearAllTasks}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear All Tasks
              </button>
            )}
          </div>

          {/* READ - Task List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Tasks ({filteredTasks.length})
            </h2>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No tasks found. Add a new task to get started!
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  className={`p-4 border rounded-lg transition-all ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}
                >
                  {editingTask && editingTask.id === task.id ? (
                    // UPDATE - Edit Form
                    <form onSubmit={updateTask} className="space-y-3">
                      <input
                        type="text"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <textarea
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      />
                      <div className="flex gap-2">
                        <select
                          value={editingTask.priority}
                          onChange={(e) => setEditingTask({...editingTask, priority: e.target.value})}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTask(null)}
                          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <h3 className={`text-lg font-medium ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                          }`}>
                            {task.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        {task.description && (
                          <p className={`ml-8 text-gray-600 ${
                            task.completed ? 'line-through' : ''
                          }`}>
                            {task.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => setEditingTask(task)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* CRUD Operations Summary */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">CRUD Operations Demonstrated:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div className="text-center">
                <div className="font-semibold text-green-600">CREATE</div>
                <div className="text-gray-600">Add new tasks</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">READ</div>
                <div className="text-gray-600">View & filter tasks</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-600">UPDATE</div>
                <div className="text-gray-600">Edit & toggle tasks</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-red-600">DELETE</div>
                <div className="text-gray-600">Remove tasks</div>
              </div>
            </div>
            <div className="text-center text-sm text-blue-700 bg-blue-100 p-2 rounded">
              <strong>✨ Persistence:</strong> All data is automatically saved to browser localStorage and restored on page refresh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

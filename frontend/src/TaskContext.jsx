import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasklevel, setTasklevel] = useState('1');
  const [completedCount, setCompletedCount] = useState(0);

  return (
    <TaskContext.Provider value={{ tasklevel, setTasklevel, completedCount, setCompletedCount }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskLevel() {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskLevel must be used within TaskProvider');
  }
  return context;
}

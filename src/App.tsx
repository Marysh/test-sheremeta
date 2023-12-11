import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import TasksPage from "./pages/TasksPage";
import {store} from "./store/store";

function App() {
  return (
      <Provider store={store}>
          <div className="container mx-auto max-w-screen-lg p-6">
              <TasksPage/>
          </div>
      </Provider>
  );
}

export default App;

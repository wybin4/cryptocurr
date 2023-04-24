import React from 'react';
import './App.css';
import { RateTable, TooltipProvider } from './components';
function App() {
  return (
    <div className="App">
      <TooltipProvider>
        <RateTable />
      </TooltipProvider>
    </div>
  );
}

export default App;

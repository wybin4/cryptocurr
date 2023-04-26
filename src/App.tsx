import React from 'react';
import './App.css';
import { RateTable, TooltipProvider } from './components';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <p className='cryptoText'>Топ криптовалюты по рыночной капитализации</p>
        <TooltipProvider>
          <RateTable />
        </TooltipProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;

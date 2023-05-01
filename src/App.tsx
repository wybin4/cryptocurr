import React from 'react';
import './App.css';
import { CurrencyDetails, RateTable, TooltipProvider } from './components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/"
              element={
                <TooltipProvider>
                  <p className='cryptoText'>Топ криптовалюты по рыночной капитализации</p>
                  <RateTable />
                </TooltipProvider>
              }
            />
          </Routes>
          <Routes>
            <Route path="/currencies/:name" element={<CurrencyDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;

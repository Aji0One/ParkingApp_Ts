import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import stateContext from './Context/MyContext';
import Dashboard from './Pages/Dashboard';
import Billing from './Pages/Billing';

export interface pDetail {
  // name: string;
  // vehicleNo: string;
  // time?: string;
  id: string
}
type arrProp = {
  id: string,
  name?: string,
  time?: string,
  vehicleNo?: string,
  active: boolean
}
function App() {
  const [pnum, setPNum] = useState<number | undefined>(0);
  const [arr, setArr] = useState<arrProp[]>([]);
  const [rnum, setRNum] = useState<number | undefined>();
  const [coll, setColl] = useState<pDetail[] | undefined>([]);
  return (

    <BrowserRouter>
      <stateContext.Provider value={{ pnum, setPNum, rnum, setRNum, coll, setColl, arr, setArr }}>
        {/* <ContextProvider> */}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/bill' element={<Billing />} />
        </Routes>
        {/* </ContextProvider> */}
      </stateContext.Provider>
    </BrowserRouter>

  );
}

export default App;

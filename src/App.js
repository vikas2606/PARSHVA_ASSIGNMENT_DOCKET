import React, { useState } from 'react';
import DocketForm from './components/DocketForm';
import DocketList from './components/DocketList';

function App() {
  const [dockets, setDockets] = useState([]);

  return (
    <div className="App">
      <DocketForm
        dockets={dockets}
        setDockets={setDockets}
      />
      <DocketList dockets={dockets} />
    </div>
  );
}

export default App;

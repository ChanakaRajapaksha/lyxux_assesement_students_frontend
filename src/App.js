import { useNavigate } from 'react-router-dom';

import './App.css';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Management System</h1>
        <button className='main_button' onClick={() => navigate('/students')}>Students</button>
      </header>
    </div>
  );
};

export default App;

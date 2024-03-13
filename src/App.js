import './App.css';
import { Dashboard } from './components /Dashboard/Dashboard';
import { Header } from './components /Header/Header';
import { NewTripContainer } from './components /NewTripContainer/NewTripContainer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/new-trip' element={<NewTripContainer />} />
      </Routes>
    </div>
  );
}

export default App;

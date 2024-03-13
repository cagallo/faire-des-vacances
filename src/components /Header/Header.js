import './Header.css';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <h1 className='title'>Faire Les Vacances</h1>
      <button onClick={() => navigate('/new-trip')}>New Trip</button>
    </header>
  );
};

import './App.css';
import { Route,Routes } from 'react-router-dom'
import Indexpage from './Indexpage';
import { Login } from './Login';
import { Signup } from './Signup';
import { Chat } from './Chat';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' index element={<Indexpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>

    </div>
  );
}

export default App;

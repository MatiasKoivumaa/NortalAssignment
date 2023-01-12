import { Routes, Route } from 'react-router-dom';
import './App.css';
import Employees from './components/Employees';
import Projects from './components/Projects';
import SingleEmployee from './components/SingleEmployee';
import Home from './components/Home';
import Navigation from './components/Navigation';
import AddEmployeeModal from './components/AddEmployeeModal';

function App() {
  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route path = '*' element = { <Home /> } />
        <Route path='/employees' element = { <Employees /> } />
        <Route path='/employees/:id' element = { <SingleEmployee /> } />
        <Route path='/projects' element = { <Projects /> } />
        <Route path='/temp' element = { <AddEmployeeModal /> } />
      </Routes>
    </div>
  );
}

export default App;

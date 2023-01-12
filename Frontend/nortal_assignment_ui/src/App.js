import { Routes, Route } from 'react-router-dom';
import './App.css';
import Employees from './components/Employees';
import Projects from './components/Projects';
import Home from './components/Home';
import Navigation from './components/Navigation';
import EmployeeProjects from './components/EmployeeProjects';
import ProjectEmployees from './components/ProjectEmployees';

function App() {
  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route path = '*' element = { <Home /> } />
        <Route path='/employees' element = { <Employees /> } />
        <Route path='/employees/:id' element = { <EmployeeProjects /> } />
        <Route path='/projects' element = { <Projects /> } />
        <Route path='/projects/:id' element = { <ProjectEmployees /> } />
      </Routes>
    </div>
  );
}

export default App;

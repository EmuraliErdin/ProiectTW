import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import AuthenticationForm from './components/AuthenticationForm'
import CreateAccForm from './components/CreateAccForm'
import NoTeamStudentForm from './components/NoTeamStudentForm'
import PageNotFoundForm from './components/PageNotFoundForm'
import StudentInterface from './components/StudentInterface';
import AddProjectForm from './components/AddProjectForm';
import ProfessorAddDeadlinesForm from './components/ProfessorAddDeadlinesForm';
import ProfessorInterface from './components/ProfessorInterface';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route  path="/" element={<AuthenticationForm/>}/>
      <Route  path="/sign-up" element={<CreateAccForm/>}/>
      <Route path="/student-without-team/:userID" element={<NoTeamStudentForm/>}/>
      <Route path="/student-interface/:userID" element={<StudentInterface/>}/>
      <Route path="/add-project/:userID" element={<AddProjectForm/>}/>
      <Route path="/professor-add-deadlines/:userID" element={<ProfessorAddDeadlinesForm/>}/>
      <Route path="/professor-interface/:userID" element={<ProfessorInterface/>}/>
      <Route path="*" element={<PageNotFoundForm/>}/>
   </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

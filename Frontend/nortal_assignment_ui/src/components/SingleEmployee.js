
import * as React from 'react';
import { useParams } from 'react-router-dom';

export default function Employees() {

    const [employee, setEmployee] = React.useState([]);
    const [projects, setProjects] = React.useState([]);
    const { id } = useParams();

    let url = 'https://localhost:7122/api/Employee/'+ id;

    React.useEffect(() => {
        (async () => {
          const response = await fetch(url);
          const responseData = await response.json();
          setEmployee(responseData);
          setProjects(responseData.projects)
        })();
      }, [url]);
  
    return (
      <div>
        {employee.firstName}
        {employee.lastName}
        {employee.jobTitle}
        {projects.map((project) => (
            project.projectName
        ))}
      </div>
    );
  }
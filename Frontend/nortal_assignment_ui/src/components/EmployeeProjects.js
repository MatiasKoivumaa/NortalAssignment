import * as React from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function EmployeeProjects() {

    const [employee, setEmployee] = React.useState([]);
    const [projects, setProjects] = React.useState([]);

    const { id } = useParams();
    const url = 'https://localhost:7122/api/Employee/'+id;
    
    React.useEffect(() => {
        (async () => {
          const response = await fetch(url);
          const responseData = await response.json();
          setEmployee(responseData);
          setProjects(responseData.projects)
        })();
    }, [url]);

    function deleteProject(projectId) {
      if (window.confirm('Are you sure?')) {
        fetch("https://localhost:7122/api/Employee/RemoveEmployeeFromProject/"+id+"/"+projectId, {
            method:'PUT',
            headers: {
                'Accept':'application/json'
            }
        })  
      }
    }
  
    return (
      <div className='container'>
        <h3 className='m-3 d-flex justify-content-center'>
            {employee.firstName}
            {"\n"}
            {employee.lastName}
            {"\n"}
            is listed in the following projects.
        </h3>
        <Table className='mt-4' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Project Name</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) =>
              <tr key={project.id}>
                <td>{project.projectName}</td>
                <td>
                  <ButtonToolbar>
                    <Button className='mr-2' variant='danger'
                      onClick={() => {
                        deleteProject(project.id);
                      }}>
                        Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
              )}
          </tbody>
        </Table>
      </div>
    );
  }
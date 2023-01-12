import * as React from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AddEmployeeToProjectModal from './AddEmployeeToProjectModal';

export default function ProjectEmployees() {

  //State variables
  const [project, setProject] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [addModalShow, setAddModalShow] = React.useState(false);

  const { id } = useParams();
  const url = 'https://localhost:7122/api/Project/' + id;

  //Functions for closing the modal
  let addModalClose = () => {
    setAddModalShow(false);
    window.location.reload();
  };

  React.useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const responseData = await response.json();
      setProject(responseData);
      setEmployees(responseData.employees)
    })();
  }, [url]);

  //Removing a employee from the course
  function deleteEmployee(employeeId) {
    if (window.confirm('Are you sure?')) {
      fetch("https://localhost:7122/api/Employee/RemoveEmployeeFromProject/" + employeeId + "/" + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json'
        }
      })
      window.location.reload();
    }
  }

  return (
    <div className='container'>
      <h3 className='m-3 d-flex justify-content-center'>
        {project.projectName}
        {"\n"}
        has the following employees listed in them.
      </h3>
      <Table className='mt-4' striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) =>
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.jobTitle}</td>
              <td>
                <ButtonToolbar>
                  <Button className='mr-2' variant='danger'
                    onClick={() => {
                      deleteEmployee(employee.id);
                    }}>
                    Delete
                  </Button>
                </ButtonToolbar>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <ButtonToolbar>
        <Button variant='primary'
          onClick={() => {
            setAddModalShow(true);
          }}
        >
          Add Employee To Project
        </Button>
        <AddEmployeeToProjectModal show={addModalShow} onHide={addModalClose} projectId={id} />
      </ButtonToolbar>
    </div>
  );
}
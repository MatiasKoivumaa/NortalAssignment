import * as React from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';

export default function Employees() {

  //State variables
  const [employees, setEmployees] = React.useState([]);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [id, setId] = React.useState([]);
  const [firstName, setFirstName] = React.useState([]);
  const [lastName, setLastName] = React.useState([]);
  const [jobTitle, setJobTitle] = React.useState([]);

  const navigate = useNavigate();
  const url = 'https://localhost:7122/api/Employee';

  //Functions for closing the modals
  let addModalClose = () => {
    setAddModalShow(false);
    window.location.reload();
  };
  let editModalClose = () => {
    setEditModalShow(false);
    window.location.reload();
  };

  React.useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const responseData = await response.json();
      setEmployees(responseData);
    })();
  }, [url]);

  //Deleting a employee
  function deleteEmployee(id) {
    if (window.confirm('Are you sure?')) {
      fetch(url + '/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      })
      window.location.reload();
    }
  }

  return (
    <div>
      <Table className='mt-4' striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) =>
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.jobTitle}</td>
              <td>
                <ButtonToolbar>
                  <Button className="me-4" variant='info'
                    onClick={() => {
                      navigate("/employees/" + employee.id);
                    }}>
                    Projects
                  </Button>

                  <Button className='me-4' variant='info'
                    onClick={() => {
                      setEditModalShow(true);
                      setId(employee.id);
                      setFirstName(employee.firstName);
                      setLastName(employee.lastName);
                      setJobTitle(employee.jobTitle);
                    }}>
                    Edit
                  </Button>

                  <Button variant='danger'
                    onClick={() => {
                      deleteEmployee(employee.id);
                    }}>
                    Delete
                  </Button>
                  <EditEmployeeModal show={editModalShow} onHide={editModalClose} id={id} firstName={firstName} lastName={lastName} jobTitle={jobTitle} />
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
          Add Employee
        </Button>
        <AddEmployeeModal show={addModalShow} onHide={addModalClose} />
      </ButtonToolbar>
    </div>
  );
}
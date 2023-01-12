import * as React from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';

export default function Employees() {

    const [employees, setEmployees] = React.useState([]);
    const [addModalShow,setAddModalShow] = React.useState(false);
    const [editModalShow,setEditModalShow] = React.useState(false);
    const [id, setId] = React.useState([]);
    const [firstName, setFirstName] = React.useState([]);
    const [lastName, setLastName] = React.useState([]);
    const [jobTitle, setJobTitle] = React.useState([]);

    const url = 'https://localhost:7122/api/Employee';
    let addModalClose = () => {setAddModalShow(false)};
    let editModalClose = () => {setEditModalShow(false)};

    React.useEffect(() => {
        (async () => {
          const response = await fetch(url);
          const responseData = await response.json();
          setEmployees(responseData);
        })();
    }, [url]);

    function deleteEmployee(id) {
      if (window.confirm('Are you sure?')) {
        fetch(url+'/'+id, {
            method:'DELETE',
            headers: {
                'Accept':'application/json'
            }
        })  
      }
    }
  
    return (
      <div>
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
                    <Button className='mr-2' variant='info'
                      onClick={() => {
                        setEditModalShow(true);
                        setId(employee.id);
                        setFirstName(employee.firstName);
                        setLastName(employee.lastName);
                        setJobTitle(employee.jobTitle);
                      }}>
                        Edit
                    </Button>
                    <Button className='mr-2' variant='danger'
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
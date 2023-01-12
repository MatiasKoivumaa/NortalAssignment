import * as React from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddProjectModal from './AddProjectModal';
import EditProjectModal from './EditProjectModal';

export default function Projects() {

    const [projects, setProjects] = React.useState([]);
    const [addModalShow,setAddModalShow] = React.useState(false);
    const [editModalShow,setEditModalShow] = React.useState(false);
    const [id, setId] = React.useState([]);
    const [projectName, setProjectName] = React.useState([]);

    const navigate = useNavigate();

    const url = 'https://localhost:7122/api/Project';
    let addModalClose = () => {setAddModalShow(false)};
    let editModalClose = () => {setEditModalShow(false)};
    
    React.useEffect(() => {
        (async () => {
          const response = await fetch(url);
          const responseData = await response.json();
          setProjects(responseData);
        })();
    }, [url]);

    function deleteProject(id) {
      if (window.confirm('Are you sure?')) {
        fetch(url+"/"+id, {
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
              <th>Project Name</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) =>
              <tr key={project.id}>
                <td>{project.projectName}</td>
                <td>
                  <ButtonToolbar>
                   <Button className='mr-2' variant='info'
                      onClick={() => {
                        navigate("/projects/"+project.id);
                      }}>
                        Employees
                    </Button>
                    <Button className='mr-2' variant='info'
                      onClick={() => {
                        setEditModalShow(true);
                        setId(project.id);
                        setProjectName(project.projectName);
                      }}>
                        Edit
                    </Button>
                    <Button className='mr-2' variant='danger'
                      onClick={() => {
                        deleteProject(project.id);
                      }}>
                        Delete
                    </Button>
                    <EditProjectModal show={editModalShow} onHide={editModalClose} id={id} projectName={projectName} />
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
            Add Project
          </Button>
          <AddProjectModal show={addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Projects() {

    const [projects, setProjects] = React.useState([]);
    const navigate = useNavigate();

    let url = 'https://localhost:7122/api/Project';

    React.useEffect(() => {
        (async () => {
          const response = await fetch(url);
          const responseData = await response.json();
          setProjects(responseData);
        })();
      }, [url]);
  
    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Project name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {projects.map((project) => (
                    <TableRow
                        key={project.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="employee">
                        {project.projectName}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => {
                        navigate("");
                      }}>
                        Details
                      </Button>
                    </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
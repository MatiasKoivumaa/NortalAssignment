import * as React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

export default function AddEmployeeToProjectModal(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://localhost:7122/api/Employee/'+event.target.employeeId.value+"/"+event.target.projectId.value, {
            method:'PUT',
            headers: {
                'Accept':'application/json'
            }
        })
        props.onHide();
    }
  
    return (
      <div className='container'>
        <Modal show={ props.show } size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Add Employee To Project
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='projectId'>
                                <Form.Label>Project Id</Form.Label>
                                <Form.Control type='text' name='projectId' required disabled defaultValue={props.projectId} placeholder='Project Id' />
                            </Form.Group>
                            <Form.Group controlId='employeeId'>
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control type='text' name='id' required placeholder='Employee Id' />
                            </Form.Group>
                            
                            <Form.Group>
                                <Button variant='primary' type='submit'>
                                    Add Employee To Project
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='danger' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
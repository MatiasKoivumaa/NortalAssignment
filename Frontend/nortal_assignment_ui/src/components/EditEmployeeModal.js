import * as React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

export default function EditEmployeeModal(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://localhost:7122/api/Employee', {
            method:'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: props.id,
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                jobTitle: event.target.jobTitle.value
            })
        })
    }
  
    return (
      <div className='container'>
        <Modal show={ props.show } size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Edit Employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='firstName'>
                                <Form.Label>First name</Form.Label>
                                <Form.Control type='text' name='firstName' required placeholder='First name' defaultValue={ props.firstName } />
                            </Form.Group>
                            <Form.Group controlId='lastName'>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type='text' name='lastName' required placeholder='Last name' defaultValue={ props.lastName } />
                            </Form.Group>
                            <Form.Group controlId='jobTitle'>
                                <Form.Label>Job title</Form.Label>
                                <Form.Control type='text' name='jobTitle' required placeholder='Job title' defaultValue={ props.jobTitle } />
                            </Form.Group>
                            <Form.Group>
                                <Button variant='primary' type='submit'>
                                    Edit Employee
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
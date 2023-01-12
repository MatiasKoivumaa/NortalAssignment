import * as React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

export default function AddProjectModal(props) {

    //Executes when user adds a new project
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://localhost:7122/api/Project', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: event.target.projectName.value
            })
        })
        props.onHide();
    }

    return (
        <div className='container'>
            <Modal show={props.show} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
                <Modal.Header>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Add Project
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId='projectName'>
                                    <Form.Label>Project name</Form.Label>
                                    <Form.Control type='text' name='projectName' required placeholder='Project name' />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Add Project
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
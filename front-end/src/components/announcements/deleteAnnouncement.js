import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './announcements.css';
// import '../../actions/announcement.js'

export default class deleteAnnouncement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            id: this.props.id,
            validated: false
        }
    }
    

    openDialog = () => {
        this.setState({dialogOpen: true});
    }

    closeDialog = () => {
        this.setState({dialogOpen: false});
    }

    onDelete = e => {
        e.preventDefault();
        console.log("deleted announcement id: " + this.state.id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.id }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/delete/' + this.state.id, requestOptions).then(response => response.json());

        const form = e.currentTarget;
        if (form.checkValidity()) {
            this.setState({ dialogOpen: false });
        }
        this.setState({validated: true});
    }

    onCancel = () => {
        this.closeDialog()
    }

    render() {
        return (
            <Modal
                size="lg"
                show={this.state.dialogOpen}
                onHide={this.closeDialog}
                backdrop="static"
                keyboard={false}
                centered
                scrollable={true}
            >
                <Modal.Header>
                <Modal.Title>Are you sure you want to delete this announcement?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="Form" className="bounds"
                        noValidate onSubmit={this.onDelete} 
                        validated={this.state.validated}>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" form="Form">
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

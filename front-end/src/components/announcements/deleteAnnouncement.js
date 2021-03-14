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
        }
    }
    

    openDialog = () => {
        this.setState({dialogOpen: true});
    }

    closeDialog = () => {
        this.setState({dialogOpen: false});
    }

    onDelete = () => {
        console.log("deleted announcement id: " + this.state.id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.id }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/delete/' + this.state.id, requestOptions)
        .then(() => {
            this.props.rerenderCallback();
        })
    }

    onCancel = () => {
        this.closeDialog()
    }

    render() {
        return (
            <Modal
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
                <Button variant="secondary" onClick={this.onCancel}
                        className="Cancel">
                    Cancel
                </Button>
                <Button variant="primary" 
                        className="Delete"
                        onClick={this.onDelete}>
                    Delete
                </Button>
                </Modal.Body>
            </Modal>
        )
    }
}

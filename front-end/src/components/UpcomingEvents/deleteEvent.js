import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Event.css';

export default class deleteEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            id: this.props.id,
        }
    }
    
    componentDidUpdate(previousProps) {
        if (previousProps !== this.props) {
            this.setState({
                id: this.props.id,
            })
        }
    }

    openDialog = () => {
        this.setState({dialogOpen: true});
    }

    closeDialog = () => {
        this.setState({dialogOpen: false});
    }

    onDelete = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.id }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/events/delete/' + this.state.id, requestOptions)
        .then(() => {
            this.setState({ dialogOpen: false});
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
                <Modal.Title>Are you sure you want to delete this event?</Modal.Title>
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

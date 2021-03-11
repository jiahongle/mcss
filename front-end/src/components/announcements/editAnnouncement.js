import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './announcements.css';
import './RTEStylings.css';
import ReactQuill from 'react-quill'; 
import "react-quill/dist/quill.snow.css";

// import '../../actions/announcement.js'

export default class editAnnouncement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            original_title: this.props.title,
            original_body: this.props.body,
            title: this.props.title,
            body: this.props.body,
            id: this.props.id,
            validated: false
        }
    }

    RTEmodules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
            {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video', 'clean']
        ]
    }

    RTEformats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video', 'clean'
    ]
   

    openDialog = () => {
        this.setState({dialogOpen: true});
    }

    closeDialog = () => {
        this.setState({dialogOpen: false});
    }

    handleTitleChange = (event) => {
        this.setState({ 
            title: event.target.value
        });
    }

    // Handle changes in main event rich text editor for description
    handleRTEChange = (html) => {
        if (html !== "<p><br></p>") {
            this.setState({ body: html });
        }
    }

    onEdit = e => {
        e.preventDefault();
        console.log("Edited id: " + this.state.id);
        console.log("New title: " + this.state.title);
        console.log("New body: " + this.state.body);
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, body: this.state.body, id: this.state.id }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/update/' + this.state.id, requestOptions).then(response => response.json());
        const form = e.currentTarget;
        if (form.checkValidity()) {
            this.setState({ dialogOpen: false });
        }
        this.setState({validated: true});
    }

    onCancel = () => {
        this.closeDialog()
        this.setState({ validated: false,
                        title: this.state.original_title,
                        body: this.state.original_body })
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
                <Modal.Title>Edit Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="Form" className="bounds"
                        noValidate onSubmit={this.onEdit} 
                        validated={this.state.validated}>
                            <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="Title"
                                        type="text" placeholder="Announcement Title"
                                        value={this.state.title}
                                        onChange={this.handleTitleChange}
                                        required/>
                            <Form.Control.Feedback type="invalid">
                                A title is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <ReactQuill 
                                name="mainEventDescription"
                                onChange={this.handleRTEChange}
                                value={this.state.body}
                                modules={this.RTEmodules}
                                formats={this.RTEformats}
                                bounds={'.bounds'}
                                defaultValue={this.state.body}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" form="Form">
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

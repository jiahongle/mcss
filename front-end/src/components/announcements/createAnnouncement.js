import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RTEStylings.css';
import ReactQuill from 'react-quill'; 
import "react-quill/dist/quill.snow.css";

export default class createAnnouncement extends React.Component {
    state = {
        validated: false,
        dialogOpen: false,
        title: '',
        body: '',
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

    onSubmit = e => {
        e.preventDefault();
        console.log("submitted.");
        console.log(this.state.title);
        console.log(this.state.body);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, body: this.state.body }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/post', requestOptions).then(response => response.json());
        const form = e.currentTarget;
        if (form.checkValidity()) {
            this.setState({ dialogOpen: false });
        }
        this.setState({validated: true});
    }

    onCancel = () => {
        this.closeDialog()
        this.setState({ validated: false,
                        title: '',
                        body: '' })
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
                <Modal.Title>New Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="Form" className="bounds"
                        noValidate onSubmit={this.onSubmit} 
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
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

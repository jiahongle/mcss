import React from 'react'
import './composeEventDialog.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ImageUploader from 'react-images-upload';
import { BiListPlus } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import ReactQuill from 'react-quill'; 
import "react-quill/dist/quill.snow.css";

export default class ComposeEventDialog extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.isNew) {
            this.state = {
                dialogOpen: false,
                validated: false,
                mainEventTitle: '',
                mainEventTime: '',
                mainEventDescription: '',
                mainEventImages: [],
                mainEventSignupLink: '',
                subEvents: []
            };
        } else {
            this.state = {
                dialogOpen: false,
                validated: false,
                mainEventTitle: this.props.mainEventTitle,
                mainEventTime: this.props.mainEventTime,
                mainEventDescription: this.props.mainEventDescription,
                mainEventImages: [],
                mainEventSignupLink: this.props.mainEventSignupLink,
                subEvents: this.props.subEvents
            };
        }
    }
    
    monthStrings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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

    getTodaysDate = () => {
        let today = new Date().toISOString()
        let day = today.slice(8, 10)
        let year = today.slice(0, 4)
        let month = this.monthStrings[parseInt(today.slice(5, 7)) - 1]
        return `${month} ${day}, ${year} @ 1:00PM`
    }
    
    closeDialog = () => {
        this.setState({dialogOpen: false});
    }
    openDialog = () => {
        this.setState({dialogOpen: true});
    }

    postEvent = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(this.state.mainEventDescription)
        console.log(this.state.mainEventImages)
        console.log(this.state.subEvents)
        const form = event.currentTarget;
        if (form.checkValidity()) {
            
        }
        this.setState({validated: true});
        //Send date to server and closeDialog()
    }

    cancelPost = () => {
        this.closeDialog()
        this.setState({ validated: false,
                        mainEventTitle: '',
                        mainEventTime: '',
                        mainEventDescription: '',
                        mainEventImages: [],
                        mainEventSignupLink: '',
                        subEvents: []})
    }

    // Handle changes in main event title, time and signup link
    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        });
    }

    // Handle changes in main event rich text editor for description
    handleMainEventRTEChange = (html) => {
        if (html !== "<p><br></p>") {
            this.setState({ mainEventDescription: html });
        }
    }

    handleSubEventRTEChange = (html, i) => {
        let temp = this.state.subEvents
        temp[i].description = html
        this.setState({subEvents: temp})
        console.log(this.state.subEvents[i].description)
    }

    // Handle changes in sub-event title, time and signup link
    handleSubChange = (event, i) => {
        let temp = this.state.subEvents
        temp[i][event.target.name] = event.target.value
        this.setState({subEvents: temp})
    }

    // Handler for changes in images to upload 
    onDrop = (picture) => {
        this.setState({
            mainEventImages: picture,
        });
    }

    addSubEvent = () => {
        let newSubEvent = { title: '', 
                            time: '', 
                            description: '', 
                            signupLink: ''}
        let temp = this.state.subEvents
        temp.push(newSubEvent)
        this.setState({subEvents: temp})
        this.forceUpdate()
    }

    deleteSubEvent = (i) => {
        let temp = this.state.subEvents
        temp.splice(i, 1)
        this.setState({subEvents: temp})
        this.forceUpdate()
    }

    render() {
        return (
            <Modal
                size="lg"
                show={this.state.dialogOpen}
                onHide={this.cancelPost}
                backdrop="static"
                keyboard={false}
                centered
                scrollable={true}
            >
                <Modal.Header closeButton>
                <Modal.Title>New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="bounds" id="Form" 
                        noValidate onSubmit={this.postEvent} 
                        validated={this.state.validated}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="mainEventTitle"
                                          type="text" placeholder="Main event title"
                                          value={this.state.mainEventTitle}
                                          onChange={this.handleChange}
                                          required/>
                            <Form.Control.Feedback type="invalid">
                                A title is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event time</Form.Label>
                            <Form.Control name="mainEventTime"
                                          type="text"
                                          value={this.state.mainEventTime}
                                          onChange={this.handleChange}
                                          placeholder={this.getTodaysDate()}
                                          required/>
                            <Form.Control.Feedback type="invalid">
                                A date is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            {/* rich text editor */}
                            <ReactQuill 
                                name="mainEventDescription"
                                onChange={this.handleMainEventRTEChange}
                                value={this.state.mainEventDescription}
                                modules={this.RTEmodules}
                                formats={this.RTEformats}
                                bounds={'.bounds'}
                                defaultValue={this.state.mainEvenDescription}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Images</Form.Label>
                            <ImageUploader
                                withIcon={false}
                                buttonText='Upload images'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png']}
                                maxFileSize={5242880}
                                withPreview={true}
                                className="image-uploader"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Signup link (optional)</Form.Label>
                            <Form.Control name="mainEventSignupLink"
                                          type="text"
                                          value={this.state.mainEventSignupLink}
                                          onChange={this.handleChange}
                                          placeholder="None"/>
                        </Form.Group>
                        <Form.Group>
                            <div className="sub-event-banner">
                                <Form.Label>Sub-events (in chronological order)</Form.Label>
                                <BiListPlus className="plus-button" onClick={this.addSubEvent}/>
                            </div>
                        </Form.Group>
                        {this.state.subEvents.map((subEvent, i) => (
                            <div className="sub-event-container" key={i}>
                                <Form.Group>
                                    <div className="sub-event-banner">
                                        <Form.Label>Sub-event {i + 1} - title</Form.Label>
                                        <RiDeleteBinLine className="delete-button" 
                                                         onClick={() => this.deleteSubEvent(i)}/>
                                    </div>
                                    <Form.Control
                                        name="title"
                                        type="text" placeholder={`Sub-event ${i + 1} title`}
                                        value={this.state.subEvents[i].title}
                                        onChange={(event) => this.handleSubChange(event, i)}
                                        required/>
                                    <Form.Control.Feedback type="invalid">
                                        A title is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control
                                        name="time"
                                        type="text"
                                        value={subEvent.time}
                                        onChange={(event) => this.handleSubChange(event, i)}
                                        placeholder="mmm dd, yyyy @ tt:ttAM"
                                        required/>
                                    <Form.Control.Feedback type="invalid">
                                        A time is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <ReactQuill 
                                        onChange={(html) => this.handleSubEventRTEChange(html, i)}
                                        value={this.state.subEvents[i].description}
                                        modules={this.RTEmodules}
                                        formats={this.RTEformats}
                                        bounds={'.bounds'}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Signup Link (optional)</Form.Label>
                                    <Form.Control
                                        name="signupLink"
                                        type="text"
                                        value={this.state.subEvents[i].signupLink}
                                        onChange={(event) => this.handleSubChange(event, i)}
                                        placeholder="None"/>
                                </Form.Group>
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.cancelPost}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" form="Form">Post</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

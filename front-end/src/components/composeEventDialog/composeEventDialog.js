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
import { TiDelete } from 'react-icons/ti';

export default class ComposeEventDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            sending: false,
            validated: false,
            mainEventTitle: this.props.event.title,
            mainEventTime: this.props.event.time,
            mainEventDescription: this.props.event.description,
            id: this.props.event._id,
            mainEventImages: [],
            existingImages: JSON.parse(JSON.stringify(this.props.event.imgs)),
            deleteSequence: [],
            mainEventSignupLink: this.props.event.signup,
            subEvents: JSON.parse(JSON.stringify(this.props.event.subevents))
        }
    }

    componentDidUpdate(previousProps) {
        if (previousProps !== this.props) {
            console.log('prop updated')
            this.setState({
                mainEventTitle: this.props.event.title,
                mainEventTime: this.props.event.time,
                mainEventDescription: this.props.event.description,
                id: this.props.event._id,
                mainEventImages: [],
                existingImages: JSON.parse(JSON.stringify(this.props.event.imgs)),
                deleteSequence: [],
                mainEventSignupLink: this.props.event.signup,
                subEvents: JSON.parse(JSON.stringify(this.props.event.subevents))
            })
        }
    }
    
    monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
        console.log(this.props.event)
    }

    postEvent = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.currentTarget.checkValidity()) {
            const data = new FormData()
            for (var x = 0; x < this.state.mainEventImages.length; x++) {
                data.append('file', this.state.mainEventImages[x])
            }
            data.append('title', this.state.mainEventTitle);
            data.append('time', this.state.mainEventTime);
            data.append('description', this.state.mainEventDescription);
            data.append('signup', this.state.mainEventSignupLink);

            for (var x = 0; x < this.state.subEvents.length; x++) {
                for (const key in this.state.subEvents[x]) {
                    data.append(`sub${key}`, this.state.subEvents[x][key])
                }
            }
            const requestOptions = {
                method: 'POST',
                body: data,
                mode: 'cors',
            };
            this.setState({sending: true})
            fetch('http://localhost:5000/events/post', requestOptions).then(response => {
                if (response.status === 200) {
                    this.closeDialog()
                    this.setState({
                        validated: false,
                        mainEventTitle: '',
                        mainEventTime: '',
                        mainEventDescription: '',
                        mainEventImages: [],
                        mainEventSignupLink: '',
                        subEvents: []
                    })
                    this.props.rerenderCallback();
                } else {
                    console.log(`Response status: ${response.status}`)
                }
                this.setState({sending: false})
            });
        } else {
            this.setState({validated: true})
        }
    }

    cancelPost = () => {
        this.closeDialog()
        if (this.state.isNew) {
            this.setState({ 
                validated: false,
                mainEventTitle: '',
                mainEventTime: '',
                mainEventDescription: '',
                mainEventImages: [],
                mainEventSignupLink: '',
                subEvents: []})
        } else {
            console.log('canceling edit')
            this.setState({
                validated: false,
                mainEventTitle: this.props.event.title,
                mainEventTime: this.props.event.time,
                mainEventDescription: this.props.event.description,
                id: this.props.event._id,
                mainEventImages: [],
                existingImages: JSON.parse(JSON.stringify(this.props.event.imgs)),
                deleteSequence:[],
                mainEventSignupLink: this.props.event.signup,
                subEvents: JSON.parse(JSON.stringify(this.props.event.subevents))
            })
            // console.log(this.state.subEvents)
            // console.log(this.props.event.title)
        }
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
        // console.log(this.state.subEvents[i].description)
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
                            signup: ''}
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

    removeExistingImg = (index) => {
        console.log(index)
        let tempImgs = this.state.existingImages;
        tempImgs.splice(index, 1);
        let tempSeq = this.state.deleteSequence;
        tempSeq.push(index);
        this.setState({existingImages: tempImgs, deleteSequence: tempSeq});
        this.forceUpdate();
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
                <Modal.Title>{this.props.isNew? "New Event": "Edit Event"}</Modal.Title>
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
                            <div className="image-group-border">
                            {
                                !this.props.isNew && <div className="existing-imgs-grid">
                                    {
                                        this.state.existingImages.map((img, i) => (
                                            <div className="existing-img" key={i}>
                                                <TiDelete className="delete-existing-img-button clickable" 
                                                    onClick={()=>{this.removeExistingImg(i)}}/>
                                                <img src={img.link}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            <ImageUploader
                                withIcon={false}
                                buttonText='Upload images'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.jfif']}
                                maxFileSize={5242880}
                                withPreview={true}
                                className="image-uploader"
                            />
                            </div>
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
                                        name="signup"
                                        type="text"
                                        value={this.state.subEvents[i].signup}
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
                    {
                        this.state.sending?
                            <Button className ="sending" variant="primary" type="submit" form="Form" disabled={true}>
                                {this.props.isNew? 'Posting': 'Saving'}
                            </Button>
                            :
                            <Button variant="primary" type="submit" form="Form">
                                {this.props.isNew? 'Post': 'Save'}
                            </Button>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

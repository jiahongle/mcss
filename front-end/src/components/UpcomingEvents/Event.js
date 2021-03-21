// Description: A specific event component, displaying the title, date, short description, a picture and along with
// some buttons to redirect to the events full page and to register.
import React from 'react'
import './Event.css'
import ReactQuill from 'react-quill'; 
import "react-quill/dist/quill.bubble.css";
import { TiDelete } from 'react-icons/ti';
import DeleteEvent from './deleteEvent.js'
import ComposeEventDialog from '../composeEventDialog/composeEventDialog'
import { FaChevronDown } from 'react-icons/fa'
import ImageGallery from 'react-image-gallery';
import { Link } from "react-router-dom";



/* Event function requires a title, date and description to be created */
class Event extends React.Component {
    deleteRef = React.createRef();
    editRef = React.createRef();

    constructor(props) {
        super(props);

        // Component is initially expanded
        this.state = { 
            isCollapsed: false,
            galleryImgs: props.event.imgs.map((img) => {
                return {
                    original: img.link
                }
            })
        };

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidUpdate(previousProps) {
        console.log("updated")
        if (previousProps !== this.props) {
            this.setState({galleryImgs: this.props.event.imgs.map((img) => {
                return {
                    original: img.link
                }
            })})
            this.forceUpdate()
        }
    }

    /* Toggles the state of the event between Collapsed and Expanded */
    toggleCollapse() {
        this.setState(
            state => ({
                isCollapsed: !state.isCollapsed,
            })
        )
    }

    onDelete = () => {
        this.deleteRef.current.openDialog();
    }

    onEdit = () => {
        this.editRef.current.openDialog();
    }

    gotoRegisterLink = () => {
        window.open(this.props.event.signup)
    }

    getEventTitle = () => {
        let l = this.props.event.subevents.length
        if (l == 1)
            return ` (${l} sub-event)`
        else if (l > 1)
            return ` (${l} sub-events)`
        return ''
    }

    render() {
        return (
            <>
            <DeleteEvent ref={this.deleteRef} id={this.props.event._id} rerenderCallback={this.props.rerenderCallback} />
            <ComposeEventDialog ref={this.editRef} event={this.props.event} rerenderCallback={this.props.rerenderCallback} isNew={false}/>
            {this.props.loggedIn &&
                <div className="admin-buttons">
                        <div className="Edit-Button" onClick={this.onEdit}> Edit </div>
                        <TiDelete className="delete-announcement-button clickable" onClick={this.onDelete}/>
                </div>
            }
            {!this.state.isCollapsed?
                <div className="home-event-expanded">
                    <div className="home-event-expanded-left">
                        <div>
                            <b className="home-expanded-title"> {`${this.props.event.title}${this.getEventTitle()}`} </b>
                            <p className="home-expanded-time"> {this.props.event.time} </p>
                        </div>
                        <div className="dick">
                            <div className="home-expanded-desc">
                                <ReactQuill
                                    className="home-quill"
                                    value={this.props.event.description}
                                    readOnly={true}
                                    theme={"bubble"}
                                />
                                <div className="last-line-spacer"/>
                            </div>
                            <div className="home-expanded-desc-fade"/>
                        </div>
                        <div className="event-buttons-area">
                            <div className="event-button LearnMore-Button">
                                <Link to={"eventdetail/" + this.props.event._id}> 
                                    Learn More 
                                </Link>
                            </div>
                            <div className="event-button Register-Button" onClick={this.gotoRegisterLink}> Register </div>
                        </div>
                    </div>
                    <div className="home-expanded-right">
                        <FaChevronDown className="Chevron-event clickable"
                            onClick={this.toggleCollapse} />
                        <div className="Inner-Picture-container">
                            <ImageGallery items={this.state.galleryImgs} 
                                        showThumbnails={false}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        showNav={false}
                                        autoPlay={true}/>
                        </div>
                    </div>
                </div>
            :
                <div className="home-event-collapsed">
                    <div className="home-collapsed-head">
                        <b className="home-collapsed-title"> {this.props.event.title} </b>
                        <p className="home-collapsed-time"> {this.props.event.time} </p>
                    </div>
                    <div className="home-collapsed-right">
                            <FaChevronDown className="Chevron-event chevron-right clickable"
                                onClick={this.toggleCollapse} />
                    </div>
                </div>
            }
            </>
        );
    }
}

export default Event;
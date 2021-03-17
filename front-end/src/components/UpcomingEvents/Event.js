// Description: A specific event component, displaying the title, date, short description, a picture and along with
// some buttons to redirect to the events full page and to register.
import React from 'react'
import './Event.css'
import ReactQuill from 'react-quill'; 
import "react-quill/dist/quill.bubble.css";
import { TiDelete } from 'react-icons/ti';
import DeleteEvent from './deleteEvent.js'
import { FaChevronDown } from 'react-icons/fa'
import ImageGallery from 'react-image-gallery';
// import "~react-image-gallery/styles/css/image-gallery.css";




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

    render() {
        return (
            <>
            <DeleteEvent ref={this.deleteRef} id={this.props.event._id} rerenderCallback={this.props.rerenderCallback} />
            {this.props.loggedIn &&
                <div className="admin-buttons">
                        <div className="Edit-Button" onClick={this.onEdit}> Edit </div>
                        <TiDelete className="delete-announcement-button" onClick={this.onDelete}/>
                </div>
            }
            {!this.state.isCollapsed?
                <div className="Expanded">
                    <div className="Expanded-Info">
                        <div className="Expanded-title-time">
                            <b className="Expanded-Title"> {this.props.event.title} </b>
                            <p className="Expanded-Date"> {this.props.event.time} </p>
                        </div>
                        <div className="dick">
                            <div className="Expanded-Desc">
                                <ReactQuill
                                    className="current-event-body"
                                    value={this.props.event.description}
                                    readOnly={true}
                                    theme={"bubble"}
                                />
                                <div className="last-line-spacer"/>
                            </div>
                            <div className="Expanded-Desc-fade"/>
                        </div>
                        <div className="Event-Buttons">
                            <div className="Button LearnMore-Button"> Learn More </div>
                            <div className="Button Register-Button"> Register </div>
                        </div>
                    </div>
                    <div className="Expanded-Picture-Button ">
                        {/* <div className="Expanded-Button"> */}
                        <FaChevronDown className="Chevron-event clickable"
                            onClick={this.toggleCollapse} />
                        <div className="Inner-Picture-container">
                            {/* <img 
                                src={this.props.event.imgs[0].link} /> */}
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
                <div className="Collapsed">
                    <div className="Collapsed-Text">
                        <b className="Collapsed-Title"> {this.props.event.title} </b>
                        <p className="Collapsed-Date"> {this.props.event.time} </p>
                    </div>
                    <div className="Collapsed-Button-Div">
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
import React from 'react'
import './SmallEventCard.css'
import ReactQuill from 'react-quill'; 
import "react-quill/dist/quill.bubble.css";
import { TiDelete } from 'react-icons/ti';
import DeleteEvent from './deleteEvent.js'
import ImageGallery from 'react-image-gallery';
import ComposeEventDialog from '../composeEventDialog/composeEventDialog.js'
import { Link } from "react-router-dom";



/* Event function requires a title, date and description to be created */
class SmallEventCard extends React.Component {
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
            <div>
            <DeleteEvent ref={this.deleteRef} id={this.props.event._id} rerenderCallback={this.props.rerenderCallback} />
            <ComposeEventDialog ref={this.editRef} 
                event={this.props.event} 
                rerenderCallback={this.props.rerenderCallback} 
                isNew={false}/>
            {this.props.loggedIn &&
                <div className="admin-buttons">
                        <div className="Edit-Button" onClick={this.onEdit}> Edit </div>
                        <TiDelete className="delete-announcement-button clickable" onClick={this.onDelete}/>
                </div>
            }
            <div className="ep-event-expanded">
                <div>
                    <b className="ep-expanded-title"> {`${this.props.event.title}${this.getEventTitle()}`} </b>
                </div>
                
                <div className="mid-section">
                    <div className="ep-left">
                        <p className="ep-expanded-time"> {this.props.event.time} </p>
                        <div className="dick">
                            <div className="ep-expanded-desc">
                                <ReactQuill
                                    className="ep-quill"
                                    value={this.props.event.description}
                                    readOnly={true}
                                    theme={"bubble"}
                                />
                                <div className="last-line-spacer"/>
                            </div>
                            <div className="ep-expanded-desc-fade"/>
                        </div>
                    </div>

                    <div className="ep-right">
                        <div className="gallery-container">
                            <ImageGallery items={this.state.galleryImgs} 
                                        showThumbnails={false}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        showNav={false}
                                        autoPlay={true}/>
                        </div>
                    </div>
                </div>
                

                <div className="small-event-buttons-area">
                    <div className="event-button LearnMore-Button"> 
                        <Link to={"eventdetail/" + this.props.event._id}>
                            Learn More 
                        </Link>
                    </div>

                    {this.props.event.signup? 
                        <div className="event-button Register-Button" 
                            onClick={this.gotoRegisterLink}> 
                            Register 
                        </div>
                        :
                        <div className="event-button Register-Button-disabled">
                            Register
                        </div>
                    }
                </div>
               
            </div>
            </div>
        );
    }
}

export default SmallEventCard;
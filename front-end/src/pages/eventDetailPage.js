import React from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import { withRouter } from "react-router";
import './eventDetailPage.css';
import ImageGallery from 'react-image-gallery';
import ReactQuill from 'react-quill'; 
import "react-quill/dist/quill.bubble.css";
import { BsChevronDown } from 'react-icons/bs'


class EventDetailPage extends React.Component {
    imageGallery = React.createRef()
    state = {
        event: null,
    }
    
    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchData(id)
    }

    fetchData = (id) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/events/' + id, requestOptions)
            .then((response) => response.json())
            .then(data => {
                let galleryImgs = data.data.imgs.map((img) => {
                    return {
                        original: img.link
                    }
                })
                this.setState({
                    event: data.data,
                    galleryImgs: galleryImgs
                })
            });
    }

    goBack = () => {
        this.props.history.goBack()
    }

    fullScreen = () => {
        this.imageGallery.current.fullScreen()
    }
    
    SubEvent = (subevent, ind) => {
        return (
            <div key={ind} className="subevent-box">
                <h5 className="subevent-title">{subevent.title}</h5>
                <p className="subevent-time"> {subevent.time}</p>
                <ReactQuill
                        className="event-detail-subevent-quill"
                        value={subevent.description}
                        readOnly={true}
                        theme={"bubble"}/>
                {subevent.signup && <div className="register-wrapper">
                    <div className="main-event-register-button subevent-register-button" 
                        onClick={() => window.open(subevent.signup)}> 
                        Register 
                    </div>
                </div>}
                <div className={ind == 0? "subevent-first-branch": "subevent-branch"}>
                    <div className = "subevent-branch-1">
                        <div className="subevent-branch-dot"/>
                    </div>
                </div>
            </div>
        )
    }

    render () {
        return (
            this.state.event != null &&
            <div>
                <div className="event-detail-page-content">
                    <div className="back-button" onClick={this.goBack}> Back </div>
                    <div className="event-detail-header">
                        <h2 className="event-page-title">{this.state.event.title}</h2>
                        <p className="event-detail-time"> {this.state.event.time}</p>
                    </div>
                    {this.state.event.subevents.length ==0?
                        <div className="event-detail-header">
                            <div className="gallery-wrapper">
                                <ImageGallery   ref={this.imageGallery}
                                                items={this.state.galleryImgs} 
                                                showThumbnails={false}
                                                showFullscreenButton={false}
                                                showPlayButton={false}
                                                showBullets
                                                onClick={this.fullScreen}/>
                            </div>
                            <ReactQuill
                                    className="event-detail-quill"
                                    value={this.state.event.description}
                                    readOnly={true}
                                    theme={"bubble"}/>
                            {this.state.event.signup && <div className="register-wrapper">
                                <div className="main-event-register-button" 
                                    onClick={() => window.open(this.state.event.signup)}> 
                                    Register 
                                </div>
                            </div>}
                        </div>
                        :
                        <div className="with-subevents">
                            <div className="with-subevents-left">
                                <div className="gallery-wrapper-left">
                                    <ImageGallery   ref={this.imageGallery}
                                                    items={this.state.galleryImgs} 
                                                    showThumbnails={false}
                                                    showFullscreenButton={false}
                                                    showPlayButton={false}
                                                    showBullets
                                                    onClick={this.fullScreen}/>
                                </div>
                                <ReactQuill
                                    className="event-detail-quill"
                                    value={this.state.event.description}
                                    readOnly={true}
                                    theme={"bubble"}/>
                                {this.state.event.signup && <div className="register-wrapper">
                                    <div className="main-event-register-button" 
                                        onClick={() => window.open(this.state.event.signup)}> 
                                        Register 
                                    </div>
                                </div>}
                            </div>
                            <div className="with-subevents-right">
                                {this.state.event.subevents.map((subevent, i) => (
                                    this.SubEvent(subevent, i)
                                ))}
                                <BsChevronDown className="time-line-arrow"/>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        );
    }
}

export default withRouter(EventDetailPage)
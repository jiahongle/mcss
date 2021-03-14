import React from 'react';
import './announcements.css';
import DeleteAnnouncement from './deleteAnnouncement.js'
import EditAnnouncement from './editAnnouncement.js'
import { TiDelete } from 'react-icons/ti';
import ReactQuill from 'react-quill'; 
import "react-quill/dist/quill.bubble.css";


export default class announcementPost extends React.Component {
    deleteRef = React.createRef();
    editRef = React.createRef();
    
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: props.loggedIn,
            id: props.details._id,
            title: props.details.title,
            date: props.details.createdAt,
            body: props.details.body,
            isCollapsed: props.isCollapsed
        }
    }

    
    componentDidUpdate(previousProps) {
        console.log("updated")
        if (previousProps !== this.props) {
            this.setState({
                loggedIn: this.props.loggedIn,
                id: this.props.details._id,
                title: this.props.details.title,
                body: this.props.details.body,
                date: this.props.details.createdAt,
                isCollapsed: this.props.isCollapsed
            })
        }
    }

    onDelete = () => {
        this.deleteRef.current.openDialog();
    }

    onEdit = () => {
        this.editRef.current.openDialog();
    }

    to12HourTime = (hour, minute) => {
        let h = hour % 12 == 0? 12: hour % 12
        let ampm = hour < 12? 'AM' : 'PM'
        return `${h}:${minute}${ampm}`
    }

    addComma = (date) => {
        return `${date.slice(0, -5)}, ${date.slice(-5)}`
    }

    render() {
        const d = new Date(this.state.date)
        const dateStr = this.addComma((d.toDateString()).slice(3)) + " at " + this.to12HourTime(d.getHours(), d.getMinutes())
        return (
            <>
                {this.state.loggedIn && <div className="admin-buttons">
                        <div className="Edit-Button" onClick={this.onEdit}> Edit </div>
                        <TiDelete type="submit" className="delete-announcement-button" onClick={this.onDelete}/>
                    </div>
                }
                    <div className="announcement-post" >
                        <EditAnnouncement ref={this.editRef} body={this.state.body} title={this.state.title} id={this.state.id} rerenderCallback={this.props.rerenderCallback} />
                        <DeleteAnnouncement ref={this.deleteRef} id={this.state.id} rerenderCallback={this.props.rerenderCallback} />

                    {this.state.isCollapsed?
                        <>
                            <p className="collapsed-title post-title"> {this.state.title} </p>
                            <p className="post-date">{dateStr}</p>
                        </>
                        :
                        <>
                            <p className="post-title"> {this.state.title} </p>
                            <p className="post-date"> {dateStr} </p>
                            <ReactQuill
                                className="post-body"
                                value={this.state.body}
                                readOnly={true}
                                theme={"bubble"}
                            />
                        </>   
                    }    
                    </div>
            </>
        )
    }
}
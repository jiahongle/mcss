import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import './announcements.css';
import DeleteAnnouncement from './deleteAnnouncement.js'
import EditAnnouncement from './editAnnouncement.js'

export default class announcementPost extends React.Component {
    deleteRef = React.createRef();
    editRef = React.createRef();
    
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: props.loggedIn,
            id: props.details._id,
            title: props.details.title,
            body: props.details.body
        }
    }

    onDelete() {
        this.deleteRef.current.openDialog();

        this.props.rerenderCallback();
    }

    onEdit() {
        this.editRef.current.openDialog();

        this.props.rerenderCallback();
    }

    render() {
        return (
            <div className="announcement-post" >
                <EditAnnouncement ref={this.editRef} body={this.state.body} title={this.state.title} id={this.state.id}/>
                <DeleteAnnouncement ref={this.deleteRef} id={this.state.id} />

                {   this.state.loggedIn && <div className="adminButtons">
                        <div className="Edit-Button" type="submit" value="Edit" onClick={() => this.onEdit()}> Edit </div>
                        <div className="Delete-Button" type="submit" value="X" onClick={() => this.onDelete()}> <strong>X</strong> </div>
                    </div>
                }
                <p className="post-text"> {this.state.title} </p>
                <p className="post-date"> <div dangerouslySetInnerHTML={{ __html: this.state.body }}></div></p>
            </div>
        )
    }
}
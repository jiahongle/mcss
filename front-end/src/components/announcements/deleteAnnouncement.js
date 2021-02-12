import React from 'react';
import './announcements.css';
// import '../../actions/announcement.js'

export default class deleteAnnouncement extends React.Component {
    state = {
        id: '',
    }

    onSubmit = e => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.id }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/delete/' + this.state.id, requestOptions).then(response => response.json());
    }

    render() {
        const { state } = this;


        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>Delete an announcement</b>

                </div>
                <div className="announcement-post">
                    <label>Id:
                        <input
                            type="text"
                            value={state.id}
                            onChange={e => this.setState({ id: e.target.value })}
                            className="announcement-input" />
                    </label>
                    <input type="submit" value="Submit" onClick={() => this.onSubmit()} />
                </div >
            </div >
        )
    }
}

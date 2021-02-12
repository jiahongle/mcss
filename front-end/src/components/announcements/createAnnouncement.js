import React from 'react';
import './announcements.css';
// import '../../actions/announcement.js'

export default class createAnnouncement extends React.Component {
    state = {
        title: '',
        body: '',
    }

    onSubmit = e => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, body: this.state.body }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/post', requestOptions).then(response => response.json());
    }

    render() {
        const { state } = this;


        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>Create an announcement</b>

                </div>
                <div className="announcement-post">
                    <div>
                        <label>Title
                        <input
                                type="text"
                                value={state.title}
                                onChange={e => this.setState({ title: e.target.value })}
                                className="announcement-input" />
                        </label>
                    </div>
                    <div>
                        <label > Body
                        <input
                                type="text"
                                value={state.body}
                                onChange={e => this.setState({ body: e.target.value })}
                                className="announcement-input" />
                        </label>
                        <input type="submit" value="Submit" onClick={() => this.onSubmit()} />
                    </div>
                </div >
            </div >
        )
    }
}

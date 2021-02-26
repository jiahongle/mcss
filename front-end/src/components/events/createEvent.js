import React from 'react';
import '../announcements/announcements.css';
import './events.css'

export default class createEvent extends React.Component {
    state = {
        title: '',
        body: '',
        creator: '',
        success: false
    }

    onSubmit = e => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, description: this.state.body, image: "empty", creator: this.state.creator }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/events/post', requestOptions).then(response => this.setState({
            title: '',
            body: '',
            creator: '',
            success: true
        }));
    }

    render() {
        const { state } = this;


        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>Create an event</b>

                </div>
                <div className="admin-event-post">
                    <div>
                        <label className="announcement-form">
                            <p className="announcement-p">Title: </p>
                            <input
                                type="text"
                                value={state.title}
                                onChange={e => this.setState({ title: e.target.value })}
                                className="event-input" />
                        </label>
                    </div>
                    <div>
                        <label className="announcement-form"> <p className="announcement-p">Body</p>
                            <input
                                type="text"
                                value={state.body}
                                onChange={e => this.setState({ body: e.target.value })}
                                className="event-input" />
                        </label>

                    </div>
                    <div>
                        <label className="announcement-form">
                            <p className="announcement-p">Creator: </p>
                            <input
                                type="text"
                                value={state.creator}
                                onChange={e => this.setState({ creator: e.target.value })}
                                className="announcement-input" />
                        </label>
                    </div>
                    <input type="submit" value="Submit" onClick={() => this.onSubmit()} />
                    {this.state.success && <p> Event has been created!</p>}
                </div >

            </div >
        )
    }
}

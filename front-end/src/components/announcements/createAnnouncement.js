import React from 'react';
import './announcements.css';
// import '../../actions/announcement.js'

export default class createAnnouncement extends React.Component {
    state = {
        title: '',
        body: '',
    }

    onSubmit = e => {
        console.log(this.state.title)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, body: this.state.body })
        };
        fetch('localhost:5000/post', requestOptions).then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        const { state } = this;


        return (
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
        )
    }
}

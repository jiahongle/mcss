import React from 'react';
import './announcements.css';
// import '../../actions/announcement.js'

export default class editAnnouncement extends React.Component {
    state = {
        title: '',
        body: '',
        id: '',
    }

    onSubmit = e => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, body: this.state.body, id: this.state.id }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/update/' + this.state.id, requestOptions).then(response => response.json());
    }

    render() {
        const { state } = this;


        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>Edit an announcement</b>

                </div>
                <div className="announcement-post">
                    <div>
                        <label className="announcement-form"><p className="announcement-p">Title:</p>
                            <input
                                type="text"
                                value={state.title}
                                onChange={e => this.setState({ title: e.target.value })}
                                className="announcement-input" />
                        </label>
                    </div>
                    <div>
                        <label className="announcement-form"> <p className="announcement-p">Body: </p>
                            <input
                                type="text"
                                value={state.body}
                                onChange={e => this.setState({ body: e.target.value })}
                                className="announcement-input" />
                        </label>

                    </div>
                    <div>
                        <label className="announcement-form"><p className="announcement-p">Id: </p>
                            <input
                                type="text"
                                value={state.id}
                                onChange={e => this.setState({ id: e.target.value })}
                                className="announcement-input" />
                        </label>
                        <input type="submit" value="Submit" onClick={() => this.onSubmit()} />
                    </div>
                </div >
            </div >
        )
    }
}

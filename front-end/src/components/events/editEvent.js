import React from 'react';
import '../announcements/announcements.css';

export default class editAnnouncement extends React.Component {
    state = {
        title: '',
        body: '',
        creator: '',
        id: '',
        success: false
    }

    onSubmit = e => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, description: this.state.body, id: this.state.id, creator: this.state.creator }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/events/update/' + this.state.id, requestOptions).then(response => this.setState({
            title: '',
            body: '',
            creator: '',
            id: '',
            success: true
        }));
    }

    render() {
        const { state } = this;


        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>Edit an event</b>

                </div>
                <div className="admin-event-edit-post">
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
                        <label className="announcement-form"> <p className="announcement-p">Body: </p>
                            <input
                                type="text"
                                value={state.creator}
                                onChange={e => this.setState({ creator: e.target.value })}
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
                    {this.state.success && <p> Event has been edited!</p>}
                </div >
            </div >
        )
    }
}

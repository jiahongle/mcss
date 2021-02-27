import React from 'react';
import '../announcements/announcements.css';
import './events.css'
export default class deleteEvent extends React.Component {
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
        fetch('http://localhost:5000/events/delete/' + this.state.id, requestOptions).then(response => this.setState({
            id: '',
            success: true
        }));
    }

    render() {
        const { state } = this;


        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>Delete an event</b>

                </div>
                <div className="admin-event-post">
                    <label>Id:
                        <input
                            type="text"
                            value={state.id}
                            onChange={e => this.setState({ id: e.target.value })}
                            className="announcement-input" />
                    </label>
                    <input type="submit" value="Submit" onClick={() => this.onSubmit()} />
                    {this.state.success && <p> Event has been deleted!</p>}
                </div >

            </div >
        )
    }
}

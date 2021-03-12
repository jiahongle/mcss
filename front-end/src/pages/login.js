import React from 'react';
import './login.css';
import CreateEvent from '../components/events/createEvent.js'
import DeleteEvent from '../components/events/deleteEvent.js'
import EditEvent from '../components/events/editEvent.js'

export default class Login extends React.Component {
    state = {
        title: '',
        body: '',
        success: false,
    }

    onLogout = e => {
        document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.removeItem('jwt')
        sessionStorage.removeItem('jwt')
    }
    onSubmit = e => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.title, password: this.state.body }),
            mode: 'cors',
            credentials: 'include'
        };
        fetch('http://localhost:5000/admins/login', requestOptions).then(response => {
            if (response.status === 200) {

                this.setState({ success: true, title: '', body: '' })
            }
        });
    }
    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include'
        };
        fetch('http://localhost:5000/admins/protected', requestOptions).then(response => {
            if (response.status === 200) {

                this.setState({ success: true })
            } else {
                console.log("no cookie found")
            }
        });
    }

    render() {
        const { state } = this;

        return (
            <div className="login-page">
                <div className="announcement-container" >
                    <div className="title-container">
                        <b>Login</b>

                    </div>
                    {!this.state.success && <div className="announcement-post">

                        <div>
                            <div>
                                <label className="announcement-form">
                                    <p className="announcement-p">Username: </p>
                                    <input
                                        type="text"
                                        value={state.title}
                                        onChange={e => this.setState({ title: e.target.value })}
                                        className="announcement-input" />
                                </label>
                            </div>
                            <div>
                                <label className="announcement-form"> <p className="announcement-p">Password</p>
                                    <input
                                        type="password"
                                        value={state.body}
                                        onChange={e => this.setState({ body: e.target.value })}
                                        className="announcement-input" />
                                </label>
                                <input type="submit" value="Submit" onClick={() => this.onSubmit()} />
                            </div>
                        </div>


                    </div >}
                    {
                        this.state.success && <div> <div className="post-text"> Success! </div>
                            <CreateEvent />
                            <DeleteEvent />
                            <EditEvent />
                            <input type="submit" value="Logout" onClick={() => this.onLogout()} />

                        </div >

                    }
                </div >
            </div>
        )
    }
}
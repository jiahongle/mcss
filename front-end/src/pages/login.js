import React from 'react';
import './login.css';

export default class Login extends React.Component {
    state = {
        title: '',
        body: '',
        success: false,
    }

    onSubmit = e => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.title, password: this.state.body }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/admins/login', requestOptions).then(response => {
            if (response.status === 200) {

                this.setState({ success: true, title: '', body: '' })
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
                    <div className="announcement-post">
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
                        {
                            this.state.success && <div className="post-text"> Success! </div>
                        }
                    </div >
                </div >
            </div>
        )
    }
}
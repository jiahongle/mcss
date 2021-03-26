import React from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router";


class Login extends React.Component {
    usernameField = React.createRef()
    passwordField = React.createRef()

    state = {
        title: '',
        body: '',
        success: false,
        attemptFailed: false
    }

    // onLogout = e => {
    //     document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //     localStorage.removeItem('jwt')
    //     sessionStorage.removeItem('jwt')
    // }

    onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.title && this.state.body) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.state.title, password: this.state.body }),
                mode: 'cors',
                credentials: 'include'
            };
            fetch('http://localhost:5000/admins/login', requestOptions).then(response => {
                if (response.status === 200) {
                    this.setState({ success: true, title: '', body: '', attemptFailed: false })
                    this.props.history.push('/')
                } else {
                    this.setState({attemptFailed: true})
                }
            });
        } else {
            this.setState({attemptFailed: true})
        }
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

    goDown = (e) => {
        if (e.keyCode == 40) {
            this.passwordField.current.focus()
        }
    }

    goUp = (e) => {
        if (e.keyCode == 38) {
            this.usernameField.current.focus()
        }
    }

    render() {
        const { state } = this;
        

        return (
            <div className="login-page">
                {this.state.success? 
                <div>
                    <div>
                        <b className="login-title">
                            Already Logged In
                        </b>
                    </div>
                </div>
                :
                <div>
                    <b className="login-title">
                        Login
                    </b>
                    <div className="login-box">
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group size="lg" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    autoFocus
                                    ref={this.usernameField}
                                    value={state.title}
                                    onKeyUp={this.goDown}
                                    onChange={(e) => this.setState({ title: e.target.value, attemptFailed: false })}
                                />
                                </Form.Group>
                            <Form.Group size="lg">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    ref={this.passwordField}
                                    type="password"
                                    value={state.body}
                                    onKeyUp={this.goUp}
                                    onChange={(e) => this.setState({ body: e.target.value, attemptFailed: false })}
                                />
                                </Form.Group>
                            <div className="login-failed">
                                {this.state.attemptFailed && "Invalid username or password"}
                            </div>
                            <Button block size="lg" type="submit">
                                Login
                            </Button>
                        </Form>
                    </div >
                </div>}
            </div>
        )
    }
}

export default withRouter(Login)
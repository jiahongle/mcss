import React from 'react';
import './login.css';

export default class Login extends React.Component {

    render() {

        return (
            <div className="announcement-container" >
                <div className="title-container">
                    <b>Create an announcement</b>

                </div>
                <div className="announcement-post">
                    <div>
                        <label className="announcement-form">
                            <p className="announcement-p">Title: </p>
                            <input
                                type="text"
                                value={state.title}
                                onChange={e => this.setState({ title: e.target.value })}
                                className="announcement-input" />
                        </label>
                    </div>
                    <div>
                        <label className="announcement-form"> <p className="announcement-p">Body</p>
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
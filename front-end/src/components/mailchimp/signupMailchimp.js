import React from "react";
import Button from 'react-bootstrap/Button';
import "./mailchimp.css";

// export default class signupMessage extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {

//     }
// }

export default class signupMailchimp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { email:'', 
                       msg: ""
                    }
    }
    
    signupOnChangeHandler = (event) => {
        this.setState({ email: event.target.value });
    }

    signupOnClickHandler = e => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.email }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/mailchimp/signup', requestOptions).
        then((res) => {

            if (res.status === 200) {
                this.setState({ msg: "Subscribed!" });
            } else {
                this.setState({ msg: "Sign-up failed." });
            }

        });
    }
    
    render() {
        return(
            <div id="mc-embed-signup">
            <form onSubmit={this.signupOnClickHandler}
                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div> 
                <label id="mc-label" for="mce-EMAIL">Subscribe to our Mailing List:</label>
                </div>
                <div>
                <input type="email" value={this.state.email} onChange={this.signupOnChangeHandler} 
                    name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required/>
                <Button variant="primary" type="submit" value="Subscribe" 
                name="subscribe" id="mc-subscribe-button" >
                    Subscribe
                </Button>
                </div>
                <div id="mc-input-field"><input type="text" 
                    name="b_9445429ae38382309141d339e_381eb46b2a" tabindex="-1" value=""/></div>
                <div class="clear">
                    
                </div>
                <div id="signup-msg">
                    <p>{this.state.msg}</p>
                </div>
            </form>
            </div>
        );
    }
}

{/* <div id="mc-embed-signup">
            <form onSubmit={this.signupOnClickHandler}
                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div>
                <label for="mce-EMAIL">Subscribe to our Mailing List</label>
                </div>
                <div>
                <input type="email" value={this.state.email} onChange={this.signupOnChangeHandler} 
                    name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required/>
                </div>
                <div id="mc-input-field"><input type="text" 
                    name="b_9445429ae38382309141d339e_381eb46b2a" tabindex="-1" value=""/></div>
                <div class="clear">
                    <Button variant="primary" type="submit" value="Subscribe" 
                    name="subscribe" id="mc-subscribe-button" >
                        Subscribe
                    </Button>
                </div>
                <div id="signup-msg">
                    <p>{this.state.msg}</p>
                </div>
            </form>
            </div> */}
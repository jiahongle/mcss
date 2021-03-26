import React from "react";
import Button from 'react-bootstrap/Button';
import "./mailchimp.css";


export default class emailMailchimp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            subject: "",
            person_name: "",
            from_address: "",
            message: "",
            validateMsg: ""

        }
    }
    // componentDidMount() {
        
    //     requestOptions = {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //         mode: 'cors',
    //         credentials: 'include'
    //     };
    //     fetch('http://localhost:5000/admins/protected', requestOptions).then(response => {
    //         if (response.status === 200) {

    //             this.setState({ loggedIn: true })
    //         } else {
    //             console.log("no cookie found")
    //         }
    //     });
        
    // }
    
    formOnChangeHandler = (event) => {
        const id = event.target.id;
        this.setState({ [id]: event.target.value });
    }

    sendOnClickHandler = e => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject: this.state.subject,
                                   person_name: this.state.person_name,
                                   from_address: this.state.from_address,
                                   message: this.state.message
                                }),
            mode: 'cors',
        };
        fetch('http://localhost:5000/mailchimp/send', requestOptions).
        then((res) => {

            if (res.status === 200) {
                this.setState({ validateMsg: "Email Sent!" });
            } else {
                this.setState({ validateMsg: "Email not sent." });
            }

        });
    }
    
    render() {
        return(
            <div id="mc-embed-email">
            <div className="title-container">
                <b>Send an Email</b>
            </div>
            <form onSubmit={this.sendOnClickHandler}
                method="post" id="mc-embedded-email-form" name="mc-embedded-email-form" class="validate" target="_blank" novalidate>
                <div> 
                <label class="form-label" for="subject"><p>Your Name:</p>
                <input type="text" value={this.state.person_name} onChange={this.formOnChangeHandler} 
                    class="mail-input" id="person_name" placeholder="Name" required/>
                </label>
                </div>
                <div> 
                <label class="form-label" for="email"><p>Your Email:</p>
                <input type="email" value={this.state.from_address} onChange={this.formOnChangeHandler} 
                   class="mail-input" id="from_address" placeholder="Email address" required/>
                </label>
                </div>
                <div> 
                <label class="form-label" for="subject"><p>Subject:</p>
                <input type="text" value={this.state.subject} onChange={this.formOnChangeHandler} 
                    class="mail-input" id="subject" placeholder="Subject" required/>
                </label>
                </div>
                <div> 
                <label class="form-label" for="message"><p>Message:</p>
                <textarea rows="7" value={this.state.message} onChange={this.formOnChangeHandler} 
                   class="mail-input" id="message" placeholder="Message" required/>
                </label>
                </div>
                <div>
                <Button variant="primary" type="submit" value="send" 
                name="send" id="mc-send-button" >
                    Send Email 
                </Button>
                </div>
                <div id="email-msg">
                    <p>{this.state.validateMsg}</p>
                </div>
            </form>
            </div>
        );
    }
}
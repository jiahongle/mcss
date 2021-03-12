import React from 'react'
import "./githubProfile.css"

export default class GithubProfile extends React.Component {
    
    render() {
        var profileURL = "https://github.com/"+this.props.username;
        return(
                <div className="github-profile-card">
                    <a href={profileURL}>
                        <img src={this.props.pfpLink} alt="" className="github-pfp"/>
                        <div className="github-username">{this.props.username}</div>
                    </a>
                </div>
        )
    }
}

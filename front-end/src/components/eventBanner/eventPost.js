import React from 'react';
import './eventPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"



export default class eventPost extends React.Component {

    state = {
        showAll: false
    }

    handleClick = () => {
        this.setState(prevState => ({
            showAll: !prevState.showAll
        }))
    }

    render() {
        return (
            <div className={this.state.showAll ? "event-post large" : "event-post"}>
                <div className="event-top">
                    <div className="post-text"> {this.props.details.title} </div>
                    {!this.state.showAll &&
                        <FontAwesomeIcon className="title icon-speaker clickable" icon={faChevronUp} onClick={this.handleClick} />

                    }
                    {this.state.showAll && <FontAwesomeIcon className="title icon-speaker clickable" icon={faChevronDown} onClick={this.handleClick} />
                    }
                </div>
                <div className="event-top">
                    <div className="post-date"> {Date(this.props.details.createdAt)} </div>
                </div>
                {
                    this.state.showAll &&
                    <div className="event-description">
                        {this.props.details.description}
                    </div>
                }
                { this.state.showAll &&
                    <button className="button">Learn more!</button>}


            </div>
        )
    }
}
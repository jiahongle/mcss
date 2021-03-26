import React from 'react';
import './announcements.css';
import CreateAnnouncement from '../components/announcements/createAnnouncement.js';
import AnnouncementPost from '../components/announcements/announcementPost';
import Footer from '../components/footer/footer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"
import mcss from '../mcssLogo.svg';
import { withRouter } from "react-router";


class Announcements extends React.Component {
    composeRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            announcements: [
            ],
            loggedIn: false,
            isCollapsed: false
        }

        this.forceRerender = this.forceRerender.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     console.log(this.props.history)
    //     console.log(this.props.location)
    //     console.log(prevProps.location)
    //     if (this.props.location.pathname !== prevProps.location.pathname) {
    //         window.scrollTo(0, 0)
    //     }
    // }    

    componentDidMount() {
        window.scrollTo(0, 0)
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/get', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => {
                this.setState({ announcements: data.data.reverse()})
            });
        
        requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include'
        };
        fetch('http://localhost:5000/admins/protected', requestOptions).then(response => {
            if (response.status === 200) {

                this.setState({ loggedIn: true })
            } else {
                console.log("no cookie found")
            }
        });
    }

    openCreateDialog = () => {
        this.composeRef.current.openDialog();
    }

    forceRerender = () => {
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/get', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => {
                this.setState({ announcements: data.data.reverse() })
                console.log(data)
                console.log(this.state.announcements);
            });
    }

    /* Toggles the state of the event between Collapsed and Expanded */
    toggleCollapse = () => {
        this.setState({
                isCollapsed: !this.state.isCollapsed
        })
    }


    render() {
        return (
            <div>
                <div className="header">
                    <img src={mcss} className="mcss-logo" />
                </div>
                <div className="announcement-page-content">
                    <CreateAnnouncement ref={this.composeRef} rerenderCallback={this.forceRerender}/>
                    <div className="title-container">
                        <div className="section-title">Announcements</div>
                        <FontAwesomeIcon className="title icon-speaker" icon={faBullhorn} />
                        {  
                            this.state.loggedIn && 
                                <div className="Create-Button" onClick={this.openCreateDialog}>
                                    Create Announcement
                                </div>
                        }
                    </div>

                    {this.state.announcements.map((announcement, i) => (
                        <AnnouncementPost loggedIn={this.state.loggedIn} 
                                            details={announcement} key={i} 
                                            rerenderCallback={this.forceRerender}
                                            isCollapsed={this.state.isCollapsed}/>
                    ))}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(Announcements)
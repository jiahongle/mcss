import React from 'react';
import './announcements.css';

export default class createAnnouncement extends React.Component {
    render() {
        return (
            <div className="announcement-post">
                < form action="/action_page.php" >
                    <div>
                        <label for="fname">Title</label>
                        <input type="text" id="fname" name="firstname" placeholder="Enter the title" className="announcement-input" />
                    </div>
                    <div>
                        <label for="lname">Body</label>
                        <input type="text" id="lname" name="lastname" placeholder="Enter the body.." className="announcement-input" />
                    </div>
                    <label for="country">Country</label>

                    <input type="submit" value="Submit" />
                </form >
            </div >
        )
    }
}

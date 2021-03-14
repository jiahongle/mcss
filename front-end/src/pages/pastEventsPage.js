import React from 'react'
import UploadPastEvent from '../components/pastEvent/uploadPastEvent';
import PastEventSection from '../components/pastEvent/pastEventsSection/pastEventsSection';
export default class PastEventsPage extends React.Component {
    onChangeHandler = event => {

        console.log(event.target.files[0])

    }
    render() {
        return (
            <div>
                <PastEventSection />
                <UploadPastEvent />
            </div>
        )
    }
}

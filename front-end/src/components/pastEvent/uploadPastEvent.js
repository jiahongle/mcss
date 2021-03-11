import React from 'react';

export default class UploadPastEvent extends React.Component {
    state = {
        title: '',
        year: '',
        selectedFiles: null,
    }

    onSubmit = e => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                year: this.state.year,
                imgs: this.state.selectedFiles
            }),
            mode: 'cors',
        };
        console.log(this.state.selectedFiles)
        fetch('http://localhost:5000/pastevents/post', requestOptions).then(response => response.json());
    }

    onChangeHandler = event => {
        this.setState({
            selectedFiles: event.target.files[0]
        })

    }

    render() {
        const { state } = this;


        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>Create a Past event</b>

                </div>
                <div className="announcement-post">

                    <label className="announcement-form">
                        <p className="announcement-p">Title: </p>
                        <input
                            type="text"
                            value={state.title}
                            onChange={e => this.setState({ title: e.target.value })}
                            className="announcement-input" />
                    </label>
                    <div>
                        <label className="">
                            {/* <p className="announcement-p">Photos to be uploaded: </p> */}
                            <input type="file" class="form-control" multiple onChange={this.onChangeHandler} name="file" />

                        </label>

                    </div>
                    <div>
                        <label className="announcement-form"> <p className="announcement-p">Year</p>
                            <input
                                type="text"
                                value={state.year}
                                onChange={e => this.setState({ year: e.target.value })}
                                className="announcement-input" />
                        </label>
                        <input type="submit" value="Submit" onClick={() => this.onSubmit()} />
                    </div>
                </div >
            </div >
        )
    }
}

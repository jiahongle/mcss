import React from 'react';
import axios from 'axios';
export default class UploadPastEvent extends React.Component {
    state = {
        title: '',
        year: '',
        selectedFiles: null,
    }

    // onSubmit = e => {
    //     const data = new FormData()
    //     for (var x = 0; x < this.state.selectedFiles.length; x++) {
    //         data.append('file', this.state.selectedFiles[x])
    //     }
    //     data.append('year', this.state.year);
    //     data.append('title', this.state.title);

    //     console.log(data)
    //     axios.post("http://localhost:5000/pastevents/postFile", data, { // receive two parameter endpoint url ,form data 
    //     })
    //         .then(res => { // then print response status
    //             console.log("Post file success")
    //         })
    // }

    onSubmit = e => {
        const data = new FormData()
        for (var x = 0; x < this.state.selectedFiles.length; x++) {
            data.append('file', this.state.selectedFiles[x])
        }
        data.append('year', this.state.year);
        data.append('title', this.state.title);

        const requestOptions = {
            method: 'POST',
            body: data,
            mode: 'cors',
        };
        fetch('http://localhost:5000/pastevents/postFile', requestOptions).then(response => this.setState({

        }));
    }

    onChangeHandler = event => {
        this.setState({
            selectedFiles: event.target.files
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

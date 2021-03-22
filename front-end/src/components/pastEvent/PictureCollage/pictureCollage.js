import React from 'react';
import "./pictureCollage.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTimes, faWindowClose } from "@fortawesome/free-solid-svg-icons";

export default class PictureCollage extends React.Component {

    state = {
        selectedFiles: null,
    }
    onChangeHandler = event => {
        this.setState({
            selectedFiles: event.target.files
        })
    }

    onDelete = (deleteHash) => {
        console.log(deleteHash)
        const data = new FormData()
        data.append('deleteHash', deleteHash);
        data.append('_id', this.props._id)

        const requestOptions = {
            method: 'DELETE',
            body: data,
            mode: 'cors',
        };
        fetch('http://localhost:5000/pastevents/delete', requestOptions)

    }

    onDeleteEvent = () => {
        const data = new FormData()
        data.append('_id', this.props._id)

        const requestOptions = {
            method: 'DELETE',
            body: data,
            mode: 'cors',
        };
        fetch('http://localhost:5000/pastevents/deleteEvent', requestOptions)

    }

    onSubmit = e => {
        const data = new FormData()
        console.log(this.state.selectedFiles)
        if (this.state.selectedFiles) {
            for (var x = 0; x < this.state.selectedFiles.length; x++) {
                data.append('file', this.state.selectedFiles[x])
            }
            data.append('_id', this.props._id);

            const requestOptions = {
                method: 'POST',
                body: data,
                mode: 'cors',
            };
            fetch('http://localhost:5000/pastevents/addFiles', requestOptions)
        }
    }


    render() {
        console.log("id" + this.props._id)
        var titleCol = (this.props.colorBorder === "blueBorder") ? "blueText" : "purpText";
        console.log(this.props.images)
        console.log("selectedFiles" + this.state.selectedFiles)
        return (
            <div>
                <div className={"pastEventTitle " + titleCol}>{this.props.title}
                    <FontAwesomeIcon id="plus" icon={faWindowClose} className="delPost clickable" onClick={() => this.onDeleteEvent()} />

                </div>

                <div className={"pastEventsPictureCollage " + this.props.colorBorder}>
                    {this.props.images.map((image) => (
                        <div>
                            <FontAwesomeIcon id="plus" icon={faTimes} className="del clickable" onClick={() => this.onDelete(image.deletehash)} />
                            <img src={image.link} alt="Logo" class="aaaa" key={image.deletehash} />
                        </div>
                    ))
                    }

                    <div className="aaaa plus">
                        <label htmlFor={this.props._id}>
                            <FontAwesomeIcon id="plus" icon={faPlus} className="clickable" />
                        </label>
                    </div>

                    <input type="file" id={this.props._id} style={{ display: 'none' }} onChange={this.onChangeHandler} />
                </div>
                {/* <input type="file" class="form-control" multiple onChange={this.onChangeHandler} name="file" /> */}
                <input type="submit" value="submit" onClick={() => this.onSubmit()} />

            </div >
        );
    }
}
import React, { Component } from 'react';
import './app.css';
import { Button } from "react-bulma-components/full"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './uploadFile.css'

import ReactImage from './react.png';

export default class App extends Component {
    state = { username: null };
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            value: '',
            selectedFile: null
          }
    
      }

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value});
      }

    handleSubmit = (event) => {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }
    onFormSubmit = (e) =>{

    }
    handleselectedFile = event => {
        this.setState({
          selectedFile : event.target.files[0],
        })
        console.warn("data : ",this.state.selectedFile)
      }
    render() {
        const { username } = this.state;
        return (
            <div align="center">
                {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
                <Button id = "upload" color="danger" size="large" rounded outlined data-toggle="modal" data-target="#uploadFile">upload file CSV</Button>
                <Button id = "upload" color="info" size="large" rounded outlined data-toggle="modal" data-target="#copyPast">COPY & PAST</Button>

                <br />
                <br />
                {/* Modal */}
                <div className="modal fade" id="uploadFile" tabIndex={-1} role="dialog" aria-labelledby="uploadFileLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="uploadFileLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            
                            <form onSubmit = {this.onFormSubmit}>
                            <div className="modal-body">                               
                                    <div className="form-group">
                                        <label htmlFor="usr">Name:</label>
                                        <input type="file" className="form-control" onChange={this.handleselectedFile} name = "file"/>
                                    </div>
                            </div>                            
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" type="submit" value="Submit">upload</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="copyPast" tabIndex={-1} role="dialog" aria-labelledby="copyPastLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="copyPastLabel">COPY & PAST</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form onSubmit = {this.handleSubmit}>
                            <h1>{this.state.value} </h1>
                            <div className="modal-body">                               
                                    <div className="form-group">
                                    <textarea value={this.state.value} onChange={this.handleChange} ></textarea>
                                    </div>
                            </div>                            
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" type="submit" value="submit">upload</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>








            </div>





        );
    }
}

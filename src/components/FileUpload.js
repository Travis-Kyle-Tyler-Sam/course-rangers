import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUserInfo } from './../dux/userReducer'
import { truncate } from "fs";
import Dropzone from 'react-dropzone';
import { Button, Icon } from 'semantic-ui-react';

class FileUpload extends Component {
  constructor() {
    super();

    this.state = {
      careerImages: [],
      eduImages: [],
      file: "",
      filename: "",
      filetype: "",
      displayFileUpload: false
    };
    this.handlePhoto = this.handlePhoto.bind(this);
    this.sendPhoto = this.sendPhoto.bind(this);
  }

  updateState() {
    this.setState({ displayFileUpload: !this.state.displayFileUpload });
  }

  componentDidMount() {
    this.props.getUserInfo();
    this.getUploads();
  }
  sendToback(photo) {
    return axios.post("/api/photoUpload", photo);
  }

  getUploads() {
    if (this.props.component === "work") {
      axios.get("/api/get_uploads").then(result => {
        this.setState({ careerImages: result.data });
      });
    } else if (this.props.component === "edu") {
      axios.get("/api/get_edu_uploads").then(result => {
        this.setState({ eduImages: result.data });
      });
    }
  }

  handlePhoto(event) {
    const reader = new FileReader(),
      file = event[0],
      _this = this;

    reader.onload = photo => {
      this.setState({
        file: photo.target.result,
        filename: file.name,
        filetype: file.type
      });
    };
    reader.readAsDataURL(file);
  }

  sendPhoto(event) {
    event.preventDefault();
    let stuffToSend = {
      file: this.state.file,
      filename: this.state.filename,
      filetype: this.state.filetype
    };
    this.sendToback(stuffToSend).then(response => {
      console.log("Upload response", response.data);
      if(this.props.cb){
        this.props.cb(response.data)
      }
      this.uploadPhotoToDB(response);
    });
    this.updateState();
  }

  uploadPhotoToDB(response) {
    let body = {
      img: response.data.Location
    };
      axios.post("/api/add_uploads", body).then(response => {
        this.setState({ image: response.data });
      });
    this.setState({
      file: "",
      filename: "",
      filetype: ""
    });
  }

  render() {
    this.state.file && console.log(this.state.photo);
    return (
      <div>
         <h3>My Documents</h3>
        {/* <button
          type="button"
          className="btn btn-light mb-2"
          onClick={() => this.updateState()}
        >
          <i className="fas fa-plus mr-2" />
          Add Document
        </button>
        <button
          type="button"
          hidden={this.state.displayFileUpload === false}
          className="btn btn-light mb-2"
          onClick={() => this.updateState()}
        >
        <i className="fas fa-times mr-2" />
          Cancel
        </button> */}
        
        <span>
          
          {/* <form hidden={this.state.displayFileUpload === false}>
            <div className="input-group-append">
              <input type="file" onChange={this.handlePhoto} />
              <button className="btn-default mt-1" onClick={this.sendPhoto}>
                Submit
              </button>
            </div>
          </form> */}

          
        </span>
        <Dropzone onDrop={ (accepted) => {
          this.handlePhoto(accepted)
        }}>{({accepted}) => {
          return this.state.file
          ? <img
          src={this.state.file}
          alt="file preview"
          className="file-preview img-thumbnail"
          height="150px"
          width="150px"
          />
          :'Drop a file here!'
        }}
        </Dropzone>
        {/* {this.state.file && (
            <img
              src={this.state.file}
              alt="file preview"
              className="file-preview img-thumbnail"
              height="150px"
              width="150px"
            />
          )} */}
        <Button onClick={this.sendPhoto}>
          <Icon name='upload'/> Submit
        </Button>
        <span className="container">
          <div className="container">
            {this.props.component === "work"
              ? this.state.careerImages.map(image => {
                  return (
                    <span key={image.img_url} className="container mr-2 w-25">
                      <a href={image.img_url}>
                        {" "}
                        <img
                          id="thumbnail1"
                          src={image.img_url}
                          className="img-thumbnail img-fluid"
                          max-height="auto"
                          width="15%"
                          alt="upload thumbnail"
                        />
                      </a>
                    </span>
                  );
                })
              : this.state.eduImages.map(image => {
                  return (
                    <span key={image.img_url} className="container mr-2 w-25">
                      <a href={image.img_url}>
                        <img
                          src={image.img_url}
                          id="thumbnail2"
                          className="img-thumbnail img-fluid"
                          max-height="auto"
                          width="15%"
                          alt="upload thumbnail"
                        />
                      </a>
                    </span>
                  );
                })}
          </div>
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.user
  };
}

export default connect(mapStateToProps, { getUserInfo })(FileUpload);

import React, { Component } from "react";
import BioDataService from "../services/biodata.service";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default class BioDataUpload extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.uploadData = this.uploadData.bind(this);

    this.state = {
      selectedFile: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
    };
  }

  selectFile(event) {
    this.setState({
      selectedFile: event.target.files,
    });
    console.log(event.target.files);
  }

  uploadData() {
    let currentFile = this.state.selectedFile[0];
    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    BioDataService.create(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        console.log(response.data.message);
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFile: undefined,
    });
  }

  render() {
    const { selectedFile, currentFile, progress, message } = this.state;

    return (
      <div className="card ">
        <h5 className="card-header">Upload file</h5>
        <div className="card-body">
          {currentFile && (
            <div className="progress mb-2 mx-4">
              <div
                className="progress-bar progress-bar-info progress-bar-striped progress-bar-animated bg-success"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progress + "%" }}
              >
                {progress}%
              </div>
            </div>
          )}
          <div>
            <label className="btn btn-default mx-2">
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={this.selectFile}
              />
            </label>
            <button
              className="btn btn-success"
              disabled={!selectedFile}
              onClick={this.uploadData}
            >
              Upload
            </button>
          </div>

          <div className="alert alert-light" role="alert">
            {message}
          </div>
          <ul>
            <li>Upload only text/csv files (.csv, .tbl, .txt, etc);</li>
            <li>Wait a couple seconds until it finished;</li>
            <li>You must signin to upload a file.</li>
            <li>
              Some errors could happen:
              <ul>
                <li>
                  Files with different extensions (.csv, .tbl, .txt, etc);
                </li>
                <li>You are not logged in;</li>
                <li>Internal server error.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="card welcome">
          <div className="card-header">
            <h5 className="welcome text-center">Welcome!</h5>
          </div>
          <div className="card-body">
            <ul className="steps">Steps to follow:</ul>
            <ul>
              <li>
                Register yourself;
                <ul>
                  <li>If you already register, please sign in.</li>
                </ul>
              </li>
              <li>
                Upload your file;
                <ul>
                  <li>Upload only plain/text (.txt, .csv and .tbl) files.</li>
                </ul>
              </li>
              <li>
                Verify data on the table;
                <ul>
                  <li>
                    Use the pagination above the table to see all the results.
                  </li>
                </ul>
              </li>
              <li>Enjoy!</li>
            </ul>
          </div>
          <div className="card-footer text-center ">
            <small className="text-muted">
              This website is a scientific initiation project developed to the
              Universidade Tecnológica Federal do Paraná de Cornélio Procópio.{" "}
              <br />
              If you find any error please,{" "}
              <a href="mailto: daugusto@alunos.utfpr.edu.br">contact us.</a>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

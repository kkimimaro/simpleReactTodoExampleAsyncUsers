import React from "react";
import "./Modal.css";

export default class Modal extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          Open Modal
        </button>
        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <h1>Modal Title</h1>
              <p>I am awesome modal!</p>
              <button
                className="button"
                onClick={() => this.setState({ isOpen: false })}
              >
                Close Modal
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

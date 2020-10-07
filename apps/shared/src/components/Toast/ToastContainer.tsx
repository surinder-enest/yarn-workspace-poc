import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
export default class ToastMainContainer extends Component {
  render() {
    return (
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    );
  }
}

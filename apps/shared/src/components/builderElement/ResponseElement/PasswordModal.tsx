import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

interface IProps {
  password: string;
  saveResponse: Function;
}

interface IState {
  password: string;
  errorMessage: string;
  isShowModal: boolean;
}

export default class PasswordModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      password: '',
      errorMessage: '',
      isShowModal: false,
    };
  }

  componentDidMount() {
    this.setState({ isShowModal: true });
  }

  private onChangePassword(password: string) {
    this.setState({ password, errorMessage: '' });
  }

  private onToggleModal(isShowModal: boolean, errorMessage: string) {
    this.setState({ isShowModal, errorMessage });
  }

  private onDonePassword() {
    const { password, isShowModal } = this.state;
    if (!password) {
      this.onToggleModal(isShowModal, 'Please enter password.');
    } else if (password !== this.props.password) {
      this.onToggleModal(isShowModal, 'Please enter correct password.');
    } else {
      this.props.saveResponse();
      this.onToggleModal(false, '');
    }
  }

  render() {
    const { isShowModal, errorMessage } = this.state;
    return (
      <>
        <style>
          {`
            .modal {
              text-align: center;
              padding: 0 !important;
            }

            .modal::before {
              content: '';
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            .modal-dialog {
              display: inline-block;
              text-align: left;
              vertical-align: middle;
            }

            .modal-dialog {
              margin: auto auto auto auto;
            }

            .message-modal .modal-header {
              background-color: #F5A623;
            }

            .message-modal .modal-header h4 {
              color: #fff;
              text-align: center;
              font-size: 18px;
              font-weight: 600;
            }

            .modal-body {
              padding: 0px;
            }

            .modal-inner {
              padding-top: 30px; 
              padding-bottom: 30px;
              margin-left: 30px;
              margin-right: 30px;
            }

            .modal-footer-section {
              background-color: #F8F8F8;
              padding-top: 10px;
              padding-bottom: 10px;
            }

            .modal-backdrop {
              background-color: #152837;
            }

            .modal-backdrop.in {
              opacity: .75;
            } 
            .btn {
              padding: 5px 12px;
              min-width: 110px;
              height: 30px;
              display: inline-block;
              margin-bottom: 0;
              font-size: 14px;
              font-weight: 400;
              line-height: 1.42857143;
              text-align: center;
              white-space: nowrap;
              vertical-align: middle;
              -ms-touch-action: manipulation;
              touch-action: manipulation;
              cursor: pointer;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              background-image: none;
              border: 1px solid transparent;
              border-radius: 4px;
            }

            .btn.active.focus,
            .btn.active:focus {
              outline: none;
            }

            .btn.focus {
              outline: none;
            }

            .btn:active.focus,
            .btn:active:focus {
              outline: none;
            }

            .btn:focus {
              outline: none;
            }

            .clickable {
              cursor: pointer !important;
            }

            .btn-cancel {
              color: #789bb6;
              border-color: #789bb6;
              background-color: #ffffff;
            }
            .btn-cancel:hover{
              color: #fff;
              background-color: #789BB6;
            }

            .btn-save {
              color: #ffffff !important;
              border-color: #789bb6;
              background-color: #789bb6;
            }
            .margin-right-10 {
              margin-right:10px;
            }
            .margin-top-5 {
              margin-top:5px;
            }

            @media only screen and (min-width: 767px){
              .message-modal .modal-dialog {
                width: 500px;
              }
            }
           
          `}
        </style>

        <Modal className="message-modal" show={isShowModal}>
          <Modal.Header>
            <h4 className="modal-title"> {`Please Enter Password`}</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="row modal-inner">
              <div className="col-md-12 no-padding">
                <input
                  className="form-control"
                  type="password"
                  placeholder="enter password"
                  onChange={event => {
                    this.onChangePassword(event.currentTarget.value);
                  }}
                />
              </div>
              <div className="row">
                <div className="col-md-12 margin-top-5">
                  <div
                    style={{
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontSize: '16px',
                      lineHeight: '22px',
                      textAlign: 'center',
                      letterSpacing: '-0.680436px',
                      color: 'rgb(255, 0, 0)',
                    }}
                  >
                    {errorMessage}
                  </div>
                </div>
              </div>
            </div>
            <div className="row no-margin">
              <div className="col-md-12 modal-footer-section text-center">
                <button
                  type="button"
                  onClick={() => this.onDonePassword()}
                  className="btn btn-save margin-right-10 clickable"
                  data-dismiss="modal"
                >
                  Done
                </button>
                <button
                  onClick={() => this.onToggleModal(false, '')}
                  className="btn btn-cancel clickable"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

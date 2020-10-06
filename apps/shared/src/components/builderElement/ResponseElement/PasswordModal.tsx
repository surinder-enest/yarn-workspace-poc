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
    );
  }
}

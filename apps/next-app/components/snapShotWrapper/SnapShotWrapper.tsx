import React from 'react';

interface Props {}

class SnapShotWrapper extends React.Component<Props> {
  render() {
    return (
      <div style={{ margin: '0', height: '100%', background: '#ededed' }}>
        <div style={{ width: '100%', padding: '0', height: '100%' }}>
          <div
            style={{
              display: 'table',
              height: '100%',
              width: '100%',
            }}
          >
            <div
              style={{
                verticalAlign: 'middle',
                height: 'calc(100vh - 0px)',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  maxWidth: '600px',
                  margin: '0px auto 15px auto',
                  backgroundColor: '#fff',
                  minHeight: '380px',
                }}
              >
                <div style={{ margin: '0' }}>
                  <div style={{ wordWrap: 'break-word' }}>
                    <div id="divScreenShotElements">{this.props.children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SnapShotWrapper;

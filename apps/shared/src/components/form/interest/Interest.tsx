import React, { Component } from 'react';
import { InterestModel, InterestOptionModel } from '../../../models'; 
import { InputControl } from '..';

interface Props {
    interest: InterestModel
}

export default class Interest extends Component<Props> {

    interestOption(option: InterestOptionModel, idx: number) {
        const { optionStyles, optionLabelStyles } = this.props.interest;
        return <div key={idx} style={optionStyles} className="circle-checkbox">
            <div className={`no-margin checkbox checkbox-primary`}
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginLeft: '12px', height: '17px' }}>
                <InputControl id={option.id}
                    styles={{ marginRight: '8px', opacity: '0', float: 'left' }}
                    type={"checkbox"} className="selectable" />
                <label style={optionLabelStyles}
                    htmlFor={option.id}>
                    {option.text}
                </label>
            </div>
        </div >
    }

    render() {
        const { title, options, isRequireResponse } = this.props.interest;
        return <>
            {
                options.length > 0
                    ? <>
                        <div className="row no-marging"
                            style={{
                                paddingTop: "10px",
                                paddingBottom: '10px',
                                display: 'flex',
                            }}>
                            <div dangerouslySetInnerHTML={{ __html: title }} />
                            {isRequireResponse && <span style={{ color: "#ff0000", marginLeft: '4px', fontSize: '16px' }}> *</span>}
                        </div>
                        <div className="row no-margin" style={{ display: 'flex' }}>
                            <div className="col-md-12 no-padding" style={{ width: '100%' }}>
                                {options.map((interestDetail, idx) => this.interestOption(interestDetail, idx))}
                            </div>
                        </div>
                    </>
                    : <></>
            }
        </>
    }
}

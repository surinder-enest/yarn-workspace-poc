import React, { Component } from 'react';
import { BuilderElementModel } from '../../models';
import { Field, Interest } from '.';


interface Props {
    builderElement: BuilderElementModel;
}

export default class Form extends Component<Props> {
    render() {
        const { styles, title, field, interest, buttonStyles, formSubmitSettings } = this.props.builderElement.form;
        return <div style={styles}>
            <style jsx={true}>{`a{ text-decoration:none; }`}</style>
            <div style={{ width: '66%', margin: '0 auto' }}>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <div dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                    <Field field={field} />
                    <Interest interest={interest} />
                </div>
            </div>
            <div style={{ paddingTop: '20px', textAlign: 'center', position: 'relative' }}>
                <div className="agreement-text" style={{
                    width: '66%',
                    margin: '0 auto',
                    color: field.labelStyles.color,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    fontSize: '13px',
                    textAlign: 'left',
                }}>
                    You agree to opt-in to receive Text and/or email notifications, offers, alerts and news. Msg & data rates
                            may apply. Text STOP to end. Up to {50} msg/mo.
                        </div>
                <div style={{ paddingTop: '20px', textAlign: 'center', position: 'relative' }}>
                    <div style={buttonStyles}>
                        {formSubmitSettings.buttonText}
                    </div>
                </div>
            </div>
        </div>
    }
}

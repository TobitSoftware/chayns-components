import React from 'react';

import {Form} from '../../src/react-chayns-form/index';

import {Input} from '../../src/react-chayns-input/index';
import {SelectButton} from '../../src/react-chayns-selectbutton/index';
import Textarea from '../../src/react-chayns-textarea/index';

const osList = [
    {
        id: 1,
        name: 'Windows 7'
    },
    {
        id: 2,
        name: 'Windows 8'
    },
    {
        id: 3,
        name: 'Windows 8.1'
    },
    {
        id: 4,
        name: 'Windows 10'
    },
    {
        id: 5,
        name: 'Other'
    }
];

export default class Example extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        window.submit = this.form.onSubmit;
    }

    render() {
        return(
            <div>
               <Form
                   intro="You can ask concrete questions directly to the Tobit.Software Premium Services. No charge. Please understand that the processing can take up to 48 hours. The more precise the questions are ask, the faster we can answer."
                   submit={res => {console.log(res)}}
                   ref={ref => {this.form = ref;}}
                   submitButton={true}
               >
                   <Input formProp="phone" ref={ref => {this.phone = ref;}} placeholder='Phonenumber' regExp='^[0-9|+]*$' onKeyUp={value => { this.form.setValue('phone', value); }}  /> {/**  this.form.setValue('phone', value)  */}

                   <div style={{ marginTop: '20px' }}>
                       <p>1. Please enter the SiteID of the site where the problem occures. The SiteID includes <b>the 10 first characters</b> of your david® startlicence.</p>
                       <Input formProp="siteId" placeholder='SiteId (e.g. 12345-67890)' regExp='^[0-9]{5}-[0-9]{5}$' onKeyUp={value => { this.form.setValue('siteId', value); }} />
                   </div>

                   <div style={{ marginTop: '20px' }}>
                       <p>2. Please describe your problem as precisely as possible. </p>
                       <Textarea formProp="problem" placeholder='Description' autogrow onKeyUp={value => { this.form.setValue('problem', value.target.value); }} />
                   </div>

                   <div style={{ marginTop: '20px' }}>
                       <p>3. Since when does the problem occur? Were any changes made (e.g. new operating system, new hardware...)?</p>
                       <Textarea formProp="changes" placeholder='Answer' autogrow onKeyUp={value => { this.form.setValue('changes', value); }} />
                   </div>

                   <div style={{ marginTop: '20px' }}>
                       <p>4. Does the problem  occur at specific PCs or Accounts, or does it occur everywhere?</p>
                       <div is formProp="radio" ref={ref => {this.radio = ref;}} className='table'>
                           <div className='table__row'>
                               <div className='table__cell'>
                                    <span>
                                        <input ref="r1" type='radio' className='radio' name='rbutton' value='At some users' id='radio1w47653' onClick={() => { this.form.setValue('radio', 'Users');}} defaultChecked />
                                        <label htmlFor='radio1w47653'>
                                            At some users
                                        </label>
                                    </span>
                               </div>

                               <div className='table__cell'>
                                    <span>
                                        <input ref="r2" type='radio' className='radio' name='rbutton' value='At some PCs' id='radio2w47653' onClick={() => { this.form.setValue('radio', 'PCs');} } />
                                        <label htmlFor='radio2w47653'>
                                            At some PCs
                                        </label>
                                    </span>
                               </div>
                           </div>

                           <div className='table__row'>
                               <div className='table__cell'>
                                    <span>
                                        <input ref="r3" type='radio' className='radio' name='rbutton' value='At the Server' id='radio3w47653' onClick={() => { this.form.setValue('radio', 'Server');}} />
                                        <label htmlFor='radio3w47653'>
                                            At the Server
                                        </label>
                                    </span>
                               </div>

                               <div className='table__cell'>
                                    <span>
                                        <input ref="r4" type='radio' className='radio' name='rbutton' value='Everywhere' id='radio4w47653' onClick={() => { this.form.setValue('Everywhere', value);}} />
                                        <label htmlFor='radio4w47653'>
                                            Everywhere
                                        </label>
                                    </span>
                               </div>
                           </div>
                       </div>

                        <Textarea
                            placeholder='Note'
                            autogrow
                            onKeyUp={value => { this.form.setValue('where', value); }}
                            formProp="where"
                        />
                   </div>

                   <div style={{ marginTop: '20px' }}>
                       <p>5. Is there a special situation where the problem occur, for example a special action from the user or in connection with an other app (which)? Can this be repeated?</p>
                        <Textarea
                            placeholder='Description'
                            autogrow
                            onKeyUp={value => { this.form.setValue('when', value); }}
                            formProp="when"
                        />
                   </div>

                   <div style={{ marginTop: '20px' }}>
                       Choose your operating system.
                       <div style={{ float: 'right' }}>
                           <SelectButton
                               label='Operating System'
                               list={osList}
                               onSelect={(value) => { this.form.setValue('system', value); }}
                               listKey='id'
                               listValue='name'
                               formProp="system"
                           />
                       </div>
                   </div>
               </Form>
            </div>
        );
    }
}
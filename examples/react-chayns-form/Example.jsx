import React from 'react';

import {Form} from '../../src/react-chayns-form/index';

import {Input} from '../../src/react-chayns-input/index';
import {SelectButton} from '../../src/react-chayns-selectbutton/index';
import Textarea from '../../src/react-chayns-textarea/index';
import {SelectList, SelectItem} from '../../src/react-chayns-selectlist/index';
import '../../src/react-chayns-selectlist/index.scss';

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
                   <Input
                       formProp="phone"
                       placeholder='Phonenumber'
                       onKeyUp={value => { this.form.setValue('phone', value); }}
                   />

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
                       <Textarea formProp="changes" placeholder='Answer' autogrow onKeyUp={event => { this.form.setValue('changes', event.target.value); }} />
                   </div>

                   <p>4. Does the problem occur at specific PCs or Accounts, or does it occur everywhere?</p>
                   <SelectList
                       style={{ marginTop: '20px' }}
                       ref={(ref) => { this._selectList = ref;}}
                       formProp="radio"
                       onChange={(value) => {
                         this.form.setValue('radio', value)
                       }}
                   >

                       {{/** <div is formProp="radio" ref={ref => {this.radio = ref;}} className='table'> */}}
                       <SelectItem
                           id="1"
                           name="At some users"
                       />
                       {{ /** onClick={() => { this.form.setValue('radio', 'Users');}} */}}

                       <SelectItem
                           id="2"
                           name="At some PCs"
                       />

                       <SelectItem
                           id="3"
                           name="At the Server"
                       />

                       <SelectItem
                           id="4"
                           name="Everywhere"
                       />
                   </SelectList>

                    <Textarea
                        placeholder='Note'
                        autogrow
                        onKeyUp={event => { this.form.setValue('where', event.target.value); }}
                        formProp="where"
                    />

                   <div style={{ marginTop: '20px' }}>
                       <p>5. Is there a special situation where the problem occur, for example a special action from the user or in connection with an other app (which)? Can this be repeated?</p>
                        <Textarea
                            placeholder='Description'
                            autogrow
                            onKeyUp={event => { this.form.setValue('when', event.target.value); }}
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
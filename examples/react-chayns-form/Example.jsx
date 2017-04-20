import React from 'react';

import {Form} from '../../src/react-chayns-form/index';

import {Input} from '../../src/react-chayns-input/index';
import {SelectButton} from '../../src/react-chayns-selectbutton/index';
import Textarea from '../../src/react-chayns-textarea/index';
import {SelectList, SelectItem} from '../../src/react-chayns-selectlist/index';
import '../../src/react-chayns-selectlist/index.scss';

const rules = [{
    name: 'siteId',
    check: function (text) {
        return (text.match('^[0-9]{1}$') ? true : false);
    }
}];

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
        name: 'Windows 10'
    },
    {
        id: 4,
        name: 'Other'
    }
];

export default class Example extends React.Component {

    constructor() {
        super();

        //
        var valid = document.createElement('style');
        valid.type = 'text/css';
        valid.innerHTML = '.input.valid { border-bottom: 1px solid green } .selectList.valid { border-left: 1px solid green; padding-left: 5px; }';
        var invalid = document.createElement('style');
        invalid.type = 'text/css';
        invalid.innerHTML = '.input.invalid { border-bottom: 1px solid red } .selectList.invalid { border-left: 1px solid red; padding-left: 5px; } .choosebutton.invalid { border: 1px solid red }';
        document.getElementsByTagName('head')[0].appendChild(valid);
        document.getElementsByTagName('head')[0].appendChild(invalid);
        //
    }

    render() {
        return(
            <div>
               <Form
                   onSubmit={res => {console.log('submitted:', res)}}
                   rules={rules}
                   submitButton={true}
                   ref={ref => { window.form = ref; }}
               >
                   <div style={{ marginTop: '20px' }}>
                       <p>1. Please enter the SiteID of the site where the problem occures. The SiteID includes <b>the 10 first characters</b> of your david® startlicence.</p>
                       <Input
                           name="siteId"
                           placeholder='SiteId (e.g. 12345-67890)'
                           required
                       />
                   </div>

                   <div style={{ marginTop: '20px' }}>
                       <p>2. Please describe your problem as precisely as possible. </p>
                       <Textarea
                           name="problem"
                           placeholder='Description'
                           autogrow
                           required
                       />
                   </div>

                   <div style={{ marginTop: '20px' }}>
                       <p>3. Since when does the problem occur? Were any changes made (e.g. new operating system, new hardware...)?</p>
                       <Textarea
                           name="changes"
                           placeholder='Answer'
                           autogrow
                       />
                   </div>

                   <p>4. Does the problem occur at specific PCs or Accounts, or does it occur everywhere?</p>
                   <SelectList
                       style={{ marginTop: '20px' }}
                       name="where"
                       required
                       className="selectList"
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
                        name="whereNote"
                    />

                   <div style={{ marginTop: '20px' }}>
                       <p>5. Is there a special situation where the problem occur, for example a special action from the user or in connection with an other app (which)? Can this be repeated?</p>
                        <Textarea
                            placeholder='Description'
                            autogrow
                            name="when"
                        />
                   </div>

                   <div style={{ marginTop: '20px' }}>
                       Choose your operating system.
                       <div style={{ float: 'right' }}>
                           <SelectButton
                               label='Operating System'
                               list={osList}
                               listKey='id'
                               listValue='name'
                               name="system"
                               required
                           />
                       </div>
                   </div>
               </Form>
            </div>
        );
    }
}
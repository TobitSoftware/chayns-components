# Form

The Form is part of the *tobit-chayns_components* package. It can be installed via npm:

    npm install -S tobit-chayns_components@latest


## Usage of the Form
The form has to be imported. Keep in mind that additional chayns-components that will be used in the form have to be imported separately.

```jsx
import {Form} from 'tobit-chayns_components/react-chayns-form';
```


You can use the form like this:
```jsx
<Form
    onSubmit={res => { console.log(res); }
>
    <Input
        name="sample"
        placeholder="Sample"
     />
</Form>
```

## Props
The following properties can be set on the Form-Component

| Property       | Description                                                                                                  | Type     | Default Value |
|----------------|--------------------------------------------------------------------------------------------------------------|----------|---------------|
| onSubmit       | Gets called on submit and retrieves the form data                                                            | function |               |
| intercom       | An intercom message that will be sent on submit. See examples for more information.                          | string   |               |
| rules          | Specific form values will be validated using a specific function.                                            | object[] |               |
| showValidation | If true, invalid values will be highlighted. Inputs need to be set to required or validated by a rule.       | bool     |      false    |
| submitButton   | If false, the submit button of the form will be hidden. You can still call the form-submit() by using a ref. | bool     |      true     |
| className      | Additional CSS-Classes that should be added to the form                                                      | object   |               |


### Examples

**Required Inputs**<br>
Highlight required but missing input values. <br>
Important: due to the name attribute on the input the Form knows that this input element refers to it and stores its value as 'siteId'.
```jsx
<Form
    onSubmit={res => { console.log(res); }}
    showValidation={true}
>
    <p>Please enter the SiteID of your chayns site.</p>
    <Input
        name="siteId"
        placeholder='SiteId (e.g. 12345-67890)'
        showValidation={true}
        required
    />
    <p>Please describe your chayns site in a few words.</p>
     <Textarea
          placeholder='Description'
          name="description"
          autogrow
     />
</Form>
```

**Intercom messages**<br>
Using the Form component you can even send intercom messages from the user to your chayns site.<br>
The message uses placeholders that are named equal to the inputs. They will be replaced onSubmit.<br>
```JavaScript
const intercomStr = "A new chayns site was added: ##siteId##. See the description in the following: ##description##.";
```
```jsx
<Form
    onSubmit={res => { console.log(res); }}
    intercom={intercomStr}
>
    <p>Please enter the SiteID of your chayns site.</p>
    <Input
        name="siteId"
        placeholder='SiteId (e.g. 12345-67890)'
        required
    />
    <p>Please describe your chayns site in a few words.</p>
    <Textarea
        name="description"
        placeholder='Description'
        required
        autogrow
    />
</Form>
```

**Rules**<br>
Rules are used to validate the value of an input element. They have to be assigned to a specific input using the name to be activated.<br>
The following example shows how to use them. The showValidation-prop is used to highlight the invalid inputs.
```JavaScript
//first define the rules in your class, they need to be accessible in the render method
const rules = [{
    name: 'siteId',
    check: function (text) {
        return (text.match('^[0-9]{5}\-[0-9]{5}$') ? true : false); //see regex
    }
}];
```
```jsx
<Form
    onSubmit={res => { console.log(res); }}
    showValidation={true}
    rule={rules}
>
    <p>Please enter the SiteID of your chayns site.</p>
    <Input
        name="siteId"
        placeholder='SiteId (e.g. 12345-67890)'
        required
    />
</Form>
```
As you can see you only need to provide the rules to the form. Then the form itself decides which rule belongs to which input based on the name attributes.

**No submit button**<br>
This example shows you how to use the form even if the submitButton is hidden. You need to use the ref-Prop in this case.
```jsx
<Form
    onSubmit={res => { console.log(res); }}
    submitButton={false}
    ref={form => { window.submitForm = form.submit; }}
>
    <p>Please enter the SiteID of your chayns site.</p>
    <Input
        name="siteId"
        placeholder='SiteId (e.g. 12345-67890)'
    />
</Form>
```
Of course you don't have to store the submit function inside the window object but you can store it in any variable.<br>
Then you only have to call the function and the form submit triggers.
```JavaScript
window.submitForm();
```
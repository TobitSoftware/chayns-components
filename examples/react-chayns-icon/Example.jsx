import React, { PureComponent } from 'react';

import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';

import { Icon } from '../../src/index';

import ExampleContainer from '../ExampleContainer';

export default class Example extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="Icon">
                <a href="https://fontawesome.com/icons?d=gallery" target="_blank" rel="noopener noreferrer">Font Awesome Icons</a>
                <br/>
                <Icon icon={faCoffee} style={{ fontSize: '3rem' }} stopPropagation/>
                <Icon icon={faCoffee} style={{ fontSize: '2rem' }}/>
                <Icon icon={faCoffee} style={{ fontSize: '1rem' }}/>
                <Icon icon={faCoffee} className="test"/>
                <br/>
                <a href="https://design.chayns.net/IconsundSymbole" target="_blank" rel="noopener noreferrer">Tobit Software Icons</a>
                <br/>
                <Icon icon="ts-chayns" style={{ fontSize: '3rem' }}/>
                <Icon icon="ts-tobit" style={{ fontSize: '2rem' }}/>
                <Icon icon="ts-bamboo" style={{ fontSize: '1rem' }}/>
                <Icon icon="ts-ellipsis_v" className="test"/>
            </ExampleContainer>
        );
    }
}

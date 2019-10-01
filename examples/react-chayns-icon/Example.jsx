import React, { PureComponent } from 'react';

import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { faRocket } from '@fortawesome/free-solid-svg-icons/faRocket';
import { faCocktail } from '@fortawesome/free-solid-svg-icons/faCocktail';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faReact } from '@fortawesome/free-brands-svg-icons/faReact';

import { Icon } from '../../src/index';

export default class IconExample extends PureComponent {
    constructor(props) {
        super(props);
        this.icons = [faCoffee, faRocket, faCocktail, faCode, faReact];
        this.state = { index: 0 };
    }

    render() {
        const { index } = this.state;
        return (
            <div>
                <a href="https://fontawesome.com/icons?d=gallery" target="_blank" rel="noopener noreferrer">
                    Font Awesome
                    Icons
                </a>
                <br />
                <Icon
                    icon={this.icons[index % this.icons.length]}
                    style={{ fontSize: '3rem' }}
                    stopPropagation
                    onClick={() => {
                        this.setState({ index: index + 1 });
                    }}
                />
                <Icon icon={faCoffee} style={{ fontSize: '2rem' }} />
                <Icon icon={faCoffee} style={{ fontSize: '1rem' }} />
                <Icon icon={faCoffee} className="test" />
                <br />
                <a href="https://design.chayns.net/IconsundSymbole" target="_blank" rel="noopener noreferrer">
                    Tobit
                    Software Icons
                </a>
                <br />
                <Icon icon="ts-chayns" style={{ fontSize: '3rem' }} stopPropagation />
                <Icon icon="ts-tobit" style={{ fontSize: '2rem' }} />
                <Icon icon="ts-bamboo" style={{ fontSize: '1rem' }} />
                <Icon icon="ts-ellipsis_v" className="test" />
            </div>
        );
    }
}

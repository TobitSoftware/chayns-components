import React, { PureComponent } from 'react';

import { Icon } from '../../src/index';

export default class IconExample extends PureComponent {
    constructor(props) {
        super(props);
        this.icons = ['fa-coffee', 'fa-cocktail', 'fa-glass', 'fa-wine-glass', 'fa-glass-whiskey-rocks', 'fa-beer'];
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
                <br/>
                <Icon
                    className="fa"
                    icon={this.icons[index % this.icons.length]}
                    style={{ fontSize: '3rem' }}
                    stopPropagation
                    onClick={() => {
                        this.setState({ index: index + 1 });
                    }}
                />
                <Icon icon="fa fa-coffee" style={{ fontSize: '2rem' }}/>
                <Icon icon="fa fa-coffee" style={{ fontSize: '1rem' }}/>
                <Icon icon="fa fa-coffee"/>
                <Icon icon="far fa-coffee"/>
                <Icon icon="fal fa-coffee"/>
                <Icon icon="fas fa-coffee"/>
                <Icon icon="fab fa-twitter"/>
                <i className="fa fa-coffee"/>
                <i className="far fa-coffee"/>
                <i className="fas fa-coffee"/>
                <i className="fal fa-coffee"/>
                <i className="fab fa-twitter"/>
                <br/>
                <a href="https://design.chayns.net/IconsundSymbole" target="_blank" rel="noopener noreferrer">
                    Tobit
                    Software Icons
                </a>
                <br/>
                <Icon icon="ts-chayns" style={{ fontSize: '3rem' }} stopPropagation/>
                <Icon icon="ts-tobit" style={{ fontSize: '2rem' }}/>
                <Icon icon="ts-bamboo" style={{ fontSize: '1rem' }}/>
                <Icon icon="ts-ellipsis_v" className="test"/>
            </div>
        );
    }
}

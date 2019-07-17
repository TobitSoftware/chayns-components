import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorArea from './colorArea/ColorArea';
import HueSlider from './hueSlider/HueSlider';
import TransparencySlider from './transparencySlider/TransparencySlider';

export default class ColorSelector extends Component {
    static propTypes = {// TODO support also rgba and hexa
        color: PropTypes.shape({
            h: PropTypes.number.isRequired,
            s: PropTypes.number.isRequired,
            l: PropTypes.number.isRequired,
            a: PropTypes.number.isRequired,
        }).isRequired,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = { color: props.color };
    }

    onChange = (color) => {
        this.setState({ color });
    };

    render() {
        const { color } = this.state;

        return (
            <div>
                <ColorArea
                    color={color}
                    onMove={this.onChange}
                />
                <HueSlider
                    color={color}
                    onChange={this.onChange}
                />
                <TransparencySlider
                    color={color}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

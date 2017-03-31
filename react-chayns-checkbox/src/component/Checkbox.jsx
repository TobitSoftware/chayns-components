import '../css/index.scss';
import React from 'react';
import classnames from 'classnames';

export default class Checkbox extends React.Component {
    static propTypes = {
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        label: React.PropTypes.string,
        onChange: React.PropTypes.func
    };



    constructor() {
        super();
        this.id = Math.random();
        this.state = {
            value: null
        };
    }

    onChange = () => {
        const {onChange} = this.props;

        if (onChange) onChange(this._node.checked);
    }

    render() {
        let {className, style} = this.props;
        let classNames = classnames({
            [className]: className
        });

        return (
            <div style={style} className={classNames}>
                {this.props.label ? this.props.label : ''}
                <input
                    className="switch"
                    ref={(ref) => {this._node = ref}}
                    onChange={this.onChange}
                    type="checkbox"
                    id={this.id}
                />
                <label
                    style={this.props.label ? {marginLeft: '5px'} : null}
                    htmlFor={this.id}
                />
            </div>
        );
    }
}
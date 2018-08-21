import React, { Component } from 'react';
import assign from 'object-assign';

import ModeSwitchHelper from './ModeSwitchHelper';


export default (...conf) => WrappedComponent => class PureComponent extends Component {
    constructor(...params) {
        super(...params);

        this.state = {
            mode: ModeSwitchHelper.getCurrentMode().id
        };

        ModeSwitchHelper.onChange(this.update);
    }

    componentWillMount() {
        this.setState({
            mode: ModeSwitchHelper.getCurrentMode().id
        });
    }


    componentWillUnmount() {
        ModeSwitchHelper.unregisterOnChange(this.updatedMode);
    }

    static getStores = WrappedComponent.getStores;

    static getPropsFromStores = WrappedComponent.getPropsFromStores;

    update = (mode) => {
        this.setState({
            mode
        });
    };

    _shouldRender() {
        const { mode } = this.state;

        if(window.chayns.utils.isArray(conf) && conf.indexOf(mode.id) !== -1) return true;

        if(!conf || conf.length === 0) return true;

        return false;
    }

    render() {
        const { mode } = this.state;

        if(window.chayns.utils.isArray(conf) && !ModeSwitchHelper.isInitialized()) return null;

        if(this._shouldRender()) {
            const props = assign({}, this.props, {
                mode,
            });

            return React.createElement(WrappedComponent, {
                ...props,
                ...this.state
            });
        }

        return null;
    }
};

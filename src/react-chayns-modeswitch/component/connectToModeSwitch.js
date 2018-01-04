import React from 'react';
import '../../polyfills/object-assign';

import ModeSwitchHelper from './ModeSwitchHelper';


export default (...conf) => Component => class PureComponent extends React.Component {
    static getStores = Component.getStores;
    static getPropsFromStores = Component.getPropsFromStores;


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

    update = (mode) => {
        this.setState({
            mode
        });
    };

    _shouldRender() {
        if(window.chayns.utils.isArray(conf) && conf.indexOf(this.state.mode.id) !== -1) return true;

        if(!conf || conf.length === 0) return true;

        return false;
    }

    render() {
        if(window.chayns.utils.isArray(conf) && !ModeSwitchHelper.isInitialized()) return null;

        if(this._shouldRender()) {
            const props = Object.assign({}, this.props, {
                mode: this.state.mode
            });

            return React.createElement(Component, {
                ...props,
                ...this.state
            });
        }

        return null;
    }
};

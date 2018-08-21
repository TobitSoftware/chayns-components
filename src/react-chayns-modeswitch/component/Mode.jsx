import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModeSwitchHelper from './ModeSwitchHelper';

export default class Mode extends Component {
    static propTypes = {
        group: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.number)
        ]),
        mode: PropTypes.number,
        modes: PropTypes.arrayOf(PropTypes.number),
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        group: null,
        mode: null,
        modes: null
    };

    constructor() {
        super();

        this.state = {
            modeId: ModeSwitchHelper.getCurrentMode().id
        };
    }

    componentWillMount() {
        ModeSwitchHelper.onChange(this.updatedMode);

        this.setState({
            // eslint-disable-next-line react/no-unused-state
            group: ModeSwitchHelper.getCurrentMode().id
        });
    }

    componentWillUnmount() {
        ModeSwitchHelper.unregisterOnChange(this.updatedMode);
    }

    updatedMode = (group) => {
        this.setState({
            modeId: group.id
        });
    };

    renderChildren() {
        const { children } = this.props;

        if(window.chayns.utils.isArray(children)) {
            return(
                <div className="modeswitch__mode">
                    {
                        children.map((element) => {
                            return element;
                        })
                    }
                </div>);
        }

        return children;
    }

    render() {
        const { modeId } = this.state;
        const { mode, modes, group } = this.props;

        if(!ModeSwitchHelper.isInitialized()) return null;

        if(window.chayns.utils.isNumber(mode) && modeId === mode) {
            return this.renderChildren();
        }

        if(window.chayns.utils.isArray(modes) && modes.indexOf(modeId) !== -1) {
            return this.renderChildren();
        }


        if(window.chayns.utils.isNumber(group) && group === modeId) {
            return this.renderChildren();
        }

        if(window.chayns.utils.isArray(group) && group.indexOf(modeId) !== -1) {
            return this.renderChildren();
        }

        return null;
    }
}

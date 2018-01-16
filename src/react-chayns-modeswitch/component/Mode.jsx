import React from 'react';
import PropTypes from 'prop-types';
import ModeSwitchHelper from './ModeSwitchHelper';

export default class Mode extends React.Component {
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
        if(window.chayns.utils.isArray(this.props.children)) {
            return(
                <div className="modeswitch__mode">
                    {
                        this.props.children.map((element) => {
                            return element;
                        })
                    }
                </div>);
        }

        return this.props.children;
    }

    render() {
        if(!ModeSwitchHelper.isInitialized()) return null;

        if(window.chayns.utils.isNumber(this.props.mode) && this.state.modeId === this.props.mode) {
            return this.renderChildren();
        }

        if(window.chayns.utils.isArray(this.props.modes) && this.props.modes.indexOf(this.state.modeId) !== -1) {
            return this.renderChildren();
        }


        if(window.chayns.utils.isNumber(this.props.group) && this.state.modeId === this.props.group) {
            return this.renderChildren();
        }

        if(window.chayns.utils.isArray(this.props.group) && this.props.group.indexOf(this.state.modeId) !== -1) {
            return this.renderChildren();
        }

        return null;
    }
}

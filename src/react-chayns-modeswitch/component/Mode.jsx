import React from 'react';
import ModeSwitchHelper from './ModeSwitchHelper';

class Mode extends React.Component {

    constructor() {
        super();

        this.state = {
            modeId: ModeSwitchHelper.getCurrentMode().id
        };
    }

    render() {
        if(!ModeSwitchHelper.isInitialized()) return null;

        if(window.chayns.utils.isNumber(this.props.mode) && this.state.modeId == this.props.mode) {
            return this.renderChildren();
        }

        if(window.chayns.utils.isArray(this.props.modes) && this.props.modes.indexOf(this.state.modeId) != -1) {
            return this.renderChildren();
        }


        if(window.chayns.utils.isNumber(this.props.group) && this.state.modeId == this.props.group) {
            return this.renderChildren();
        }

        if(window.chayns.utils.isArray(this.props.group) && this.props.group.indexOf(this.state.modeId) != -1) {
            return this.renderChildren();
        }

        return null;
    }

    componentWillMount() {
        ModeSwitchHelper.onChange(this.updatedMode);

        this.setState({
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
        if( window.chayns.utils.isArray( this.props.children ) ) {
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


}



/* PropTypes */
Mode.propTypes = {
    group: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.arrayOf(React.PropTypes.number)]),
    mode: React.PropTypes.number,
    modes: React.PropTypes.arrayOf(React.PropTypes.number),
    children: React.PropTypes.node.isRequired
};
/* End PropTypes */



export default Mode;
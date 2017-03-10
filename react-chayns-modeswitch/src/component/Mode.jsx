import React from 'react';
import ModeSwitchHelper from './ModeSwitchHelper';

class Mode extends React.Component {

    constructor() {
        super();

        this.state = {
            group: ModeSwitchHelper.getCurrentMode().id
        };
    }

    render() {
        if(!ModeSwitchHelper.isInitialized()) return null;

        if(window.chayns.utils.isNumber(this.props.group) && this.state.group == this.props.group) {
            return this.renderChildren();
        }

        if(window.chayns.utils.isArray(this.props.group) && this.props.group.indexOf(this.state.group) != -1) {
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
            group: group.id
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
function groups(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';

    if (props[propName]) {
        let value = props[propName];
        if (window.chayns.utils.isNumber(value)) {
            return null;
        } else if(window.chayns.utils.isArray(value)) {
            return null;
        } else {
            return new Error(propName + ' in ' + componentName + " should be a number or an array of numbers");
        }
    }

    // assume all ok
    return null;
}

function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location) {
        componentName = componentName || ANONYMOUS;
        if (props[propName] == null) {
            var locationName = ReactPropTypeLocationNames[location];
            if (isRequired) {
                return new Error(
                    ("Required " + locationName + " `" + propName + "` was not specified in ") +
                    ("`" + componentName + "`.")
                );
            }
            return null;
        } else {
            return validate(props, propName, componentName, location);
        }
    }

    let chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
}

let groupChecker = createChainableTypeChecker(groups);

Mode.propTypes = {
    group: groupChecker.isRequired,
    children: React.PropTypes.node.isRequired
};
/* End PropTypes */



export default Mode;
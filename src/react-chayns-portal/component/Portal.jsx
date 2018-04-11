import React from 'react';
import PropTypes from 'prop-types';

const ccPortals = {};

export default /* #__PURE__ */(() => class Portal extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        preventPortal: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ])
    };

    static defaultProps = {
        preventPortal: false,
        children: null,
    };

    state = {
        children: null,
    };

    componentDidMount() {
        const { children, name, preventPortal } = this.props;

        if(!children && name && !preventPortal) {
            ccPortals[name] = this;
        }

        if (children && name && ccPortals[name]) {
            ccPortals[name].setChildren(children);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { name } = nextProps;

        if (name && ccPortals[name]) {
            ccPortals[name].setChildren(nextProps.children);
        }
    }

    componentWillUnmount() {
        const { children, name, preventPortal } = this.props;

        if((!children && !preventPortal) && name && ccPortals[name] === this) {
            delete ccPortals[name];
        }

        if((children || preventPortal) && name && ccPortals[name]) {
            ccPortals[name].setChildren(null);
        }
    }

    setChildren(children) {
        this.setState({ children });
    }

    render() {
        const { children } = this.props;

        if (children || !this.state.children) {
            return null;
        }

        return (
            <div className="cc__portal">
                {this.state.children}
            </div>
        );
    }
})();

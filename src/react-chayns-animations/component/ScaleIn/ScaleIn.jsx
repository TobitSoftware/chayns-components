import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ScaleIn extends Component {
    static propTypes = {
        props: PropTypes.object.isRequired,
        component: PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.func
        ]).isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        animate: PropTypes.any.isRequired,
        in: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        this.props.animate.setAnimationListener(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.in !== this.props.in) {
            if (nextProps.in) {
                this.container.classList.add('cc__animation__scale-in--show');
            } else {
                this.container.classList.remove('cc__animation__scale-in--show');
            }
        }
    }

    setWrapperReference(ref) {
        this.updateClasses(ref);
    }

    updateClasses(wrapper) {
        const { left, right } = wrapper.getBoundingClientRect();

        if (left < right) {
            this.container.classList.add('cc__animation__scale-in--left');
            this.container.classList.remove('cc__animation__scale-in--right');
        } else {
            this.container.classList.remove('cc__animation__scale-in--left');
            this.container.classList.add('cc__animation__scale-in--right');
        }
    }

    render() {
        const { props, component: BaseComponent } = this.props;

        return (
            <div
                ref={(ref) => { this.container = ref; }}
                className="cc__animation__scale-in"
            >
            {/* {props.in && ( */}
                <BaseComponent
                    {...props}
                />
            {/* )} */}
            </div>
        );
    }
}

ScaleIn.duplicate = true;
ScaleIn.wrapperClassName = 'cc__animate--scale-in';

export default ScaleIn;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CLOSE = 1;

const OPEN = 2;

export default class AccordionRightAnimate extends PureComponent {
    static propTypes = {
        currentState: PropTypes.number.isRequired,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = { noWidth: props.currentState === CLOSE };
    }

    componentDidMount() {
        this.ref.addEventListener('transitionend', (event) => {
            if (event.propertyName === 'transform' && !event.target.classList.contains('accordion__head__right__search--active')) {
                this.setState({ noWidth: true });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const { currentState } = this.props;
        if (nextProps.currentState === OPEN && currentState === CLOSE) {
            this.setState({ noWidth: false });
        }
    }

    render() {
        const {
            currentState,
            children,
        } = this.props;
        const { noWidth } = this.state;

        return (
            <div
                className={classNames('accordion__head__right__search', 'accordion--no-trigger', {
                    'accordion__head__right__search--active': currentState === OPEN,
                })}
                style={{ width: noWidth ? '0' : 'auto' }}
                ref={(ref) => { this.ref = ref }}
            >
                {children}
            </div>
        );
    }
}

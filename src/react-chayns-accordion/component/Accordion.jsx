/* eslint-disable jsx-a11y/click-events-have-key-events,react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import requestAnimationFrame from '../../utils/requestAnimationFrame';
import Icon from '../../react-chayns-icon/component/Icon';
import AccordionHeadRight from './AccordionHeadRight';
import { isFunction, isString } from '../../utils/is';

const CLOSE = 1;

const OPEN = 2;

let rqAnimationFrame;

export default class Accordion extends PureComponent {
    constructor(props) {
        super(props);
        const { defaultOpened, open, className } = props;
        const currentState = (props && defaultOpened) || (open || (className && className.indexOf('accordion--open') !== -1)) ? OPEN : CLOSE;
        this.state = {
            currentState,
            showBody: currentState === OPEN,
        };
    }

    componentDidMount() {
        const { className, autogrow, dataGroup } = this.props;
        const { currentState } = this.state;

        if (className.indexOf('accordion--open') !== -1) {
            this.accordion.classList.add('accordion--open');
        }

        if (dataGroup) {
            if (!Accordion.dataGroups[dataGroup]) {
                Accordion.dataGroups[dataGroup] = [];
            }

            Accordion.dataGroups[dataGroup].push(this);
        }

        if (currentState === OPEN && autogrow && this.body) {
            this.body.style.setProperty('max-height', 'initial', 'important');
        }

        this.body.addEventListener('transitionend', (e) => {
            if (autogrow && e.propertyName === 'max-height') {
                // It's important that the state is accessed inside of the transitionend function
                // eslint-disable-next-line no-shadow
                const { currentState } = this.state;
                if (currentState === OPEN) {
                    this.body.style.setProperty('max-height', 'initial', 'important');
                }
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { open } = this.props;
        const { currentState } = this.state;

        if (currentState === CLOSE && prevState.currentState !== currentState) {
            this.timeout = setTimeout(() => {
                this.setState({
                    showBody: false,
                });
            }, 500);
        }

        if (open !== undefined) {
            if (open !== prevProps.open) {
                if (open) {
                    this.accordionOpenListener(null, true, true);
                } else {
                    this.accordionCloseListener(null, true, true);
                }
            }
        }
    }

    componentWillUnmount() {
        const { dataGroup } = this.props;

        if (dataGroup && Accordion.dataGroups[dataGroup]) {
            const elementIndex = Accordion.dataGroups[dataGroup].indexOf(this);
            if (elementIndex !== -1) {
                Accordion.dataGroups[dataGroup].splice(elementIndex, 1);
            }
        }

        cancelAnimationFrame(rqAnimationFrame);
        window.clearTimeout(this.timeout);
    }

    getBody() {
        const { renderClosed, children, removeContentClosed } = this.props;
        const { currentState, showBody } = this.state;
        if (currentState === OPEN || renderClosed || (this.rendered && !removeContentClosed) || showBody) {
            this.rendered = true;
            return children;
        }

        return null;
    }

    handleAccordionClick = (event) => {
        const { fixed, onClick, disabled } = this.props;

        if (onClick) {
            onClick(event);
        }

        if (fixed || disabled || event === null) {
            return;
        }

        let trigger = true;
        let node = event.target;
        for (let i = 0; i < 15; i += 1) { // look for up to 15 parent nodes
            if (node.classList) {
                if (node.classList.contains('accordion--no-trigger')) {
                    trigger = false;
                    break;
                }
                if (node.classList.contains('accordion__head')) {
                    break;
                }
            }
            if (node.parentNode) {
                node = node.parentNode;
            } else {
                trigger = false; // no parent node and no break at accordion__head -> portal (e.g. contextMenu) -> no trigger
                break;
            }
        }

        if (trigger) {
            const { currentState } = this.state;
            const { dataGroup } = this.props;

            if ((!dataGroup && currentState === OPEN) || this.accordion.classList.contains('accordion--open')) {
                this.accordionCloseListener(event);
            } else {
                this.accordionOpenListener(event);
            }
        }
    };

    accordionCloseListener(event, preventOnClose, controlledChange = false) {
        const { onClose, autogrow, controlled } = this.props;
        const { body } = this;

        if (autogrow && body) {
            rqAnimationFrame = requestAnimationFrame(() => {
                if (this.body) {
                    this.body.style.removeProperty('max-height');
                }

                rqAnimationFrame = requestAnimationFrame(() => {
                    if (autogrow && body) {
                        this.setState({
                            currentState: CLOSE,
                        });

                        if (onClose && !preventOnClose) {
                            onClose(event);
                        }
                    }
                });
            });
        } else {
            if (!controlled || controlledChange) {
                this.setState({
                    currentState: CLOSE,
                });
            }

            if (onClose && !preventOnClose) {
                onClose(event);
            }
        }
    }

    accordionOpenListener(event, preventOnOpen, controlledChange = false) {
        const { onOpen, dataGroup, controlled } = this.props;

        if (!controlled || controlledChange) {
            if (dataGroup && Accordion.dataGroups[dataGroup]) {
                Accordion.dataGroups[dataGroup].forEach((accordion) => {
                    if (accordion !== this && accordion.state && accordion.state.currentState === OPEN) {
                        accordion.accordionCloseListener();
                    }
                });
            }

            this.setState({
                currentState: OPEN,
                showBody: true,
            });
        }

        if (onOpen && !preventOnOpen) {
            onOpen(event);
        }
    }

    render() {
        const {
            id,
            style,
            isWrapped,
            className,
            styleBody,
            reference,
            icon,
            head,
            headMultiline,
            headClassNames,
            headCustomAttributes,
            noRotate,
            noIcon,
            disabled,
            fixed,
            right,
            onSearch,
            onSearchEnter,
            searchPlaceholder,
            searchValue,
        } = this.props;

        const { currentState } = this.state;
        return (
            <div
                className={classNames('accordion', 'react-accordion', { // react-accordion prevents collision with ui-accordions
                    'accordion--wrapped': (isWrapped === true),
                    'accordion--open': currentState === OPEN,
                    'accordion--disabled': disabled,
                    'accordion--fixed': fixed,
                    [className]: className,
                })}
                ref={(ref) => {
                    this.accordion = ref;
                    if (reference && isFunction(reference)) reference(ref);
                }}
                id={id}
                style={style}
            >
                <div
                    className={classNames('accordion__head', headClassNames, { accordion__head__multiline: headMultiline })}
                    onClick={this.handleAccordionClick}
                    {...headCustomAttributes}
                >
                    {
                        noIcon
                            ? null
                            : (
                                <div
                                    className={classNames('accordion__head__icon', {
                                        'accordion__head__icon--no-rotate': noRotate,
                                    })}
                                >
                                    {
                                        isString(icon) || icon.iconName
                                            ? <Icon icon={icon}/>
                                            : icon
                                    }
                                </div>
                            )
                    }
                    <div
                        className="accordion__head__title"
                        style={{
                            ...(noIcon ? { paddingLeft: '10px' } : null),
                            ...(head && !isString(head.open) && isString(head.close) && isWrapped ? { fontWeight: 'inherit' } : null),
                        }}
                    >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {head ? (head.open ? (currentState === OPEN ? head.open : head.close) : head) : null}
                    </div>
                    <AccordionHeadRight
                        right={right}
                        onSearch={onSearch}
                        onSearchEnter={onSearchEnter}
                        searchPlaceholder={searchPlaceholder}
                        searchValue={searchValue}
                        state={currentState}
                    />
                </div>
                <div
                    className="accordion__body"
                    ref={(ref) => {
                        this.body = ref;
                    }}
                    style={styleBody}
                >
                    {this.getBody()}
                </div>
            </div>
        );
    }
}

Accordion.dataGroups = {};

Accordion.propTypes = {
    head: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.shape({
            open: PropTypes.node.isRequired,
            close: PropTypes.node.isRequired,
        }).isRequired,
    ]).isRequired,
    headMultiline: PropTypes.bool,
    headClassNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.object,
    ]),
    // eslint-disable-next-line react/require-default-props
    headCustomAttributes: PropTypes.object,
    children: PropTypes.node.isRequired,
    right: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.shape({
            open: PropTypes.node,
            close: PropTypes.node,
        }).isRequired,
    ]),
    renderClosed: PropTypes.bool,
    isWrapped: PropTypes.bool,
    dataGroup: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    style: PropTypes.object,
    styleBody: PropTypes.object,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    defaultOpened: PropTypes.bool,
    reference: PropTypes.func,
    autogrow: PropTypes.bool,
    open: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
    noRotate: PropTypes.bool,
    fixed: PropTypes.bool,
    noIcon: PropTypes.bool,
    onSearch: PropTypes.func,
    onSearchEnter: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    searchValue: PropTypes.string,
    removeContentClosed: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    controlled: PropTypes.bool,
};

Accordion.defaultProps = {
    className: '',
    headClassNames: null,
    headMultiline: false,
    headCustomAttributes: null,
    dataGroup: null,
    id: null,
    style: null,
    styleBody: null,
    onOpen: null,
    onClose: null,
    defaultOpened: null,
    reference: null,
    isWrapped: false,
    renderClosed: false,
    right: null,
    autogrow: false,
    open: undefined,
    icon: 'ts-angle-right',
    noRotate: false,
    fixed: false,
    noIcon: false,
    onSearch: null,
    onSearchEnter: null,
    searchPlaceholder: '',
    searchValue: null,
    removeContentClosed: false,
    onClick: null,
    disabled: false,
    controlled: false,
};

Accordion.displayName = 'Accordion';

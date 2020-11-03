/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Icon from '../../react-chayns-icon/component/Icon';
import { isFunction, isString } from '../../utils/is';
import requestAnimationFrame from '../../utils/requestAnimationFrame';
import AccordionHeadRight from './AccordionHeadRight';

const CLOSE = 1;

const OPEN = 2;

let rqAnimationFrame;

/**
 * Accordions are collapsible sections that are toggled by interacting with a
 * permanently visible header.
 */
export default class Accordion extends PureComponent {
    constructor(props) {
        super(props);
        const { defaultOpened, open, className } = props;
        const currentState =
            (props && defaultOpened) ||
            open ||
            (className && className.indexOf('accordion--open') !== -1)
                ? OPEN
                : CLOSE;
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
                    this.body.style.setProperty(
                        'max-height',
                        'initial',
                        'important'
                    );
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
        if (
            currentState === OPEN ||
            renderClosed ||
            (this.rendered && !removeContentClosed) ||
            showBody
        ) {
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
        for (let i = 0; i < 15; i += 1) {
            // look for up to 15 parent nodes
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

            if (
                (!dataGroup && currentState === OPEN) ||
                this.accordion.classList.contains('accordion--open')
            ) {
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
                    if (
                        accordion !== this &&
                        accordion.state &&
                        accordion.state.currentState === OPEN
                    ) {
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

        let titleComponent = null;

        if (head) {
            if (head.open) {
                titleComponent = currentState === OPEN ? head.open : head.close;
            } else {
                titleComponent = head;
            }
        }

        return (
            <div
                className={classNames('accordion', 'react-accordion', {
                    // react-accordion prevents collision with ui-accordions
                    'accordion--wrapped': isWrapped === true,
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
                    className={classNames('accordion__head', headClassNames, {
                        accordion__head__multiline: headMultiline,
                    })}
                    onClick={this.handleAccordionClick}
                    {...headCustomAttributes}
                >
                    {noIcon ? null : (
                        <div
                            className={classNames('accordion__head__icon', {
                                'accordion__head__icon--no-rotate': noRotate,
                            })}
                        >
                            {isString(icon) || icon.iconName ? (
                                <Icon icon={icon} />
                            ) : (
                                icon
                            )}
                        </div>
                    )}
                    <div
                        className="accordion__head__title"
                        style={{
                            ...(noIcon ? { paddingLeft: '10px' } : null),
                            ...(head &&
                            !isString(head.open) &&
                            isString(head.close) &&
                            isWrapped
                                ? { fontWeight: 'inherit' }
                                : null),
                        }}
                    >
                        {titleComponent}
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
    /**
     * The component that should be displayed in the accordion head when it is
     * closed. Can be a `string`, React node or object like this: `{ open:
     * OpenComponent, close: CloseComponent }`. If an object is provided, the
     * components will be swapped based on the opening state.
     */
    head: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.shape({
            open: PropTypes.node.isRequired,
            close: PropTypes.node.isRequired,
        }).isRequired,
    ]).isRequired,

    /**
     * Allows text to wrap inside of the head.
     */
    headMultiline: PropTypes.bool,

    /**
     * Additional classnames to be applied to the head. Can be specified as a
     * `string`, `string[]` or `{[key: string]: boolean}`, which will be passed
     * to the [`classnames`](https://www.npmjs.com/package/classnames) function.
     */
    headClassNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.object,
    ]),

    /**
     * Custom HTML attributes that will be added to the `<div>` that contains
     * the head component.
     */
    headCustomAttributes: PropTypes.object, // eslint-disable-line react/forbid-prop-types

    /**
     * The content the Accordion reveals when it is open. To get proper spacing
     * inside of the Accordion body, supply a `<div>` with the classname
     * `accordion__content` applied to it.
     */
    children: PropTypes.node.isRequired,

    /**
     * Component that will be shown on the right side of the component.
     * Typically a badge. If you want different components for the open and
     * closed state, supply an object: `{ open: ..., closed: ... }`.
     */
    right: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.shape({
            open: PropTypes.node,
            close: PropTypes.node,
        }).isRequired,
    ]),

    /**
     * Render the Accordion content, even if it is closed.
     */
    renderClosed: PropTypes.bool,

    /**
     * Enables the wrapped Accordion style. Use this if the Accordion is nested
     * inside of another Accordion.
     */
    isWrapped: PropTypes.bool,

    /**
     * A string identifier for a group of Accordions. Only one Accordion of a
     * group that have the same `dataGroup`-prop can be open.
     */
    dataGroup: PropTypes.string,

    /**
     * A classname that will be applied to the outer most `<div>`-wrapper of the
     * Accordion.
     */
    className: PropTypes.string,

    /**
     * An HTML id that will be applied to the outer most `<div>`-wrapper.
     */
    id: PropTypes.string,

    /**
     * A React style object that will be applied to the outer most
     * `<div>`-wrapper of the Accordion.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * A React style object that will be applied to the body of the Accordion.
     */
    styleBody: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * A callback that is called when the Accordion gets opened.
     */
    onOpen: PropTypes.func,

    /**
     * A callback that is called when the Accordion gets closed.
     */
    onClose: PropTypes.func,

    /**
     * Wether the Accordion should be opened by default (when it first gets
     * rendered).
     */
    defaultOpened: PropTypes.bool,

    /**
     * A function that receives the ref of the outer most `<div>`-element of the
     * Accordion.
     */
    reference: PropTypes.func,

    /**
     * Wether the Accordion should adjust its height in the opened state.
     */
    autogrow: PropTypes.bool,

    /**
     * Control the open state.
     */
    open: PropTypes.bool,

    /**
     * The icon that is displayed to the left of the Accordion head. Supply a
     * FontAwesome string like `"fa fa-plane"` or a React component.
     */
    icon: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.node,
    ]),

    /**
     * Disable the icon rotation.
     */
    noRotate: PropTypes.bool,

    /**
     * Disable the opening and closing logic. The Accordion will be stuck in one
     * state.
     */
    fixed: PropTypes.bool,

    /**
     * Remove the Accordion to the left of the head.
     */
    noIcon: PropTypes.bool,

    /**
     * A callback that will be called when the text in the search field on the
     * right changes. This will also enable the search field.
     */
    onSearch: PropTypes.func,

    /**
     * A callback that will be called when the enter-key is pressed in the
     * search field.
     */
    onSearchEnter: PropTypes.func,

    /**
     * The placeholder for the search field.
     */
    searchPlaceholder: PropTypes.string,

    /**
     * The value for the search field (for making a controlled input).
     */
    searchValue: PropTypes.string,

    /**
     * Remove content from the Accordion body when it is closing.
     */
    removeContentClosed: PropTypes.bool,

    /**
     * Add a click listener for the Accordion head.
     */
    onClick: PropTypes.func,

    /**
     * Disables the Accordion, which changes the style and removes any
     * interactions.
     */
    disabled: PropTypes.bool,

    /**
     * When set, the open-prop updates and onChange does not update the internal
     * state.
     */
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

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import requestAnimationFrame from '../../utils/requestAnimationFrame';
import Icon from '../../react-chayns-icon/component/Icon';
import AccordionSearch from './AccordionSearch';
import AccordionRightAnimate from './AccordionRightAnimate';
import AccordionHeadRight from './AccordionHeadRight';

const CLOSE = 1;

const OPEN = 2;

let rqAnimationFrame;

export default class Accordion extends PureComponent {
    static propTypes = {
        head: PropTypes.oneOfType([
            PropTypes.node.isRequired,
            PropTypes.shape({
                open: PropTypes.node.isRequired,
                close: PropTypes.node.isRequired
            }).isRequired
        ]).isRequired,
        children: PropTypes.node.isRequired,
        right: PropTypes.oneOfType([
            PropTypes.node.isRequired,
            PropTypes.shape({
                open: PropTypes.node.isRequired,
                close: PropTypes.node.isRequired
            }).isRequired
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
        removeContentClosed: PropTypes.bool,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
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
        removeContentClosed: false,
        onClick: null,
        disabled: false,
    };

    static dataGroups = {};

    constructor(props) {
        super(props);
        const { defaultOpened, open, className } = props;

        this.state = {
            currentState: (props && defaultOpened) || (open || (className && className.indexOf('accordion--open') !== -1)) ? OPEN : CLOSE,
        };
    }

    componentDidMount() {
        const { className, autogrow, dataGroup } = this.props;
        const { currentState } = this.state;

        if (className.indexOf('accordion--open') !== -1) {
            this.accordion.classList.add('accordion--open');
        }

        if (currentState === OPEN) {
            if (autogrow && this._body) {
                this._body.style.setProperty('max-height', 'initial', 'important');
            }
        }

        if (dataGroup) {
            if (!Accordion.dataGroups[dataGroup]) {
                Accordion.dataGroups[dataGroup] = [];
            }

            Accordion.dataGroups[dataGroup].push(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== undefined) {
            const { open } = this.props;
            const { currentState } = this.state;

            if (open !== nextProps.open) {
                if (nextProps.open) {
                    this.accordionOpenListener();
                } else {
                    this.setState({
                        currentState: CLOSE
                    });
                }
            }

            if (nextProps.open && !currentState === !!OPEN) {
                this.accordionOpenListener();
            }

            if (!nextProps.open && !currentState === !!CLOSE) {
                this.setState({
                    currentState: CLOSE
                });
            }
        }
    }

    componentDidUpdate() {
        const { autogrow } = this.props;
        const { currentState } = this.state;
        const { _body } = this;

        if (autogrow && _body) {
            if (currentState === OPEN) {
                _body.style.setProperty('max-height', 'initial', 'important');
            } else if (currentState === CLOSE) {
                _body.style.maxHeight = null;
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


    _getBody() {
        const { renderClosed, children, removeContentClosed } = this.props;
        const { currentState } = this.state;

        if (currentState === OPEN || renderClosed || (this.rendered && !removeContentClosed)) {
            this.rendered = true;
            return children;
        }

        return null;
    }

    accordionCloseListener(event) {
        const { onClose, autogrow } = this.props;
        const { _body } = this;

        if (autogrow && _body) {
            _body.style.setProperty('max-height', '9999px', 'important');
        }

        rqAnimationFrame = requestAnimationFrame(() => {
            this.setState({
                currentState: CLOSE
            });

            if (autogrow && _body) {
                _body.style.removeProperty('max-height');
            }
        });

        if (onClose) {
            onClose(event);
        }
    }

    accordionOpenListener(event) {
        const { onOpen, dataGroup } = this.props;
        if (dataGroup && Accordion.dataGroups[dataGroup]) {
            Accordion.dataGroups[dataGroup].forEach((accordion) => {
                if (accordion !== this && accordion.state && accordion.state.currentState === OPEN) {
                    accordion.accordionCloseListener();
                }
            });
        }
        this.setState({
            currentState: OPEN
        });

        if (onOpen) {
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
            noRotate,
            noIcon,
            disabled,
            fixed,
            right,
            onSearch,
            onSearchEnter,
            searchPlaceholder,
        } = this.props;

        const { currentState } = this.state;
        return (
            <div
                className={classNames({
                    accordion: true,
                    'accordion--wrapped': (isWrapped === true),
                    'accordion--open': currentState === OPEN,
                    'accordion--disabled': disabled,
                    'accordion--fixed': fixed,
                    [className]: className
                })}
                ref={(ref) => {
                    this.accordion = ref;
                    if (reference) reference(ref);
                }}
                id={id}
                style={style}
            >
                <div
                    className="accordion__head"
                    onClick={this.handleAccordionClick}
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
                                        chayns.utils.isString(icon) || icon.iconName
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
                            ...(head && !chayns.utils.isString(head.open) && chayns.utils.isString(head.close) && isWrapped ? { fontWeight: 'inherit' } : null)
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
                        state={currentState}
                    />
                </div>
                <div
                    className="accordion__body"
                    ref={(ref) => {
                        this._body = ref;
                    }}
                    style={styleBody}
                >
                    {this._getBody()}
                </div>
            </div>
        );
    }
}

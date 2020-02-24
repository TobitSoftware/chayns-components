import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageAccordionHead from './ImageAccordionHead';
import ExpandableContent from '../../react-chayns-expandable_content/component/ExpandableContent';

function listToMatrix(list, count) {
    const matrix = [];
    let i = 0;
    let k = 0;

    for (i = 0, k = -1; i < list.length; i += 1) {
        if (i % count === 0) {
            k += 1;
            matrix[k] = [];
        }
        if (matrix[k] && list[i]) {
            matrix[k].push(list[i]);
        }
    }
    return matrix;
}

export default class ImageAccordionGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 100,
        };
        this.myRef = React.createRef();
        ImageAccordionGroup.index += 1;
        this.index = ImageAccordionGroup.index;
    }

    componentDidMount() {
        let style = getComputedStyle(this.myRef.current);
        this.width = this.getPx(style.width);
        this.setState({ width: this.width });
        window.addEventListener('resize', () => {
            if (this.myRef.current) {
                style = getComputedStyle(this.myRef.current);
                this.width = this.getPx(style.width);
                this.setState({ width: this.width });
            }
        });
    }

    getPx = (style) => {
        if (!style) {
            return 0;
        }
        const trimmed = style.replace(/ /g, '');
        const number = trimmed.match(/[+-]?([0-9]*[.])?[0-9]+/);
        if (!number) {
            return 0;
        }
        return parseFloat(number[0]);
    };

    handleAccordionClick = (key, sameRow, props, event) => {
        const { onHeadOpen } = this.props;
        let trigger = true;
        const node = event.target;
        for (let i = 0; i < 15; i += 1) {
            if (node.classList) {
                if (node.classList.contains('accordion--no--trigger') || node.classList.contains('context-menu-overlay')
                    || node.classList.contains('context-menu__item__text') || node.classList.contains('context-menu__item')) {
                    trigger = false;
                    return trigger;
                }
            }
        }

        if (onHeadOpen) {
            onHeadOpen(props);
        }

        if (trigger) {
            const { currentState } = this.state;
            const { onOpen } = props;
            if (currentState === key) {
                this.accordionCloseListener();
            } else {
                this.accordionOpenListener(key, sameRow, onOpen);
            }
        }

        return null;
    };

    accordionCloseListener() {
        this.setState((state) => ({
            currentState: undefined,
            prevOpen: state.currentState,
        }));
    }

    accordionOpenListener(key, sameRow, onOpen) {
        const { dataGroup, children } = this.props;
        if (dataGroup) {
            const openGroup = ImageAccordionGroup.dataGroups[dataGroup];
            if (openGroup && openGroup !== this) {
                openGroup.accordionCloseListener();
            }
            ImageAccordionGroup.dataGroups[dataGroup] = this;
        }

        let findChild = -1;
        if (children) {
            findChild = children.findIndex((g) => g && g.key === key);
        }

        this.setState((state) => ({
            currentState: findChild !== -1 && children[findChild].props.children ? key : null,
            prevOpen: !sameRow && state.currentState,
        }));
        if (onOpen) onOpen();
    }

    render() {
        const {
            children,
            className,
            reference,
        } = this.props;
        const { currentState, prevOpen, width } = this.state;

        const itemsPerRow = parseInt(width / 100, 10);
        const percent = 100 / itemsPerRow;
        const columnCount = Math.trunc(100 / percent);

        const childrenWithProps = React.Children.map(children, (child) => {
            if (child) {
                return React.cloneElement(child, {
                    originalKey: child.key,
                    open: child.key === currentState,
                    prevOpen: child.key === prevOpen,
                });
            }
            return null;
        }) || [];

        const imageAccordionMatrix = listToMatrix(childrenWithProps, columnCount);

        let wrapperHeight = '150px';
        if (width < 200) wrapperHeight = '185px';
        else if (width < 300) wrapperHeight = '165px';

        return (
            // ImageAccordionGroup
            <div
                ref={this.myRef}
                className={classNames('cc__image-accordion', {
                    [className]: className,
                })}
            >
                {/* ImageAccordionGroup Row */}
                {
                    imageAccordionMatrix.map((matrixRow) => (
                        // ImageAccordion Heads per row
                        <div
                            className={classNames('image-accordion-container', { open: matrixRow.some((row) => row.props.open) })}
                            key={matrixRow[0].key}
                        >
                            {matrixRow.map((item) => (
                                <div
                                    className={classNames('image-accordion', {
                                        open: currentState === item.props.originalKey,
                                    })}
                                    onClick={(e) => {
                                        this.handleAccordionClick(
                                            item.props.originalKey,
                                            matrixRow.some((row) => row.props.originalKey === currentState),
                                            item.props,
                                            e,
                                        );
                                    }}
                                    onKeyPress={() => { }}
                                    ref={(ref) => {
                                        this.accordion = ref;
                                        if (reference) reference(ref);
                                    }}
                                    style={{ width: `${percent}%` }}
                                    key={item.props.originalKey}
                                >
                                    <ImageAccordionHead
                                        item={item}
                                        wrapperHeight={wrapperHeight}
                                        width={width}
                                        itemsPerRow={itemsPerRow}
                                    />
                                </div>
                            ))
                            }
                            {/* Body of Row */}
                            <div
                                className="image-accordion-body"
                            >
                                <div
                                    className={classNames('arrow', {
                                        'no-arrow': matrixRow.findIndex((c) => (
                                            !c.props.children && (c.props.originalKey === currentState || (c.props.originalKey === prevOpen))
                                        )) !== -1,
                                    })}
                                    style={{
                                        marginLeft: (matrixRow.findIndex((c) => (
                                            c.props.originalKey === currentState)
                                                || (c.props.originalKey === prevOpen)) + 0.5) * (width * (percent / 100)) - 12,
                                        opacity: (matrixRow.find((c) => (
                                            c.props.originalKey === currentState)
                                                || (c.props.originalKey === prevOpen))
                                                || { props: { item: {} } }).props.disabled ? 0.55 : 1,
                                    }}
                                />
                                <ExpandableContent
                                    open={matrixRow.find((c) => c.props.children && ((c.props.originalKey === currentState)
                                    || (c.props.originalKey === prevOpen))) !== -1}
                                >
                                    {matrixRow}
                                </ExpandableContent>
                            </div>

                        </div>
                    ))
                }
            </div>
        );
    }
}

ImageAccordionGroup.dataGroups = {};

ImageAccordionGroup.index = -1;

ImageAccordionGroup.propTypes = {
    children: PropTypes.instanceOf(Array),
    dataGroup: PropTypes.string,
    className: PropTypes.string,
    reference: PropTypes.string,
    onHeadOpen: PropTypes.func,
};

ImageAccordionGroup.defaultProps = {
    children: [],
    dataGroup: null,
    className: '',
    reference: null,
    onHeadOpen: null,
};

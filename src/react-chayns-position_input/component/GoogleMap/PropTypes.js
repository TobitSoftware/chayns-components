import PropTypes from 'prop-types';

/** Turns a string into PascalCase
 * @param {string} str
 */
const pascalize = str => str.split(/[ _]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

/**
 * @param {string} eventName Name of the event
 * @returns {string} Name of the event handler
 */
export const toHandlerName = eventName => `on${pascalize(eventName)}`;

/**
 * Transforms event names into PropTypes
 * @param {string[]} events The event names
 * @param {boolean} returnDefaultProps Return propTypes or defaultProps
 * @returns {{ [eventHandler: string]: PropTypes.func | null }}
 */
export const toPropTypes = (events, returnDefaultProps) => events.reduce((props, eventName) => ({
    ...props,
    [toHandlerName(eventName)]: returnDefaultProps ? null : PropTypes.func,
}), {});


export const PositionProps = PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
});

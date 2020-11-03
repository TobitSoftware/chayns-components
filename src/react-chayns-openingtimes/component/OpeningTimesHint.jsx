import classnames from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT_HINT_TEXT =
    'Einige der Öffnungszeiten überschneiden sich oder sind nicht in der richtigen Reihenfolge.';

export const HINT_POSITIONS = {
    NONE: 0,
    TOP: 1,
    BOTTOM: 2,
};

const OpeningTimesHint = ({ content, position }) => (
    <div
        className={classnames(
            'content__card content__card--warning cc__opening-times__hint',
            {
                'cc__opening-times__hint--top': position === HINT_POSITIONS.TOP,
                'cc__opening-times__hint--bottom':
                    position === HINT_POSITIONS.BOTTOM,
            }
        )}
    >
        {content || DEFAULT_HINT_TEXT}
    </div>
);

OpeningTimesHint.propTypes = {
    content: PropTypes.string,
    position: PropTypes.oneOf([
        HINT_POSITIONS.NONE,
        HINT_POSITIONS.TOP,
        HINT_POSITIONS.BOTTOM,
    ]).isRequired,
};

OpeningTimesHint.defaultProps = {
    content: '',
};

OpeningTimesHint.displayName = 'OpeningTimesHint';

export default React.memo(OpeningTimesHint);

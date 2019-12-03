/* eslint-disable jsx-a11y/alt-text */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const PersonFinderResultItemCustom = ({ onClick, data, orm }) => {
    const handleClick = useCallback(() => {
        onClick({
            relation: data,
        });
    }, [onClick, data]);

    return (
        <div className="result-item" onClick={handleClick}>
            {orm.imageUrl ? (<div className="img" style={{ backgroundImage: `url(${data[orm.imageUrl]})` }} />) : null}
            <div className="text">
                <div
                    className="title"
                >
                    <div className="name">{data[orm.showName]}</div>
                </div>
                <div className="identifier">
                    {`(${data[orm.identifier]})`}
                </div>
            </div>
        </div>
    );
};

PersonFinderResultItemCustom.propTypes = {
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default PersonFinderResultItemCustom;

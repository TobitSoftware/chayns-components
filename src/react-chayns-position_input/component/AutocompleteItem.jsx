import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AutocompleteItem = ({ index, onClick, address }) => (
    <div
        className={classNames('map--autocomplete_item', index % 2 ? 'chayns__background-color--100' : 'chayns__background-color--102')}
        onClick={() => onClick(address)}
    >
        {address}
    </div>
);

AutocompleteItem.propTypes = {
    index: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default AutocompleteItem;

import React from 'react';
import PropTypes from 'prop-types';
import './ResultSelection.scss';

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ResultSelection = ({ text, search }) => {
    const regexp = new RegExp(escapeRegExp(search), 'gi');
    const mismatches = text.split(regexp);
    const matches = text.match(regexp);
    return mismatches.map((mismatch, mismatchIndex) => [
        <span className="cc__result-selection cc__result-selection--mismatch">{mismatch}</span>,
        matches && mismatchIndex < matches.length
        && <span className="cc__result-selection cc__result-selection--match">{matches[mismatchIndex]}</span>,
    ]);
};

ResultSelection.propTypes = {
    text: PropTypes.string,
    search: PropTypes.string,
};

ResultSelection.defaultProps = {
    text: '',
    search: '',
};

ResultSelection.displayName = 'ResultSelection';

export default ResultSelection;

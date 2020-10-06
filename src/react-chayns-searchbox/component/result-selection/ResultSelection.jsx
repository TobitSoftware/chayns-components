import React from 'react';
import PropTypes from 'prop-types';
import './ResultSelection.scss';

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ResultSelection = ({ text, search }) => {
    const regexp = new RegExp(escapeRegExp(search), 'gi');
    const mismatches = text.split(regexp);
    const matches = text.match(regexp);

    const mismatchesWithId = mismatches.map((part, index) => ({
        value: part,
        id: index,
    }));

    return mismatchesWithId.map((mismatch, mismatchIndex) => [
        <span key={`${mismatch.id}_missmatch`} className="cc__result-selection cc__result-selection--mismatch">{mismatch.value}</span>,
        matches && mismatchIndex < matches.length
        && <span key={`${mismatch.id}_match`} className="cc__result-selection cc__result-selection--match">{matches[mismatchIndex]}</span>,
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

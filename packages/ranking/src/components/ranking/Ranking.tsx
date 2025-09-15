import React, { FC, useMemo } from 'react';
import { StyledRanking } from './Ranking.styles';

export type RankingProps = {
    t: string;
};

const Ranking: FC<RankingProps> = ({ t }) => {
    const test = '';

    return useMemo(() => <StyledRanking>test</StyledRanking>, []);
};

Ranking.displayName = 'Ranking';

export default Ranking;

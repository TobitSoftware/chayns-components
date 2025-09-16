import React, { FC } from 'react';
import {
    StyledRankingOverview,
    StyledRankingOverviewSubtitle,
    StyledRankingOverviewTitle,
} from './RankingOverview.styles';
import { AnimatedNumber } from '@chayns-components/core';

export type RankingOverviewProps = {
    /**
     * A suffix that will be displayed before the total players.
     */
    suffix: string;
    /**
     * The amount of the total players.
     */
    totalPlayers: number;
    /**
     * The Rank of the current user.
     */
    userRank: number;
};

const RankingOverview: FC<RankingOverviewProps> = ({ userRank, totalPlayers, suffix }) => (
    <StyledRankingOverview>
        <StyledRankingOverviewTitle>
            Platz <AnimatedNumber value={userRank} />
        </StyledRankingOverviewTitle>
        <StyledRankingOverviewSubtitle>
            {suffix} von <AnimatedNumber value={totalPlayers} /> Mitspielern
        </StyledRankingOverviewSubtitle>
    </StyledRankingOverview>
);

RankingOverview.displayName = 'RankingOverview';

export default RankingOverview;

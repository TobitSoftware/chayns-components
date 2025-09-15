import React, { FC } from 'react';
import {
    StyledRankingOverview,
    StyledRankingOverviewSubtitle,
    StyledRankingOverviewTitle,
} from './RankingOverview.styles';

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
            Platz {userRank.toLocaleString('de')}
        </StyledRankingOverviewTitle>
        <StyledRankingOverviewSubtitle>
            {suffix} von {totalPlayers.toLocaleString('de')} Mitspielern
        </StyledRankingOverviewSubtitle>
    </StyledRankingOverview>
);

RankingOverview.displayName = 'RankingOverview';

export default RankingOverview;

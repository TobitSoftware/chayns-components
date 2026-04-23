import SkeletonProvider from './skeleton-provider/SkeletonProvider';
import BoxSkeleton from './variants/box-skeleton/BoxSkeleton';
import CircleSkeleton from './variants/circle-skeleton/CircleSkeleton';
import {
    H1Skeleton,
    H2Skeleton,
    H3Skeleton,
    H4Skeleton,
    H5Skeleton,
    H6Skeleton,
} from './variants/headline-skeleton/HeadlineSkeleton';
import TextSkeleton from './variants/text-skeleton/TextSkeleton';
import ButtonSkeleton from './variants/button-skeleton/ButtonSkeleton';
import BadgeSkeleton from './variants/badge-skeleton/BadgeSkeleton';
import ListItemSkeleton from './variants/list-item-skeleton/ListItemSkeleton';
import AccordionSkeleton from './variants/accordion-skeleton/AccordionSkeleton';

interface SkeletonNamespace {
    Config: typeof SkeletonProvider;
    Box: typeof BoxSkeleton;
    Circle: typeof CircleSkeleton;
    H1: typeof H1Skeleton;
    H2: typeof H2Skeleton;
    H3: typeof H3Skeleton;
    H4: typeof H4Skeleton;
    H5: typeof H5Skeleton;
    H6: typeof H6Skeleton;
    Text: typeof TextSkeleton;
    Button: typeof ButtonSkeleton;
    Badge: typeof BadgeSkeleton;
    ListItem: typeof ListItemSkeleton;
    Accordion: typeof AccordionSkeleton;
}

const Skeleton: SkeletonNamespace = {
    Config: SkeletonProvider,
    Box: BoxSkeleton,
    Circle: CircleSkeleton,
    H1: H1Skeleton,
    H2: H2Skeleton,
    H3: H3Skeleton,
    H4: H4Skeleton,
    H5: H5Skeleton,
    H6: H6Skeleton,
    Text: TextSkeleton,
    Button: ButtonSkeleton,
    Badge: BadgeSkeleton,
    ListItem: ListItemSkeleton,
    Accordion: AccordionSkeleton,
};

export default Skeleton;

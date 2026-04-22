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

interface SkeletonNamespace {
    Provider: typeof SkeletonProvider;
    Box: typeof BoxSkeleton;
    Circle: typeof CircleSkeleton;
    H1: typeof H1Skeleton;
    H2: typeof H2Skeleton;
    H3: typeof H3Skeleton;
    H4: typeof H4Skeleton;
    H5: typeof H5Skeleton;
    H6: typeof H6Skeleton;
    Text: typeof TextSkeleton;
}

const Skeleton: SkeletonNamespace = {
    Provider: SkeletonProvider,
    Box: BoxSkeleton,
    Circle: CircleSkeleton,
    H1: H1Skeleton,
    H2: H2Skeleton,
    H3: H3Skeleton,
    H4: H4Skeleton,
    H5: H5Skeleton,
    H6: H6Skeleton,
    Text: TextSkeleton,
};

export default Skeleton;

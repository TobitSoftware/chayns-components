import SkeletonProvider from './skeleton-provider/SkeletonProvider';
import BoxSkeleton from './variants/box-skeleton/BoxSkeleton';
import CircleSkeleton from './variants/circle-skeleton/CircleSkeleton';

const Skeleton = {
    Box: BoxSkeleton,
    Circle: CircleSkeleton,
    Provider: SkeletonProvider,
};

export default Skeleton;

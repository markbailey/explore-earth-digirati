import { createBoard } from '@wixc3/react-board';
import { SkeletonCard } from '../../components/Skeleton';

export default createBoard({
  name: 'SkeletonCard',
  Board: () => <SkeletonCard />,
  environmentProps: {
    canvasWidth: 466,
    canvasHeight: 290,
  },
});

import { createBoard } from '@wixc3/react-board';
import Dialog from '../../components/Dialog';

export default createBoard({
  name: 'Modal',
  Board: () => <Dialog open={true} />,
  environmentProps: {
    canvasWidth: 1920,
    canvasHeight: 640,
  },
});

import { createBoard } from '@wixc3/react-board';
import Select from '../../components/Select';

export default createBoard({
  name: 'Select',
  Board: () => <Select />,
  environmentProps: {
    canvasWidth: 1024,
    windowWidth: 360,
    windowHeight: 740,
  },
});

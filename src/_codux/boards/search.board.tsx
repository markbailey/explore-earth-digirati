import { createBoard } from '@wixc3/react-board';
import Search from '../../components/Search';

export default createBoard({
  name: 'Search',
  Board: () => <Search />,
  environmentProps: {
    canvasWidth: 992,
    windowWidth: 1024,
    windowHeight: 768,
  },
});

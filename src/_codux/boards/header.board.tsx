import { createBoard } from '@wixc3/react-board';
import { BrowserRouter } from 'react-router-dom';

import Header from '../../components/Header';
import Search from '../../components/Search';

export default createBoard({
  name: 'Header',
  Board: () => (
    <BrowserRouter>
      <Header>
        <Search />
      </Header>
    </BrowserRouter>
  ),
  environmentProps: {
    windowWidth: 1024,
    windowHeight: 768,
    canvasWidth: 1024,
  },
});

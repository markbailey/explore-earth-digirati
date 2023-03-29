import { createBoard } from '@wixc3/react-board';
import { BrowserRouter } from 'react-router-dom';
import Button from '../../components/Button';

export default createBoard({
  name: 'Button',
  Board: () => (
    <BrowserRouter>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button>
          Button
        </Button>
      </div>
    </BrowserRouter>
  ),
  environmentProps: {
    canvasWidth: 992,
    windowWidth: 1024,
    windowHeight: 768,
  },
});

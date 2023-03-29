import { createBoard } from '@wixc3/react-board';
import { ChangeEvent } from 'react';
import Hero from '../../components/Hero';

export default createBoard({
  name: 'Hero',
  Board: () => <Hero />,
  environmentProps: {
    canvasWidth: 1920,
    windowWidth: 1024,
    windowHeight: 768,
  },
});

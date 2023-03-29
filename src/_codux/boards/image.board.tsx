import { createBoard } from '@wixc3/react-board';
import Img, { imgStyles } from '../../components/Img';

export default createBoard({
  name: 'Image',
  Board: () => (
    <div className={imgStyles.backgroundImageContainer} style={{ width: '100vw', height: '100vh' }}>
      <Img
        src="https://images.pexels.com/photos/305810/pexels-photo-305810.jpeg"
        alt="Sky and clouds"
        background
      />
    </div>
  ),
  environmentProps: {
    windowWidth: 1024,
    windowHeight: 768,
    canvasWidth: 1024,
  },
});

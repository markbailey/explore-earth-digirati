import { createBoard } from '@wixc3/react-board';
import { BrowserRouter } from 'react-router-dom';
import Button from '../../components/Button';
import Card, { CardBody, CardMedia, cardStyles } from '../../components/Card';

export default createBoard({
  name: 'Card',
  Board: () => (
    <BrowserRouter>
      <div style={{ display: 'grid', placeContent: 'center', padding: '0 1rem' }}>
        <Card backgroundImg="https://flagcdn.com/w320/gb.png">
          <CardMedia
            src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&h=350"
            alt="dummy image"
          />

          <CardBody>
            <h2>United Kingdom</h2>
            <span>United Kingdom of Great Britain and Northern Ireland</span>
          </CardBody>

          <Button to="#" className={cardStyles.link} link>
            View
          </Button>
        </Card>
      </div>
    </BrowserRouter>
  ),
  environmentProps: {
    windowWidth: 1024,
    windowHeight: 768,
    canvasWidth: 1024,
  },
});

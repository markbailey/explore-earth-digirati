import { createBoard } from '@wixc3/react-board';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import Search from '../../components/Search';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Card, { CardMedia, CardBody } from '../../components/Card';
import Hero from '../../components/Hero';
import regions from '../../data/regions.json';
import gridStyles from '../../assets/stylesheets/grid.module.scss';

type RegionKey = keyof typeof regions.descriptions;

export default createBoard({
  name: 'Test',
  Board: () => (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', paddingTop: '4rem' }}>
        <Header />
        <Hero />
        <main>
          <div className={gridStyles.grid}>
            {regions.names.map((region) => (
              <div>
                <Card>
                  <CardMedia
                    src={
                      'https://images.pexels.com/photos/59873/elephant-elephants-tanzania-safari-59873.jpeg?auto=compress&cs=tinysrgb&h=350'
                    }
                    alt={region}
                  />
                  <CardBody>
                    <h2>{region}</h2>
                    <span>{regions.descriptions[region as RegionKey]}</span>
                  </CardBody>
                  <Button>View</Button>
                </Card>
              </div>
            ))}
          </div>
        </main>
      </div>
    </BrowserRouter>
  ),
  environmentProps: {
    canvasWidth: 1920,
    windowWidth: 1024,
    windowHeight: 768,
    canvasHeight: 1080,
  },
});

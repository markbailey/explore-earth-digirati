import { titleCase } from '../../utilities/string';
import Button from '../Button';
import Card, { CardBody, CardMedia } from '../Card';
import withStaticMap from '../hoc/withStaticMap';

export interface RegionCardProps {
  name: RegionKey;
  description: string;
  onButtonClick(regionName: RegionKey): void;
}

export interface CountryCardProps extends RestCountry {
  onButtonClick(countryName: string): void;
}

// CardMedia with Pexel API
// export const LazyMedia = withPexel(CardMedia);
// CardMedia with Static Map Image
export const StaticMapMedia = withStaticMap(CardMedia);

// Custom Card Components
export function RegionCard(props: RegionCardProps) {
  const { name, description, onButtonClick, ...otherProps } = props;
  const onViewButtonClick = () => onButtonClick(name);

  return (
    <Card {...otherProps}>
      <CardMedia src={`/assets/${name}.jpg`} alt={titleCase(name)} />
      <CardBody>
        <h2>{titleCase(name)}</h2>
        <p>{description}</p>
      </CardBody>
      <Button onClick={onViewButtonClick}>View Region</Button>
    </Card>
  );
}

export function CountryCard(props: CountryCardProps) {
  const { name, flags, population, region, capital, latlng, onButtonClick, ...otherProps } = props;
  const onViewButtonClick = () => onButtonClick(name.common);

  return (
    <Card {...otherProps} backgroundImg={flags.png}>
      <StaticMapMedia latitudeLongitude={latlng} mapSize={[500, 300]} zoom={7} />
      <CardBody>
        <h2>{name.common}</h2>
        <span>{name.official}</span>
      </CardBody>
      <Button onClick={onViewButtonClick}>View Country</Button>
    </Card>
  );
}

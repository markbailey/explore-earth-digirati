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
      <Button onClick={onViewButtonClick} aria-label={`View ${titleCase(name)}`}>
        View Region
      </Button>
    </Card>
  );
}

export function CountryCard(props: CountryCardProps) {
  const { name, flags, population, region, capital, latlng, onButtonClick, ...otherProps } = props;
  const onViewButtonClick = () => onButtonClick(name.common);

  return (
    <Card {...otherProps} backgroundImg={flags.png}>
      <StaticMapMedia latitudeLongitude={latlng} mapSize={[500, 300]} zoom={5} />
      <CardBody>
        <h2>{name.common}</h2>
        <span>{name.official}</span>
      </CardBody>
      <Button onClick={onViewButtonClick} aria-label={`View ${name.common}`}>
        View Country
      </Button>
    </Card>
  );
}

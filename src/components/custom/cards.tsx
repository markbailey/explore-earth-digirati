import { titleCase } from '../../utilities/string';
import withPexel from '../hoc/withPexel';
import Button from '../Button';
import Card, { CardBody, CardMedia } from '../Card';

export interface RegionCardProps {
  name: RegionKey;
  description: string;
  photoId: number;
  onButtonClick(regionName: RegionKey): void;
}

export interface CountryCardProps extends RestCountry {
  onButtonClick(countryName: string): void;
}

// CardMedia with Pexel API
export const LazyMedia = withPexel(CardMedia);

// Custom Card Components
export function RegionCard(props: RegionCardProps) {
  const { name, description, photoId, onButtonClick, ...otherProps } = props;
  const onViewButtonClick = () => onButtonClick(name);

  return (
    <Card {...otherProps}>
      <LazyMedia photoId={photoId} size="medium" />
      <CardBody>
        <h2>{titleCase(name)}</h2>
        <p>{description}</p>
      </CardBody>
      <Button onClick={onViewButtonClick}>View Region</Button>
    </Card>
  );
}

export function CountryCard(props: CountryCardProps) {
  const { name, flags, population, region, capital, onButtonClick, ...otherProps } = props;
  const onViewButtonClick = () => onButtonClick(name.common);

  return (
    <Card {...otherProps} backgroundImg={flags.png}>
      <LazyMedia
        query={name.common}
        size="medium"
        fallbackSrc={flags.svg}
        fallbackAlt={flags.alt}
      />

      <CardBody>
        <h2>{name.common}</h2>
        <span>{name.official}</span>
      </CardBody>
      <Button onClick={onViewButtonClick}>View Country</Button>
    </Card>
  );
}

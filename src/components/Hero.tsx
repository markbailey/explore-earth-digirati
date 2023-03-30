import { ChangeEvent, HTMLAttributes, MouseEvent, useContext } from 'react';
import classNames from 'classnames';

import { AppContext } from '../context/app';
import regions from '../data/regions.json';
import { titleCase } from '../utilities/string';
import Button from './Button';
import Search from './Search';
import Select from './Select';

import styles from '../assets/stylesheets/hero.module.scss';

export type HeroProps = HTMLAttributes<HTMLDivElement>;

function Hero(props: HeroProps) {
  const {
    region,
    country,
    countries,
    searchCriteria,
    isFetching,
    SetSearchCriteria,
    setRegion,
    setCountry,
  } = useContext(AppContext);

  const disableSearch = (region !== null && country !== null) || isFetching;
  const { className: classNameProp, ...otherProps } = props;
  const className = classNames(styles.hero, classNameProp);

  const onCountryChange = (event: ChangeEvent<HTMLSelectElement>) => setCountry(event.target.value);
  const onRegionChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setRegion(event.target.value as RegionKey);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
    SetSearchCriteria(event.target.value);

  const onResetClick = (_event: MouseEvent) => {
    setRegion(null);
    setCountry(null);
    SetSearchCriteria('');
  };

  return (
    <div {...otherProps} className={className}>
      <div className={styles.text}>
        <span>Discover</span>
        <h1 className={styles.title}>Our World</h1>
        <p>
          The Earth is an incredible planet full of exciting and unexplored regions, providing
          endless opportunities for adventure and discovery.
        </p>
      </div>

      <div className={styles.filters}>
        <Select
          placeholder="Select a region"
          value={region ?? ''}
          onChange={onRegionChange}
          aria-label="Select a region"
        >
          {regions.names.map((region) => (
            <option key={region} value={region}>
              {titleCase(region)}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Select a country"
          value={country?.name.common ?? ''}
          onChange={onCountryChange}
          disabled={countries.length === 0}
          aria-label="Select a country"
        >
          {countries.map(({ name }) => (
            <option key={name.common} value={name.common}>
              {name.common}
            </option>
          ))}
        </Select>

        <Search
          value={searchCriteria}
          onChange={onSearchChange}
          disabled={disableSearch}
          aria-label="Filter results"
        />

        <Button onClick={onResetClick} aria-label="Clear the filters">
          Clear
        </Button>
      </div>
    </div>
  );
}

export default Hero;

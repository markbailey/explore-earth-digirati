import { Fragment, useContext, useEffect, useMemo } from 'react';

import { AppContext } from './context/app';
import regions from './data/regions.json';
import { mount } from './utilities/show';
import { titleCase } from './utilities/string';

import { CountryCard, RegionCard } from './components/custom/cards';
import { CountryDialog } from './components/custom/CountryDialog';
import Header from './components/Header';
import Hero from './components/Hero';
import ScrollToTop from './components/ScrollToTop';

import gridStyles from './assets/stylesheets/grid.module.scss';
import { SkeletonCard } from './components/Skeleton';

function App() {
  const { region, country, countries, searchCriteria, isFetching, setCountry, setRegion } =
    useContext(AppContext);

  const filteredRegions = useMemo(() => {
    return regions.names.filter((region) => region.includes(searchCriteria)) as RegionKey[];
  }, [searchCriteria]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => country.name.common.includes(searchCriteria));
  }, [countries, searchCriteria]);

  const hasRegion = region !== null;
  const hasResults = hasRegion ? filteredCountries.length > 0 : filteredRegions.length > 0;

  const onRegionChange = (regionName: RegionKey) => {
    setRegion(regionName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderRegionCards = () =>
    filteredRegions.map((name) => (
      <div key={name}>
        <RegionCard
          name={name}
          description={regions.descriptions[name]}
          onButtonClick={onRegionChange}
        />
      </div>
    ));

  const renderCountryCards = () =>
    filteredCountries.map((country) => (
      <div key={country.name.common}>
        <CountryCard {...country} onButtonClick={setCountry} />
      </div>
    ));

  const renderSkeletonCards = () =>
    [...Array(6)].map((_, i) => (
      <div key={`skeleton_${i}`}>
        <SkeletonCard />
      </div>
    ));

  useEffect(() => {
    if (country !== null) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }, [country]);

  useEffect(() => {
    let pageTitle = 'Explore Earth | Mark Bailey | Digirati';
    if (region !== null) pageTitle = `${titleCase(region)} | ${pageTitle}`;
    if (country !== null) pageTitle = `${country.name.common} (${country.cca2}) | ${pageTitle}`;
    document.title = pageTitle;
  }, [region, country]);

  return (
    <Fragment>
      <CountryDialog country={country} open={country !== null} onClose={() => setCountry(null)} />
      <Header />
      <Hero />

      <main>
        {mount(
          hasRegion,
          <div style={{ padding: 'var(--spacing-6)' }}>
            <h1>{titleCase(region ?? '')}</h1>
            <p>{regions.descriptions[region!]}</p>
          </div>
        )}

        {mount(
          !isFetching && !hasResults,
          <div style={{ padding: 'var(--spacing-6)' }}>
            <p>No results found</p>
          </div>
        )}

        {mount(
          hasResults,
          <div className={gridStyles.grid}>
            {mount(!isFetching && !hasRegion, renderRegionCards())}
            {mount(!isFetching && hasRegion, renderCountryCards())}
            {mount(isFetching, renderSkeletonCards())}
          </div>
        )}
      </main>

      <ScrollToTop offset={0} />
    </Fragment>
  );
}

export default App;

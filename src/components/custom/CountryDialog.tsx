import classNames from 'classnames';
import { Fragment, useMemo, useState } from 'react';

import { mount } from '../../utilities/show';
import { titleCase } from '../../utilities/string';
import Button from '../Button';
import Card, { CardBody } from '../Card';
import Dialog, { DialogProps } from '../Dialog';
import Img from '../Img';
import Select from '../Select';

import styles from '../../assets/stylesheets/dialog.module.scss';

export type CountryDialogProps = DialogProps & { country: RestCountry | null };

// Custom Dialog for Country
export function CountryDialog(props: CountryDialogProps) {
  const [translation, setTranslation] = useState<string>('');
  const { children, className: classNameProp, open, country, ...otherProps } = props;
  const className = classNames(styles.country, classNameProp);

  const {
    commonName,
    officialName,
    currency,
    region,
    capital,
    population,
    flag,
    translations,
    googleMapUrl,
    hasRegion,
    hasCaptial,
    hasCurrency,
    hasMap,
  } = useMemo(() => {
    if (country === null)
      return { hasRegion: false, hasCaptial: false, hasCurrency: false, hasMap: false };
    console.time('CountryDialog:Data');
    const {
      name,
      flags,
      region,
      subregion,
      capital,
      population,
      currencies,
      languages,
      translations,
      latlng,
    } = country;

    const translatedName =
      translation !== '' ? translations[translation] ?? name.nativeName[translation] : name;
    const formatedRegion =
      subregion !== undefined && subregion !== '' ? `${subregion} (${region})` : region;

    const capitalCity = capital.length > 0 ? capital[0] : null;
    const formatPopulation = population.toLocaleString();

    const currencyKeys = Object.keys(currencies);
    const currency: Currency | null =
      currencyKeys.length > 0 ? (currencies as Currencies)[currencyKeys[0]] : null;
    const formatedCurrency = currency?.name && `${currency.name} (${currencyKeys[0]})`;

    const googleMapUrl = `https://www.google.com/maps/@${latlng[0]},${latlng[1]},7.75z`;
    const jpnOption = translations['jpn'] !== undefined ? [{ value: 'jpn', text: 'Japanese' }] : [];
    const translationOptions = Object.keys(languages)
      .map((key) => ({ value: key, text: `${languages[key]}(Native)` }))
      .concat(jpnOption);

    console.timeEnd('CountryDialog:Data');
    return {
      currency: formatedCurrency,
      commonName: translatedName.common,
      officialName: translatedName.official,
      region: formatedRegion,
      capital: capitalCity,
      population: formatPopulation,
      flag: flags,
      translations: translationOptions,
      googleMapUrl,

      hasRegion: true,
      hasCaptial: capitalCity !== null,
      hasCurrency: formatedCurrency !== undefined,
      hasMap: true,
    };
  }, [country, translation]);

  const onTranslate = (e: React.ChangeEvent<HTMLSelectElement>) => setTranslation(e.target.value);

  return (
    <Dialog {...otherProps} open={open} className={className}>
      <form method="dialog" onSubmit={() => setTranslation('')}>
        <Card>
          <Select placeholder="Select a language" value={translation} onChange={onTranslate}>
            <option value="">Default</option>
            {translations?.map(({ value, text }) => (
              <option key={value} value={value}>
                {titleCase(text)}
              </option>
            ))}
          </Select>

          <Img src={flag?.png ?? ''} alt={flag?.alt ?? ''} />
          <CardBody scrollable>
            <h2>{commonName}</h2>
            <span>{officialName}</span>
            <br />
            <br />

            <table width="100%">
              <tbody>
                {mount(
                  hasRegion,
                  <tr>
                    <td valign="top">
                      <strong>Region</strong>
                    </td>
                    <td align="right">{region}</td>
                  </tr>
                )}

                {mount(
                  hasCaptial,
                  <tr>
                    <td>
                      <strong>Capital</strong>
                    </td>
                    <td align="right">{capital}</td>
                  </tr>
                )}

                <tr>
                  <td>
                    <strong>Population</strong>
                  </td>
                  <td align="right">{population}</td>
                </tr>

                {mount(
                  hasCurrency,
                  <tr>
                    <td valign="top">
                      <strong>Currency</strong>
                    </td>
                    <td align="right">{currency}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {mount(
              hasMap,
              <Fragment>
                <br />
                <a
                  href={googleMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open google maps in a new tab"
                >
                  Show Google Map
                </a>
              </Fragment>
            )}
          </CardBody>

          <Button value="default" aria-label="Close dialog">
            Close
          </Button>
        </Card>
      </form>
    </Dialog>
  );
}

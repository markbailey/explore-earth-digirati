export const API_URL = 'https://restcountries.com/v3.1/';
const query = `?fields=name,region,subregion,population,capital,currencies,flags,languages,translations,cca2`;

const sortCountries = (countries: RestCountry[]) =>
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

const fetchCountries = (slug: string) =>
  fetch(`${API_URL}${slug}`)
    .then((response) => {
      // Throw an error if the response status is not 200 here as otherwise error
      // being passed to the next .then() call
      if (response.status !== 200) throw new Error(response.statusText);
      return response.json();
    })
    .then(sortCountries);

class RestCountries {
  static async region(region: string) {
    const countries = await fetchCountries(`region/${region}${query}`);
    return {
      countries,
      country: (country: string) =>
        countries?.find(({ name }) => name.common.toLowerCase() === country),
    };
  }
}

export default RestCountries;

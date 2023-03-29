interface NameObject {
  common: string;
  official: string;
}

interface Name extends NameObject {
  nativeName: {
    [key: string]: NameObject;
  };
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface Languages {
  [key: string]: string;
}

interface Translations {
  [key: string]: NameObject;
}

declare interface RestCountry {
  name: Name;
  jpn?: NameObject;
  region: string;
  subregion: string;
  population: number;
  capital: string[];
  currencies: Currencies;
  languages: Languages;
  translations: Translations;
  flags: Flags;
  cca2: string;
}

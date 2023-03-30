declare interface NameObject {
  common: string;
  official: string;
}

declare interface Name extends NameObject {
  nativeName: {
    [key: string]: NameObject;
  };
}

declare interface Flags {
  png: string;
  svg: string;
  alt: string;
}

declare interface Currency {
  name: string;
  symbol: string;
}

declare interface Currencies {
  [key: string]: declare;
}

declare interface Languages {
  [key: string]: string;
}

declare interface Translations {
  [key: string]: NameObject;
}

declare interface RestCountry {
  name: Name;
  jpn?: NameObject;
  region: string;
  subregion: string;
  population: number;
  capital: string[];
  currencies: Currencies | {};
  languages: Languages;
  translations: Translations;
  flags: Flags;
  cca2: string;
  latlng: [number, number];
}

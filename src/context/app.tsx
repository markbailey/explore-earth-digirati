import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import RestCountries from '../models/RestCountries';

enum Actions {
  SetRegion = 'SET_REGION',
  SetCountry = 'SET_COUNTRY',
  SetCountries = 'SET_COUNTRIES',
  SetIsFetching = 'SET_IS_FETCHING',
  SetSearchCriteria = 'SET_SEARCH_CRITERIA',
}

const initialState: AppState = {
  region: null,
  country: null,
  countries: [],
  searchCriteria: '',
  isFetching: false,

  setRegion: () => {},
  setCountry: () => {},
  SetSearchCriteria: () => {},
};

export const AppContext = createContext<AppState>(initialState);

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case Actions.SetRegion: {
      const region = action.payload as RegionKey | null;
      return { ...state, region };
    }
    case Actions.SetCountry: {
      const country = action.payload as RestCountry | null;
      return { ...state, country };
    }
    case Actions.SetCountries: {
      const countries = action.payload as RestCountry[];
      return { ...state, countries };
    }
    case Actions.SetIsFetching: {
      const isFetching = action.payload as boolean;
      return { ...state, isFetching };
    }
    case Actions.SetSearchCriteria: {
      const searchCriteria = action.payload as string;
      return { ...state, searchCriteria };
    }
    default:
      return state;
  }
}

export function Provider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  const fetchCountries = async (regionName: string) => {
    dispatch({ type: Actions.SetIsFetching, payload: true });
    const countriesData = await RestCountries.region(regionName);

    dispatch({ type: Actions.SetCountries, payload: countriesData.countries });
    dispatch({ type: Actions.SetIsFetching, payload: false });
  };

  const setRegion = (regionName: RegionKey | null) => {
    dispatch({ type: Actions.SetRegion, payload: regionName });
    if (regionName !== null) fetchCountries(regionName);
    else dispatch({ type: Actions.SetCountries, payload: [] });
  };

  const setCountry = (countryName: string | null) => {
    const { countries } = state;
    const country =
      countryName !== null
        ? countries.find(({ name }) => name.common === countryName) ?? null
        : null;

    dispatch({ type: Actions.SetCountry, payload: country });
  };

  const SetSearchCriteria = (searchCriteria: string) =>
    dispatch({ type: Actions.SetSearchCriteria, payload: searchCriteria });

  useEffect(() => {
    const { country, countries } = state;
    const countryName = country?.name.common;
    const keepCountry =
      countryName !== undefined ? countries.some(({ name }) => name.common === countryName) : false;

    if (!keepCountry) setCountry(null);
  }, [state.country, state.countries]);

  return (
    <AppContext.Provider value={{ ...state, setRegion, setCountry, SetSearchCriteria }}>
      {children}
    </AppContext.Provider>
  );
}

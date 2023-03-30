declare type EmptyObject = {};
declare type RegionKey = 'africa' | 'americas' | 'antarctic' | 'asia' | 'europe' | 'oceania';
type AppPayload = RegionKey | RestCountry | RestCountry[] | boolean | string | null;
type AppActionType =
  | 'SET_REGION'
  | 'SET_COUNTRY'
  | 'SET_COUNTRIES'
  | 'SET_IS_FETCHING'
  | 'SET_SEARCH_CRITERIA';

interface BaseAppState {
  region: RegionKey | null;
  country: RestCountry | null;
  countries: RestCountry[];
  searchCriteria: string;
  isFetching: boolean;
}

declare interface AppAction {
  type: AppActionType;
  payload: AppPayload;
}

declare interface AppState extends BaseAppState {
  setRegion(region: RegionKey | null): void;
  setCountry(country: string | null): void;
  SetSearchCriteria(criteria: string): void;
}

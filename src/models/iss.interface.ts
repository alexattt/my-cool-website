export interface IssPosition {
  latitude: number;
  longitude: number;
}

export interface IssData {
  iss_position: IssPosition;
  timestamp: number;
}

export interface IssState {
  position: IssPosition | null;
  timestamp: number | null;
  loading: boolean;
  error: string | null;
}

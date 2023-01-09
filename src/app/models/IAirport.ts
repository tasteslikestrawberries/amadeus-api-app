export interface IAirportsResponse {
  meta: {
    count: number;
    [key: string]: any;
  };
  data: IAirport[];
}

export interface IAirport {
  id: string;
  name: string;
  address: IAirportAdress;
  analytics: IAirportAnalytics;
  detailedName: string;
  geoCode: IAirportGeoCode;
  iataCode: string;
  self: IAirportSelf;
  subType: string;
  timeZoneOffset: string;
  type: string;
}

export interface IAirportFormData {
  id: string;
  isFromLocalStorage: boolean;
  iataCode: string;
  name: string;
  detailedName: string;
  type: string;
  subType: string;
  regionCode: string;
  stateCode: string;
  countryCode: string;
  countryName: string;
  cityCode: string;
  cityName: string;
  latitude: number;
  longitude: number;
  timeZoneOffset: string;
  score: number;
}

interface IAirportAdress {
  cityCode: string;
  cityName: string;
  countryCode: string;
  countryName: string;
  regionCode: string;
  stateCode: string;
}

interface IAirportAnalytics {
  travelers: {
    score: number;
  };
}

interface IAirportGeoCode {
  latitude: number;
  longitude: number;
}

interface IAirportSelf {
  href: string;
  methods: string[];
}

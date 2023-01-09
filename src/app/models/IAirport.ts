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


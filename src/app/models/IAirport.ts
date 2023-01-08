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
  timeZoneOffset: Date;
  type: string;
}

interface IAirportAdress {
  cityCode: string;
  cityName: string;
  countryCode: string;
  regionCode: string;
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

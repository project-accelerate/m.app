import { Service } from "typedi";
import axios from "axios";

interface Response<T> {
  result: T
}

export interface PostcodesIOPostcode {
  postcode: string;
  quality: number;
  eastings: number;
  northings: number;
  country: string;
  nhs_ha: string;
  longitude: number;
  latitude: number;
  european_electoral_region: string;
  primary_care_trust: string;
  region: string;
  lsoa: string;
  msoa: string;
  incode: string;
  outcode: string;
  parliamentary_constituency: string;
  admin_district: string;
  parish: string;
  admin_county: string;
  admin_ward: string;
  ccg: string;
  nuts: string;
  codes: {
    admin_district: string;
    admin_county: string;
    admin_ward: string;
    parish: string;
    parliamentary_constituency: string;
    ccg: string;
    nuts: string;
  }
}

export interface PostcodesIOOutcode {
  outcode: string;
  longitude: number;
  latitude: number;
  northings: number;
  eastings: number;
  admin_district: string[];
  parish: string[];
  admin_county: string[];
  admin_ward: string[];
  country: string[];
}

const POSTCODES_CLIENT = 'http://api.postcodes.io'

@Service()
export class PostcodesIOClient {
  getPostcode(postcode: string) {
    return axios.get<Response<PostcodesIOPostcode>>(`${POSTCODES_CLIENT}/postcodes/${postcode}`)
      .then(response => response.data.result)
  }

  getOutcode(postcode: string) {
    return axios.get<Response<PostcodesIOOutcode>>(`${POSTCODES_CLIENT}/outcodes/${postcode}`)
      .then(response => response.data.result)
  }
}

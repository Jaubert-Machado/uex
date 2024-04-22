export type APIAddress = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export function isValidAddressList(
  addressList: any
): addressList is APIAddress[] {
  return (
    Array.isArray(addressList) &&
    addressList.every((address) => {
      return (
        typeof address === "object" &&
        "cep" in address &&
        "logradouro" in address &&
        "complemento" in address &&
        "bairro" in address &&
        "localidade" in address &&
        "uf" in address &&
        "ibge" in address &&
        "gia" in address &&
        "ddd" in address &&
        "siafi" in address
      );
    })
  );
}

export type GoogleApiResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
};

export function isValidLocation(response: any): response is GoogleApiResponse {
  return (
    typeof response === "object" &&
    "results" in response &&
    Array.isArray(response.results) &&
    "geometry" in response.results[0] &&
    "location" in response.results[0].geometry &&
    "lat" in response.results[0].geometry.location &&
    "lng" in response.results[0].geometry.location
  );
}

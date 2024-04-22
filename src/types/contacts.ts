export type ContactData = {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  address: string;
  district: string;
  addressNumber: string;
  addOnAddress: string | null;
  state: string;
  city: string;
  cep: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export type Contact =
  | {
      ok: true;
      data: ContactData[];
    }
  | {
      ok: false;
      message: string;
    };

export interface Contador {
  all: number;
  nps: number;
  tipo: ContadorTipo;
  rating: RatingData;
}

export interface ContadorTipo {
  environment: number;
  social: number;
  governance: number;
  general: number;
  percentEnvironment: number;
  percentSocial: number;
  percentGovernance: number;
  percentGeneral: number;

}

export interface RatingData {
  positive: number;
  neutral: number;
  negative: number;
  percentPositive: number;
  percentNeutral: number;
  percentNegative: number;
}

export class NominalBook {
  cod: number;
  title: string;
  author: string;
  edition: string;
  volume: string;
  description: string;
  cover: string;
}

export class Book {
  cod: number;
  cod_nominal_book: number;
  available: boolean;
}

export class Book {
    id: number;
    author: string;

    title: string;
    pages: number;
    genre: {
      id: number;
      name: string;
    }// string; //  - Жанр (текст, обязательное из списка допустимых значений)
  }
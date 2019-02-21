export class Author {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob?: Date;
  books:
    [
      {
        id: number;
        author: string;
        title: string;
        pages: number;
          genre: {
            id: number;
            name: string;
          }
      }
    ]
}
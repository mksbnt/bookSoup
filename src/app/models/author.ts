// 1. Автор имеет следующие атрибуты:
//  - Фамилия (текст, обязательное)
//  - Имя (текст, обязательное)
//  - Отчество (текст, не обязательное) 
//  - Дата рождения (дата, обязательное)
//  - Список книг 

// 2. Книга имеет следующие атрибуты:
//  - Название (текст, обязательное)
//  - Количество страниц (число, обязательное)
//  - Жанр (текст, обязательное из списка допустимых значений)

export class Author {
  id: number;

  firstName: string;
  middleName?: string;
  lastName: string;
  dob: Date;
  book: 
    {
      title: string;
      pages: number;
      genre: string;
    }
}

interface IAuthor {
    id: number;
    name: string;
}
interface IBook {
    id: number;
    title: string;
    genre: string;
    year: number;
    authorId: IAuthor["id"];
}

type SearchResults = {
    books: IBook[];
    authors: IAuthor[];
}

interface IBookService {
    // getBooks - отримання всіх доступних книг
    getBooks(): IBook[];
    // getBookById - отримання книги за ідентифікатором
    getBookById(bookId: number): IBook | undefined;
    // getAuthors - отримання всіх авторів
    getAuthors(): IAuthor[];
    // getAuthorById - отримання автора за ідентифікатором
    getAuthorById(authorId: number): IAuthor | undefined;
    // getBooksByAuthor - отримання книг за ідентифікатором автора або за його ім'ям
    getBooksByAuthor(authorId: number): IBook[];
    getBooksByAuthor(authorName: string): IBook[];
    // getAuthorByBookId - отримання автора за ідентифікатором книги
    getAuthorByBookId(bookId: number): IAuthor | undefined;
    // search - глобальний пошук за назвою книги, жанром, роком видання чи автором
    search(query: string): SearchResults;
}

class BookService implements IBookService {
    private static books: IBook[] = [
        { id: 1, title: "The Hobbit", genre: "Fantasy", year: 1937, authorId: 1 },
        { id: 2, title: "1984", genre: "Dystopian", year: 1949, authorId: 2 }
    ];
    
    private static authors: IAuthor[] = [
        { id: 1, name: "J.R.R. Tolkien" },
        { id: 2, name: "George Orwell" },
    ];

    getBooks(): IBook[] {
        return BookService.books;
    }

    getBookById(bookId: number): IBook | undefined {
        return BookService.books.find(book => book.id === bookId);
    }

    getAuthors(): IAuthor[] {
        return BookService.authors;
    }

    getAuthorById(authorId: number): IAuthor | undefined {
        return BookService.authors.find(author => author.id === authorId);
    }

    getBooksByAuthor(authorIdentifier: number | string): IBook[] {
        if (typeof authorIdentifier === "number") {
            return BookService.books.filter(book => book.authorId === authorIdentifier);
        } else {
            const name = authorIdentifier.toLowerCase();
            const author = BookService.authors.find((author) => author.name.toLowerCase() === name);

            return author ? BookService.books.filter(book => book.authorId === author.id) : [];
        }
    }

    getAuthorByBookId(bookId: number): IAuthor | undefined {
        const book = this.getBookById(bookId);

        if (book) return this.getAuthorById(book.authorId);
    }

    search(query: string): SearchResults {
        const lowerQuery = query.toLowerCase();
        const books = BookService.books.filter((book) => {
            const bookFields = [book.title, book.genre, book.year.toString()];
            return bookFields.some(value => value.toLowerCase().includes(lowerQuery));
        });
        const authors = BookService.authors.filter(author => author.name.toLowerCase().includes(lowerQuery));

        return { books, authors };
    }
}


// Використання сервісу
const bookService = new BookService();

console.log("All books:", bookService.getBooks());
console.log("Book with ID 1:", bookService.getBookById(1));
console.log("Books by George Orwell:", bookService.getBooksByAuthor("George Orwell"));
console.log("Search results for 'Fantasy':", bookService.search("Fantasy"));

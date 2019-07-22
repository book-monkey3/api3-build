"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const book_factory_1 = require("./model/book-factory");
const some_books_1 = require("./model/some-books");
class BooksStore {
    constructor() {
        this.booksCache = some_books_1.SomeBooks.get();
        this.isSecure = false;
    }
    get books() {
        return this.isSecure ? [...this.booksCache, some_books_1.SomeBooks.secureBook] : this.booksCache;
    }
    setSecure(isSecure = false) {
        this.isSecure = isSecure;
    }
    getAll() {
        return _(this.books)
            .sortBy(b => b.rating)
            .reverse()
            .value();
    }
    ;
    getAllBySearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        const containsSearchTerm = (checked) => ~checked.toLowerCase().indexOf(searchTerm);
        return _(this.books)
            .filter(b => !!(containsSearchTerm(b.isbn) ||
            containsSearchTerm(b.title) ||
            _.some(b.authors, containsSearchTerm) ||
            containsSearchTerm(b.published.toISOString()) ||
            containsSearchTerm(b.subtitle) ||
            containsSearchTerm(b.description)))
            .sortBy(b => b.rating)
            .reverse()
            .value();
    }
    ;
    getByIsbn(isbn) {
        isbn = book_factory_1.BookFactory.normalizeIsbn(isbn);
        return this.books.find(book => book.isbn === isbn);
    }
    ;
    findByAuthorName(author) {
        return this.books.filter(b => b.authors.includes(author));
    }
    getAllAuthors() {
        return _(this.books)
            .flatMap(b => b.authors)
            .uniq()
            .value();
    }
    isbnExists(isbn) {
        return !!this.getByIsbn(isbn);
    }
    create(book) {
        if (book.isbn === some_books_1.SomeBooks.secureBook.isbn) {
            return;
        }
        this.booksCache.push(book);
    }
    ;
    update(book) {
        this.delete(book.isbn);
        this.create(book);
    }
    ;
    delete(isbn) {
        isbn = book_factory_1.BookFactory.normalizeIsbn(isbn);
        if (isbn !== some_books_1.SomeBooks.secureBook.isbn) {
            this.booksCache = this.booksCache.filter(book => book.isbn !== isbn);
        }
    }
    ;
    reset() {
        this.booksCache = some_books_1.SomeBooks.get();
    }
    ;
}
exports.BooksStore = BooksStore;
//# sourceMappingURL=books-store.js.map
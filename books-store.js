"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const book_factory_1 = require("./model/book-factory");
const some_books_1 = require("./model/some-books");
class BooksStore {
    constructor() {
        this.books = some_books_1.SomeBooks.get();
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
        let containsSearchTerm = (checked) => ~checked.toLowerCase().indexOf(searchTerm);
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
        this.books.push(book);
    }
    ;
    update(book) {
        this.delete(book.isbn);
        this.create(book);
    }
    ;
    delete(isbn) {
        isbn = book_factory_1.BookFactory.normalizeIsbn(isbn);
        return this.books = this.books.filter(book => book.isbn !== isbn);
    }
    ;
    reset() {
        this.books = some_books_1.SomeBooks.get();
    }
    ;
}
exports.BooksStore = BooksStore;
//# sourceMappingURL=books-store.js.map
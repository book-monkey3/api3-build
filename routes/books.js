"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const book_factory_1 = require("../model/book-factory");
class BooksRoute {
    constructor(store) {
        this.store = store;
    }
    static create(router, bookStore) {
        let booksRoute = new BooksRoute(bookStore);
        let methodsToBind = [
            'getAll', 'getAllBySearch', 'reset', 'create',
            'rate', 'getByISBN', 'checkISBN', 'update', 'delete'
        ];
        _.bindAll(booksRoute, methodsToBind);
        router.get('/', booksRoute.getAll);
        router.get('/search/:search', booksRoute.getAllBySearch);
        router.delete('/', booksRoute.reset);
        router.post('/', booksRoute.create);
        router.post('/:isbn/rate', booksRoute.rate);
        router.get('/:isbn', booksRoute.getByISBN);
        router.get('/:isbn/check', booksRoute.checkISBN);
        router.put('/:isbn', booksRoute.update);
        router.delete('/:isbn', booksRoute.delete);
    }
    getAll(req, res, next) {
        res.json(this.store.getAll());
        next();
    }
    ;
    getAllBySearch(req, res, next) {
        let searchTerm = req.params.search;
        res.json(this.store.getAllBySearch(searchTerm));
        next();
    }
    ;
    getByISBN(req, res, next) {
        let isbn = req.params.isbn;
        let book = this.store.getByIsbn(isbn);
        if (!book) {
            return res.status(404).send('Book does not exist');
        }
        res.json(book);
        next();
    }
    ;
    checkISBN(req, res, next) {
        let isbn = req.params.isbn;
        let bookExist = this.store.isbnExists(isbn);
        res.json(bookExist);
        next();
    }
    ;
    create(req, res, next) {
        let bookJson = req.body;
        let isbn = bookJson.isbn;
        if (!isbn) {
            return res.status(400).send('Invalid data: ISBN number is mandatory');
        }
        if (this.store.isbnExists(isbn)) {
            return res.status(409).send('Book does already exist');
        }
        let book = book_factory_1.BookFactory.fromJson(bookJson);
        this.store.create(book);
        res.send(201);
        next();
    }
    ;
    update(req, res, next) {
        let bookJson = req.body;
        let isbn = bookJson.isbn;
        if (!isbn) {
            return res.status(400).send('Invalid data: ISBN number is mandatory');
        }
        if (req.params.isbn != isbn) {
            return res.status(400).send('Invalid data: ISBN from query and body must match');
        }
        if (!this.store.isbnExists(isbn)) {
            return res.status(404).send('Book does not exist');
        }
        let book = book_factory_1.BookFactory.fromJson(bookJson);
        this.store.update(book);
        res.send(200);
        next();
    }
    ;
    delete(req, res, next) {
        let isbn = req.params.isbn;
        this.store.delete(isbn);
        res.send(200);
        next();
    }
    ;
    reset(req, res, next) {
        this.store.reset();
        if (res && next) {
            res.send(200);
            next();
        }
    }
    ;
    rate(req, res, next) {
        let isbn = req.params.isbn;
        let rating = req.body.rating;
        if (!rating && rating !== 0) {
            return res.status(400).send('Invalid data: rating is mandatory');
        }
        let book = this.store.getByIsbn(isbn);
        if (!book) {
            return res.status(404).send('Book does not exist');
        }
        book.rating = book_factory_1.BookFactory.normalizeRating(rating);
        res.send(200);
        next();
    }
    ;
}
exports.BooksRoute = BooksRoute;
//# sourceMappingURL=books.js.map
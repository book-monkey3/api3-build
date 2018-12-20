"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thumbnail_1 = require("./thumbnail");
const book_1 = require("./book");
class BookFactory {
    static empty() {
        let defaultThumbnail = new thumbnail_1.Thumbnail('https://angular2buch.de/img/book.png', 'Kein Vorschaubild verfügbar');
        return new book_1.Book('', '', [''], new Date(), '', 3, [defaultThumbnail], '');
    }
    static fromJson(json) {
        let book = BookFactory.empty();
        if (this.validString(json.isbn)) {
            book.isbn = BookFactory.normalizeIsbn(json.isbn);
        }
        if (this.validString(json.title)) {
            book.title = json.title.trim();
        }
        if (this.validArray(json.authors)) {
            let authors = [];
            for (let author of json.authors) {
                if (this.validString(author)) {
                    authors.push(author.trim());
                }
            }
            if (authors.length) {
                book.authors = authors;
            }
        }
        if (this.validString(json.published) &&
            this.validDate(json.published)) {
            book.published = new Date(json.published);
        }
        if (this.validString(json.subtitle)) {
            book.subtitle = json.subtitle.trim();
        }
        if (this.validNumber(json.rating)) {
            book.rating = BookFactory.normalizeRating(json.rating);
        }
        if (this.validArray(json.thumbnails)) {
            let thumbnails = [];
            for (let thumbnail of json.thumbnails) {
                if (this.validObject(thumbnail) &&
                    this.validString(thumbnail.url) &&
                    this.validString(thumbnail.title)) {
                    thumbnails.push(new thumbnail_1.Thumbnail(thumbnail.url.trim(), thumbnail.title.trim()));
                }
            }
            if (thumbnails.length) {
                book.thumbnails = thumbnails;
            }
        }
        if (this.validString(json.description)) {
            book.description = json.description.trim();
        }
        return book;
    }
    static normalizeIsbn(isbn) {
        let i = isbn + '';
        return i.replace(/[^0-9]/g, '');
    }
    static normalizeRating(rating) {
        let r = +rating;
        return (r < 0) ? 0 : (r > 5) ? 5 : r;
    }
    static validString(str) {
        return str === '' || (str && typeof str == 'string');
    }
    static validDate(date) {
        return (new Date(date)).toString() != 'Invalid Date';
    }
    static validArray(arr) {
        return arr && Array.isArray(arr) && arr.length;
    }
    static validObject(obj) {
        return obj && typeof obj == 'object';
    }
    static validNumber(no) {
        return no && typeof no == 'number';
    }
}
exports.BookFactory = BookFactory;
//# sourceMappingURL=book-factory.js.map
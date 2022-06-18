'use strict'
const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 6

var gBooks
var gPageIdx = 0

var gFilterBy = { maxPrice: 50, name: '' }
var gFilteredBooksCount

_createBooks()



function updatePrice(bookId, newPrice) {
    const book = getBookById(bookId)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}


function getBooks() {
    return gBooks
}


function deleteBooks(bookId) {

    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()

}

function addBook() {
    var nameBook = prompt('Book name?')
    var priceBook = prompt('Book price?')
    if (nameBook === null || priceBook === null) return
    const book = _createBook(nameBook, priceBook)
    gBooks.push(book)
    _saveBooksToStorage

}

function _createBook(name, price = getRandomIntInclusive(1, 30)) {
    return {
        id: makeId(3),
        name,
        price: price,
        desc: makeLorem(50),
        rate: 0

    }

}


function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 20; i++) {
            books.push(_createBook(makeLorem(3)))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}



function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}


function updateBookRate(value, bookId) {
    var book = getBookById(bookId)
    if (book.rate === 10 && value === 1 || book.rate === 0 && value === -1) return
    book.rate += value
    saveToStorage()
    return book.rate
}

function moveToPage(page) {
    if (page === '+') gPageIdx++
    else if (page === '-') gPageIdx--
    else gPageIdx = +page
}

function getBooksForDisplay() {
    if (!gBooks || !gBooks.length) _createBooks()
    var books = gBooks

    books = books.filter((book) => book.name.includes(gFilterBy.name))
    books = books.filter((book) => book.price < gFilterBy.maxPrice)

    gFilteredBooksCount = books.length
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}

function setFilterBy(filterBy) {
    if (filterBy.name !== undefined) gFilterBy.name = filterBy.name
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    return gFilterBy
}

function getIsReading(book) {
    return book.isReading ? true : false
}

function getFilterBy() {
    return gFilterBy
}

function getPageCount() {
    return Math.ceil(gFilteredBooksCount / PAGE_SIZE)
}

function getCurrPage() {
    return gPageIdx
}
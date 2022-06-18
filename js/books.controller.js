'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
    renderPageBtns()
}

function renderBooks() {
    const books = getBooksForDisplay()
    var strHTMLs = books.map(book => `
    <tr>
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>${book.price}$</td>
    <td><button data-trans="read" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onclick="onRead('${book.id}')">Read</button></td>
    <td><button data-trans="update" class="btn btn-primary" onclick="onUpdateBook('${book.id}')">Update</button></td>
    <td><button data-trans="delete" class="btn btn-danger" onclick="onDeleteBook('${book.id}')">Delete</button></td>
</tr>`)
    document.querySelector('.box tbody').innerHTML = strHTMLs.join('')
    doTrans()

}



function onDeleteBook(bookId) {
    deleteBooks(bookId)
    renderBooks()
}

function onAddBook() {
    addBook()
    renderBooks()
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('new price?', book.price)
    if (newPrice && book.price !== newPrice) {
        const book = updatePrice(bookId, newPrice)
        renderBooks()
    }


}

function onRead(bookId) {
    console.log('elModal:', elModal)
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal-title')
    elModal.innerText = book.name

    var elModalBody = document.querySelector('.modal-body')
    var strHTML = `<strong data-trans = "price-1">Price:</strong>  <strong>${book.price}$</strong>  <br>
    ${book.desc}`
    elModalBody.innerHTML = strHTML

    var elModalFooter = document.querySelector('.modal-footer')
    elModalFooter.innerHTML = `
    <button onclick="onUpdateRate(1,'${book.id}')">+</button>
    <h6>${book.rate}</h6>
    <button onclick="onUpdateRate(-1,'${book.id}')">-</button>
    <button data-trans="close" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    `

    doTrans()
}



function onUpdateRate(value, bookId) {
    var newRate = updateBookRate(value, bookId)
    if (newRate === undefined) return
    var elBookRate = document.querySelector('h6')
    elBookRate.innerText = newRate
}

function renderPageBtns() {
    const currPage = getCurrPage()
    const pageCount = getPageCount()
    var strHTML = ''
    for (var i = 0; i < pageCount; i++) {
        strHTML += `<button class="btn${i}" onclick="onMoveToPage('${i}', this)">${i + 1}</button>`
    }
    document.querySelector('.page-btns span').innerHTML = strHTML
    document.querySelector(`.btn${currPage}`).classList.add('pressed')
    doTrans()


}

function onSetFilterBy(filterBy) {
    filterBy = setFilterBy(filterBy)
    renderBooks()
    renderPageBtns()
    saveQueryString()
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        name: queryStringParams.get('name') || '',
        maxPrice: +queryStringParams.get('maxPrice') || 50,
    }
    document.querySelector('[name="filter-name"]').value = filterBy.name
    document.querySelector('.filter-price-range').value = filterBy.maxPrice

    setFilterBy(filterBy)
}

function saveQueryString(book = '') {
    const filter = getFilterBy()

    const queryStringParams = `?name=${filter.name}&maxPrice=${filter.maxPrice}&readingId=${book.id}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}



function onMoveToPage(page) {
    moveToPage(page)
    renderPageBtns()
    renderBooks()

    const currPage = getCurrPage()
    document.querySelector(`.btn${currPage}`).classList.add('pressed')
    document.querySelector('.next').disabled = currPage === getPageCount() - 1 ? true : false
    document.querySelector('.prev').disabled = currPage === 0 ? true : false
}


function onSetLang(lang) {
    setLang(lang);
    if (lang === "he") document.body.classList.add("rtl")
    else document.body.classList.remove("rtl")
    doTrans()
}
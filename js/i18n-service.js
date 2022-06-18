'use strict'
var gTrans = {
    title: {
        en: 'Book shop📚',
        he: 'חנות ספרים📚'
    },
    'add-new-book': {
        en: 'add new book',
        he: 'הוספת ספר חדש',
    },
    'search-book': {
        en: 'Search book:',
        he: 'חיפוש ספר:',
    },
    'max-price': {
        en: ' Max Price:',
        he: 'מחיר מקסימלי:'
    },
    id: {
        en: 'ID',
        he: 'איידי',
    },
    'title-book': {
        en: 'Title',
        he: 'שם ספר',
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    'price-1': {
        en: 'Price:',
        he: 'מחיר:',
    },
    action: {
        en: 'Actions',
        he: 'פעולות',
    },
    'by-nisan': {
        en: 'Nisan oliel ©',
        he: 'ניסן אוליאל ©',
    },
    'add-todo-placeholder': {
        en: 'Start typing...',
        he: 'תכתוב כאן...'
    },
    read: {
        en: 'Read',
        he: 'קרא'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        he: 'מחק'
    },
    'book-description': {
        en: 'Book Description',
        he: 'תקציר ספר'
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return "UNKNOWN"
    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)

        if (el.localName === "input") {
            el.placeholder = txt
        } else el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

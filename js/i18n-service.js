'use strict'
var gTrans = {
    title: {
        en: 'Book shop馃摎',
        he: '讞谞讜转 住驻专讬诐馃摎'
    },
    'add-new-book': {
        en: 'add new book',
        he: '讛讜住驻转 住驻专 讞讚砖',
    },
    'search-book': {
        en: 'Search book:',
        he: '讞讬驻讜砖 住驻专:',
    },
    'max-price': {
        en: ' Max Price:',
        he: '诪讞讬专 诪拽住讬诪诇讬:'
    },
    id: {
        en: 'ID',
        he: '讗讬讬讚讬',
    },
    'title-book': {
        en: 'Title',
        he: '砖诐 住驻专',
    },
    price: {
        en: 'Price',
        he: '诪讞讬专',
    },
    'price-1': {
        en: 'Price:',
        he: '诪讞讬专:',
    },
    action: {
        en: 'Actions',
        he: '驻注讜诇讜转',
    },
    'by-nisan': {
        en: 'Nisan oliel 漏',
        he: '谞讬住谉 讗讜诇讬讗诇 漏',
    },
    'add-todo-placeholder': {
        en: 'Start typing...',
        he: '转讻转讜讘 讻讗谉...'
    },
    read: {
        en: 'Read',
        he: '拽专讗'
    },
    update: {
        en: 'Update',
        he: '注讚讻谉'
    },
    delete: {
        en: 'Delete',
        he: '诪讞拽'
    },
    'book-description': {
        en: 'Book Description',
        he: '转拽爪讬专 住驻专'
    },
    close: {
        en: 'Close',
        he: '住讙讜专'
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

'use strict'

const listId = location.hash.substring(1)
let lists = getSavedLists()
let list = lists.find((list) => list.id === listId)

if (!list) {
    location.assign('/index.html')
}

const titleElement = document.querySelector('#list-title')
// const dateElement = document.querySelector('#last-edited')
titleElement.value = list.title
// dateElement.textContent = generateLastEdited(list.updatedAt)
titleElement.addEventListener('input', (e) => {
    list.title = e.target.value
    list.updatedAt = moment().valueOf()
    // dateElement.textContent = generateLastEdited(list.updatedAt)
    saveLists(lists)
})

const filters = {
    searchText: '',
    hideCompleted: false
}

renderList(list.body, filters)

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderList(list.body, filters)
})

document.querySelector('#new-item').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()
    if(text.length>0) {
        list.body.push({
            id: uuidv4(),
            text: text,
            completed: false
        })
        list.updatedAt = moment().valueOf()
        saveLists(lists)
        renderList(list.body, filters)
    }
    e.target.elements.text.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderList(list.body, filters)
})

document.querySelector('#remove-checked').addEventListener('click', () => {
    const confiremed = confirm('Are you sure?')
    if (confiremed) {
        removeCheckedItems(list)
        saveLists(lists)
        renderList(list.body,filters)
    }
})

document.querySelector('#confirm-button').addEventListener('click', () => {
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'lists') {
        lists = JSON.parse(e.newValue)
        list = lists.find((note) => note.id === listId)

        if (!list) {
            location.assign('/index.html')
        }

        titleElement.value = list.title
        // bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(list.updatedAt)
    }
})
'use strict'

// Read existing notes from localStorage
const getSavedLists = () => {
    const notesJSON = localStorage.getItem('lists')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    } 
}

// Save the notes to localStorage
const saveLists = (lists) => {
    localStorage.setItem('lists', JSON.stringify(lists))
}

// Remove a note from the list
const removeList = (id) => {
    const listIndex = lists.findIndex((list) => list.id === id)
    if (listIndex > -1) {
        lists.splice(listIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateShoppingListsDOM = (list) => {
    const listElem = document.createElement('a')
    const divElem = document.createElement('div')
    const textElem = document.createElement('p')
    const dateElem = document.createElement('p')
    const button = document.createElement('button')

    // Setup the note title text
    textElem.textContent = list.title.length>0 ? list.title : 'Unnamed note'
    textElem.classList.add('list-item__title')
    divElem.appendChild(textElem)

    listElem.setAttribute('href', `/list.html#${list.id}`)
    listElem.classList.add('list-item')

    //Setup data elem
    dateElem.classList.add('list-item__date')
    dateElem.textContent = generateLastEdited(list.updatedAt)
    divElem.appendChild(dateElem)

    listElem.appendChild(divElem)

    // Setup the remove note button
    button.textContent = 'x'
    button.classList.add('button','button--text')
    listElem.appendChild(button)
    button.addEventListener('click', () => {
        removeList(list.id)
        saveLists(lists)
        renderShoppingLists(lists, filters)
    })

    return listElem
}

// Sort your notes by one of three ways
const sortLists = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a,b) => b.updatedAt - a.updatedAt)
    } else if (sortBy === 'byCreated') {
        return notes.sort((a,b) => b.createdAt - a.createdAt)
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
}

// Render application notes
const renderShoppingLists = (lists, filters) => {
    const allListsElem = document.querySelector('#lists')
    lists = sortLists(lists, filters.sortBy)
    const filteredLists = lists.filter((list) => list.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    allListsElem.innerHTML = ''

    if (filteredLists.length>0) {
        filteredLists.forEach((list) => {
            const listElem = generateShoppingListsDOM(list)
            allListsElem.appendChild(listElem)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        allListsElem.appendChild(emptyMessage)
    }
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}
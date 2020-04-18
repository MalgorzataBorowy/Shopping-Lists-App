'use strict'
// Remove todo by id
const removeListItem = (id) => {
    const itemIndex = list.body.findIndex((item) => item.id === id)
    if (itemIndex > -1) {
        list.body.splice(itemIndex, 1)
    }
    list.updatedAt = moment().valueOf()
}

//Remove checked
const removeCheckedItems = (list) => {
    const checkedItems = list.body.filter((item) => item.completed)
    checkedItems.forEach((item) => {
        removeListItem(item.id)
    })
}

// Toggle the completed value for a given todo
const toggleItem = (id) => {
    const item = list.body.find((item) => item.id === id)
    if (item) {
        item.completed = !item.completed
    }
    list.updatedAt = moment().valueOf()
}

// Render application todos based on filters
const renderList = (items, filters) => {
    // dateElement.textContent = generateLastEdited(list.updatedAt)
    const filteredLists = items.filter((item) => {
        const searchTextMatch = item.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !item.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteItems = filteredLists.filter((item) => !item.completed)

    document.querySelector('#list').innerHTML = ''
    document.querySelector('#list').appendChild(generateSummaryDOM(incompleteItems))

    filteredLists.forEach((item) => {
        document.querySelector('#list').appendChild(generateListDOM(item))
    })
}

// Get the DOM elements for an individual note
const generateListDOM = (item) => {

    const itemElement = document.createElement('label')
    const containerElem = document.createElement('div')
    const checkbox = document.createElement('input')
    const itemText = document.createElement('p')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.classList.add('checkbox')
    checkbox.checked = item.completed
    containerElem.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleItem(item.id)
        saveLists(lists)
        renderList(list.body, filters)
    })

    // Setup the todo text
    itemText.textContent = item.text
    item.completed ? itemText.classList.add('list-item__text--checked','list-item__text') : itemText.classList.add('list-item__text')
    containerElem.appendChild(itemText)

    //Setup container elem
    itemElement.classList.add('list-item')
    containerElem.classList.add('list-item__container')
    itemElement.appendChild(containerElem)

    // Setup the remove button
    removeButton.textContent = 'x'
    removeButton.classList.add('button', 'button--text')
    itemElement.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeListItem(item.id)
        saveLists(lists)
        renderList(list.body, filters)
    })

    return itemElement
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteItems) => {
    const summary = document.createElement('h3')
    const item = incompleteItems.length === 1 ? 'item' : 'items'
    summary.textContent = `You have ${incompleteItems.length} ${item} left.`
    return summary
}
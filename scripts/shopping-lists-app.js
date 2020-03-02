'use strict'

let lists = getSavedLists()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderShoppingLists(lists, filters)

document.querySelector('#create-list').addEventListener('click', (e) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    lists.push({
        id: id,
        title: '',
        createdAt: timestamp,
        updatedAt: timestamp,
        body: []
    })
    saveLists(lists)
    location.assign(`/list.html#${id}`)
})

document.querySelector('#remove-all').addEventListener('click',(ev) => {
    const conf = confirm('Are you sure you want to remove all lists?')
    if (conf) {
        lists.splice(0,lists.length)
        saveLists(lists)
        renderShoppingLists(lists,filters)
    }
    else {
        console.log(conf)
    }

})

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderShoppingLists(lists, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderShoppingLists(lists, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'lists') {
        lists = JSON.parse(e.newValue)
        renderShoppingLists(lists, filters)
    }
})

const fs = require('fs')

function addList(id, key, response, isImage, image_url, _db) {
    var obj_add = {
        id: id,
        key: key,
        response: response,
        isImage: isImage,
        image_url: image_url
    }
    _db.push(obj_add)
}

function getDataList(id, key, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === id && _db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        return _db[position]
    }
}

function isAlreadyList(id, key, _db) {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === id && _db[x].key === key) {
            found = true
        }
    })
    return found
}

function sendList(id, key, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === id && _db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        return _db[position].response
    }
}

function isAlreadyListGroup(id, _db) {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === id) {
            found = true
        }
    })
    return found
}

function delList(id, key, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === id && _db[x].key === key) {
            position = x
        }
    })

    if (position !== null) {
        _db.splice(position, 1)
    }
}

function updateList(id, key, response, isImage, image_url, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === id && _db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        _db[position].response = response
        _db[position].isImage = isImage
        _db[position].image_url = image_url
    }
}

function renameList(id, key, newKey, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === id && _db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        _db[position].key = newKey
    }
}

module.exports = {
    addList,
    delList,
    isAlreadyList,
    isAlreadyListGroup,
    sendList,
    updateList,
    renameList,
    getDataList
}

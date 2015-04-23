module.exports = DecisionTable

var levelup = require('levelup')
var selectn = require('selectn')

function DecisionTable (columns, table, opts) {
  if (!opts) opts = {}
  var db_path = opts.db_path || '/' + 'decisiontable/' + Date.now()

  var self = this

  this.columns = columns
  this.db = levelup(db_path, {
    db: opts.db_type || require('memdown'),
    keyEncoding: 'json',
    valueEncoding: 'json'
  })

  if (!table || typeof table !== 'object' || table.length === 0) return
  table.forEach(function (row) {
    if (!row || typeof row !== 'object' || row.length === 0) return

    var val = row.pop()
    self.db.put(row, val)
  })
}

DecisionTable.prototype.addRow = function (row) {
  if (!row || typeof row !== 'object' || row.length === 0) return
  var val = row.pop()
  this.db.put(row, val)
}

DecisionTable.prototype.run = function (thing, cb) {
  var key = []

  if (Array.isArray(thing)) {
    key = thing
  } else if (typeof thing === 'object') {
    this.columns.forEach(function (col) {
      var col_entry = selectn(col, thing)
      key.push(col_entry)
    })
  }
  this.db.get(key, cb)

}

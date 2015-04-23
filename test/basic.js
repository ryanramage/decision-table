var test = require('tape')
var DecisionTable = require('..')

var person = {
  first: 'Ryan',
  last: 'Ramage',
  type: 'b',
  count: 2,
  applied: true,
  emotion: 'happy'
}

var category_table = new DecisionTable(
  ['type', 'count', 'applied', 'emotion'],
  [
    ['a', 1, true, 'happy', 1],
    ['a', 1, true, 'sad', 2],
    ['a', 1, false, 'happy', 3],
    ['a', 1, false, 'sad', 4],
    ['a', 2, true, 'happy', 5],
    ['a', 2, true, 'sad', 6],
    ['a', 2, false, 'happy', 7],
    ['a', 2, false, 'sad', 8],
    ['b', 1, true, 'happy', 9],
    ['b', 1, true, 'sad', 10],
    ['b', 1, false, 'happy', 11],
    ['b', 1, false, 'sad', 12],
    ['b', 2, true, 'happy', 13],
    ['b', 2, true, 'sad', 14],
    ['b', 2, false, 'happy', 15],
    ['b', 2, false, 'sad', 16]
  ]
)

test('decision-table example, with object access', function (t) {
  category_table.decide(person, function (err, category) {
    t.error(err)
    t.equal(category, 13, 'we get the correct category')
    t.end()
  })
})

test('decision-table example, with array access', function (t) {
  category_table.decide(['b', 2, true, 'happy'], function (err, category) {
    t.error(err)
    t.equal(category, 13, 'we get the correct category')
    t.end()
  })
})

test('add a row', function (t) {
  category_table.addRow(['c', 1, false, 'nervous', 55])

  category_table.decide(['c', 1, false, 'nervous'], function (err, category) {
    t.error(err)
    t.equal(category, 55, 'we get the correct category')
    t.end()
  })

})

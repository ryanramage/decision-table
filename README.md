decision-table
===============

When you dont want a lot of ugly if statments. Provides a compact decision logic in a table-like layout.

install
-------

    npm i decision-table 


usage
-----



    var table = new DecisionTable(
      ['type', 'count', 'applied', 'emotion'],
      [
        ['a', 1, true,  'happy', 1],
        ['a', 1, true,  'sad',   2],
        ['a', 1, false, 'happy', 3],
        ['a', 1, false, 'sad',   4],
        ['a', 2, true,  'happy', 5],
        ['a', 2, true,  'sad',   6],
        ['a', 2, false, 'happy', 7],
        ['a', 2, false, 'sad',   8],
        ['b', 1, true,  'happy', 9],
        ['b', 1, true,  'sad',   10],
        ['b', 1, false, 'happy', 11],
        ['b', 1, false, 'sad',   12],
        ['b', 2, true,  'happy', 13],
        ['b', 2, true,  'sad',   14],
        ['b', 2, false, 'happy', 15],
        ['b', 2, false, 'sad',   16]
      ]
    )

Create a new instance. 
The first arg is an array of columns. Helps you see what you are inputing.
The second arg is the table. It is an array of rows. Just fill it up with all 
the permutations of values that you need to decide on. The last value is the return value
for a match.

    table.run(['b', 2, true, 'happy'], function (err, category) {
      t.equal(category, 13, 'we get the correct category')
    })

Run a match on the table.

Much easier on the eyes then a bunch of if or switch stmts. 


objects
-------

Because the column names have been defined, you can also run a decision on an object. eg

    var person = {
      first: 'Ryan',
      last: 'Ramage',
      type: 'b',
      count: 2,
      applied: true,
      emotion: 'happy'
    }

    table.run(person, function (err, category) {
      t.equal(category, 13, 'we get the correct category')
    })

Persist
=======

The table uses levelup, with a default memdown backing. So you could swap out to a persistant store for 
very large tables.






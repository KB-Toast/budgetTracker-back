var express = require('express');
var router = express.Router();

require('../models/connection');
const MonthlyExpense = require('../models/monthlyExpenses');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

router.get('/', (req, res) => {
    MonthlyExpense.find().then(data => {
        res.json({ result: true, data: data })
    });
})

// replace with Token functionality whenever it's done, ctrlF "rTokenF"
const defaultToken = 'CtsxMr5V96TrT0BcdV1MErwIHPkB1Mv-';

// rTokenF router.post('/add/:token', (req, res) => {
router.post('/add', (req, res) => {
    if (!checkBody(req.body, ['name', 'period', 'cost'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
      }
    // rTokenF User.findOne({ token: req.params.token }).then(data => {
    MonthlyExpense.findOne({ token: defaultToken }).then(data => {
        const newMonthlyExpense = new MonthlyExpense ({
            period: req.body.period,
            name: req.body.name,
            cost: req.body.cost,
            owner: data.id
          });
          newMonthlyExpense.save().then(newDoc => {
            res.json({ result: true, newMonthlyExpense: newDoc })
        });
      })
})

 module.exports = router;
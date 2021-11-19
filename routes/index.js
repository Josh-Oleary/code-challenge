const express = require("express");
const router = express.Router();
const data = require("../data/sample.json");
const Fuse = require("fuse.js");

const options = {
  isCaseSensitive: false,
  findAllMatches: false,
  minMatchCharLength: 2,
	shouldSort: true,
  keys: [
    "loan_number",
    "first_name",
		"last_name",
		"city",
  ]
};
const options_first = {
  isCaseSensitive: false,
  findAllMatches: false,
  minMatchCharLength: 2,
	shouldSort: true,
  keys: [
    "first_name",
  ]
};
const options_last = {
  isCaseSensitive: false,
  findAllMatches: false,
  minMatchCharLength: 2,
	shouldSort: true,
  keys: [
		"last_name",
  ]
};
const options_city = {
  isCaseSensitive: false,
  findAllMatches: false,
  minMatchCharLength: 2,
	shouldSort: true,
  keys: [
		"city",
  ]
};

const first_names = [];
const last_names = [];
const cities = [];

function parseAutoCompleteData(arr){
	for(let loan of data){
		first_names.push(loan.first_name)
		last_names.push(loan.last_name)
		cities.push(loan.city)
	}
}

parseAutoCompleteData(data);

/* GET home page. */
router.get("/", function(req, res) {
	res.render("index");
});

router.get("/data", function(req, res) {
	res.render('all_loans', { loans: data });
})

router.get("/number", function(req, res) {
	const loan_num = req.query.loan_number;
	const positive_match = data.find(element => element.loan_number === loan_num);
	positive_match ? res.render('singleLoan', { loan: positive_match }) : res.send('No matching loans') 
})

router.get("/search", function(req, res) {
	const pattern = req.query.query;
	const fuse = new Fuse(data, options);
	let search_result = fuse.search(pattern)
	res.render('result', { loans: search_result });
})
router.get("/search/first", function(req, res) {
	const pattern = req.query.first;
	const fuse = new Fuse(data, options_first);
	let search_result = fuse.search(pattern)
	res.render('result', { loans: search_result });
})
router.get("/search/last", function(req, res) {
	const pattern = req.query.last;
	const fuse = new Fuse(data, options_last);
	let search_result = fuse.search(pattern)
	res.render('result', { loans: search_result });
})
router.get("/search/city", function(req, res) {
	const pattern = req.query.city;
	const fuse = new Fuse(data, options_city);
	let search_result = fuse.search(pattern)
	res.render('result', { loans: search_result });
})


module.exports = router;
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res) {
	res.render('index', {
		page: ""
	});
});

//Get data from urban legends table
router.get('/urban_legends', function(req, res, next) {
	req.getConnection(function(err, connection) {
		if (err) {
			return next(err);
		}

		connection.query('SELECT * FROM legends_table', function(err, result) {
	        if(err){
	            throw next(err);
	        } else {
				result.forEach(function (row) {
					row.content = `<div><p>${row.content.replace(/\s\s/g, "</p><p>")}</p></div>`.replace(/<p><\/p>/g, "");
				});
				
				res.render('urban_legends', {
						page: "- Urban Legends",
						print: result
					}
				);
			}
        });
	});
});

//Get data from unsolved mysteries table
router.get('/unsolved_mysteries', function(req, res, next) {
	req.getConnection(function(err, connection) {

		if (err) {
			return next(err);
		}

		connection.query('SELECT * FROM mysteries_table', function(err, result) {
	        if(err){
	            throw next(err);
	        } else {
				result.forEach(function (row) {
					row.content = `<div><p>${row.content.replace(/\s\s/g, "</p><p>")}</p></div>`.replace(/<p><\/p>/g, "");
				});

				res.render('unsolved_mysteries', {
						page: "- Unsolved Mysteries",
						print: result
					}
				);
			}
        });
	});
});

//Get data from the weird side of youtube table
router.get('/the_weird_side_of_youtube', function(req, res, next){
	req.getConnection(function(err, connection) {
		if (err) {
			return next(err);
		}

		connection.query('SELECT * FROM videos_table', function(err, result) {
	        if(err){
	            throw next(err);
	        } else {
				res.render('the_weird_side_of_youtube', {
						page: "- The Weird Side of YouTube",
						print: result
					}
				);
			}
        });
	});
});

router.get('/login', function(req, res) {
	let error = "";
	if (req.query.status === "error") {
		error = "Incorrect Username and/or Password";
	} else if (req.query.status === "empty") {
		error = "Please enter Username and Password";
	}
	if (!req.session.loggedin) {
		res.render('login', {
			page: "- Login Page",
			error: error
		});
	} else {
		res.redirect("/admin");
	}
});

router.post('/auth', function(req, res) {
	req.getConnection(function(err, connection) {
		if (err) {
			return next(err);
		}

		let username = req.body.username;
		let password = req.body.password;
		if (username && password) {
			connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
				if (results.length > 0) {
					req.session.loggedin = true;
					req.session.username = username;
					res.redirect('/admin');
				} else {
					res.redirect('/login?status=error');
				}			
				res.end();
			});
		} else {
			res.redirect('/login?status=empty');
			res.end();
		}
	});
});

/*Admin Page*/
/*==================================================*/

//CRUD for tables

router.get('/admin', function(req, res, next) {
	if (req.session.loggedin) {
		res.render('admin', {
			page: "- Admin Page"
		});
	} else {
		res.redirect("/login");
	}
});

router.post('/logout', function(req, res) {
	const data = req.body;
	if (req.session.loggedin) {
		req.session.loggedin = false;
	}
	res.redirect("/login");
});

router.get('/admin_legends', function(req, res, next) {
	if (req.session.loggedin) {
		req.getConnection(function(err, connection) {
			if (err) {
				return next(err);
			}

			connection.query('SELECT * FROM legends_table', function(err, result) {
				if(err){
					throw next(err);
				} else {
					res.render('admin_legends', {
							page: "- Admin Legends",
							print: result
						}
					);
				}
			});
		});
	} else {
		res.redirect("/login");
	}
});

router.get('/admin_mysteries', function(req, res, next) {
	if (req.session.loggedin) {
		req.getConnection(function(err, connection) {
			if (err) {
				return next(err);
			}

			connection.query('SELECT * FROM mysteries_table', function(err, result) {
				if(err){
					throw next(err);
				} else {
					res.render('admin_mysteries', {
							page: "- Admin Mysteries",
							print: result
						}
					);
				}
			});
		});
	} else {
		res.redirect("/login");
	}
});

router.get('/admin_videos', function(req, res, next) {
	if (req.session.loggedin) {
		req.getConnection(function(err, connection) {
			if (err) {
				return next(err);
			}

			connection.query('SELECT * FROM videos_table', function(err, result) {
				if(err){
					throw next(err);
				} else {
					res.render('admin_videos', {
							page: "- Admin Videos",
							print: result
						}
					);
				}
			});
		});
	} else {
		res.redirect("/login");
	}
});

router.post('/add_legend', function(req, res) {
	const data = req.body;
	req.getConnection((err, connection) => {
		const query = connection.query('INSERT INTO legends_table set ?', data, (err, newEntry) => {
			res.redirect('/admin_legends');
		});
	});
});

router.post('/add_mystery', function(req, res) {
	const data = req.body;
	req.getConnection((err, connection) => {
		const query = connection.query('INSERT INTO mysteries_table set ?', data, (err, newEntry) => {
			res.redirect('/admin_mysteries');
		});
	});
});

router.post('/add_video', function(req, res) {
	const data = req.body;
	req.getConnection((err, connection) => {
		const query = connection.query('INSERT INTO videos_table set ?', data, (err, newEntry) => {
			res.redirect('/admin_videos');
		});
	});
});

router.get('/delete_legend/:id', function(req, res) {
	const { id } = req.params;
	req.getConnection(function(err, conn) {
		conn.query('DELETE FROM legends_table WHERE legend_id = ?', [id], (err, rows) => {
			res.redirect('/admin_legends');
		});
	});
});

router.get('/delete_mystery/:id', function(req, res) {
	const { id } = req.params;
	req.getConnection(function(err, conn) {
		conn.query('DELETE FROM mysteries_table WHERE mystery_id = ?', [id], (err, rows) => {
			res.redirect('/admin_mysteries');
		});
	});
});

router.get('/delete_video/:id', function(req, res) {
	const { id } = req.params;
	req.getConnection(function(err, conn) {
		conn.query('DELETE FROM videos_table WHERE video_id = ?', [id], (err, rows) => {
			res.redirect('/admin_videos');
		});
	});
});

router.get('/edit_legends/:id', function(req, res) {
	const { id } = req.params;
	
	req.getConnection(function(err, conn) {
		conn.query('SELECT * FROM legends_table WHERE legend_id = ?', [id], function(err, rows) {
			res.render('edit_legends', {
				page: "- Edit Legend",
				print: rows[0]
			});
		});
	});
});

router.get('/edit_mysteries/:id', function(req, res) {
	const { id } = req.params;
	const newEntry = req.body;
	req.getConnection(function(err, conn) {
		conn.query('SELECT * FROM mysteries_table WHERE mystery_id = ?', [id], function(err, rows) {
			res.render('edit_mysteries', {
				page: "- Edit Mystery",
				print: rows[0]
			});
		});
	});
});

router.get('/edit_videos/:id', function(req, res) {
	const { id } = req.params;
	const newEntry = req.body;
	req.getConnection(function(err, conn) {
		conn.query('SELECT * FROM videos_table WHERE video_id = ?', [id], function(err, rows) {
			res.render('edit_videos', {
				page: "- Edit Video",
				print: rows[0]
			});
		});
	});
});

router.post('/update_legends/:id', function(req, res) {
	const { id } = req.params;
	const newEntry = req.body;
	req.getConnection(function(err, conn) {
		conn.query('UPDATE legends_table set ? where legend_id = ?', [newEntry, id], (err, rows) => {
			res.redirect('/edit_legends/' + id);
		});
	});
});

router.post('/update_mysteries/:id', function(req, res) {
	const { id } = req.params;
	const newEntry = req.body;
	req.getConnection(function(err, conn) {
		conn.query('UPDATE mysteries_table set ? where mystery_id = ?', [newEntry, id], (err, rows) => {
			res.redirect('/edit_mysteries/' + id);
		});
	});
});

router.post('/update_videos/:id', function(req, res) {
	const { id } = req.params;
	const newEntry = req.body;
	req.getConnection(function(err, conn) {
		conn.query('UPDATE videos_table set ? where video_id = ?', [newEntry, id], (err, rows) => {
			res.redirect('/edit_videos/' + id);
		});
	});
});

module.exports = router;

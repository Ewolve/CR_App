var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app);
var config = require('./config.json');
var quiz = require('./quiz.json');
var bodyParser= require('body-parser');
var jsonParser = bodyParser.json();

server.listen(process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
	console.log('got request by: ' + req.ip + ' to access: ' + req.url);
	switch (req.url)
	{
		case "/": res.sendFile(__dirname + '/public/pages/index.html'); console.log('@' + req.ip + ' : ' + __dirname + '/public/pages/index.html'); break;
		case "/favicon.ico": res.sendFile(__dirname + '/public/images/favicon.ico'); console.log('@' + req.ip + ' : ' + __dirname + '/public/images/favicon.ico'); break;
		case "/questions": res.sendFile(__dirname + '/quiz.json'); break;
		case "/end": res.sendFile(__dirname + '/public/pages/subpages/end.html'); break;
		case "/start": res.sendFile(__dirname + '/public/pages/subpages/start.html'); break;
		case "/quiz": res.sendFile(__dirname + '/public/pages/subpages/questions.html'); break;
		default: res.sendFile(__dirname + '/public/pages/404.html'); console.log('@' + req.ip + ' : ' + 'was unable to find requested url - gave 404!'.red);
	}
});

app.post('/request', jsonParser, function (req, res){
	console.log(JSON.stringify(req.body.map,null,4));
	console.log("key : " + req.body.key);
	var temp = req.body.key;
	
	var R = {value : (temp.match(/R/g) || []).length, name: "#<b>Sprach</b>rohr"}
	var L = {value : (temp.match(/L/g) || []).length, name: "#<b>Sternen</b>pflücker"}
	var H = {value : (temp.match(/H/g) || []).length, name: "#<b>Hoffnungs</b>flüsterer"}
	var M = {value : (temp.match(/M/g) || []).length, name: "#<b>Menschen</b>fischer"}
	var B = {value : (temp.match(/B/g) || []).length, name: "#<b>Bau</b>meister"}
	
	var highes = Math.max(R.value, L.value, H.value, M.value, B.value);
	var Text = "<i>";
	
	if (highes == R.value) {Text += R.name + "\n"};
	if (highes == L.value) {Text += L.name + "\n"};
	if (highes == H.value) {Text += H.name + "\n"};
	if (highes == M.value) {Text += M.name + "\n"};
	if (highes == B.value) {Text += B.name + "\n"};
	
	Text += "</i>"
	res.end(Text);
});



console.log('server listens to :' + ' http://127.0.0.1:' + config.port.toString() + '/');
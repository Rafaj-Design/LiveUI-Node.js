var LiveUI = require('../index');
var lui = new LiveUI("2AB3D033-10F8-48E8-9A1E-50A952CB0831");

var http = require('http');
var dispatcher = require('httpdispatcher');

//Lets define a port we want to listen to
const PORT = 8080;

dispatcher.setStatic('resources');

//A sample GET request    
dispatcher.onGet("/", function(req, res) {
	var string = '<h4>Page One!! Path Hit: ' + req.url + '</h4>';
	string = string + '<p>LUITranslate: ' + lui.translation('KEY') + '</p>';
	string = string + '<p>LUIImage: ' + lui.image('KEY') + '</p>';
	string = string + '<p>LUIColor: ' + lui.color('KEY') + '</p>';
	string = string + '<p>LUIColorAlpha: ' + lui.colorAlpha('KEY') + '%</p>';

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(string);
});    


//We need a function which handles requests and send response
function handleRequest(request, response) {    
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
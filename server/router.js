var express=require('express');
var router = express.Router();

router.get('/hola',function(req,resp){
	var data = [{a:5,b:'andres'},{a:7,b:'pedro'}];
	resp.send(data);
});


router.get('/adios',function(req,resp){
	resp.send('<html><body><h1>hola '+req.query.nombre+'</h1></body></html>');
});


module.exports = router;

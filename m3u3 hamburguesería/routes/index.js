var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/',async(req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to:'nahuel.rojas.u@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + " " + apellido + " se contacto a través de la web y quiere más información a este correo: " + email + ". <br>Además, hizo este comentario: " + mensaje + ". <br> Su tel es: " + tel
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.MPT_USER,
      pass: process.env.SMPT_PASS
    }
  });
  
  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'mensaje enviado correctamente'
  })
})

module.exports = router;

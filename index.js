const express = require('express');
const MailController = require('./Controllers/MailController');
  app = express(),
  port = 3000,

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get( '/send-mail', ( req, res ) => {
  try {
    MailController.sampleMail()
    .then( () => {
      return res.status( 200 ).type('json').send( 'Email sent successfully' )
    })
  } catch (error) {
    res.status( 500 ).send( 'Unknown error' )
    throw error;
  }
})

app.get( '/send-html-mail', ( req, res ) => {
  try {
    MailController.htmlMail()
    .then( () => {
      return res.status( 200 ).type('json').send( 'HTML email sent successfully' )
    })
  } catch (error) {
    res.status( 500 ).send( 'Unknown error' )
    throw error;
  }
})

app.get( '/attaching-pdf', ( req, res ) => {
  try {
    MailController.attachedFileMail()
    .then( () => {
      return res.status( 200 ).type('json').send( 'PDF attached and mail sent successfully' )
    })
  } catch (error) {
    res.status( 500 ).send( 'Unknown error' )
    throw error;
  }
})

app.get( '/html-to-pdf', ( req, res ) => {
  try {
    MailController.htmlToPdfMail()
    .then( () => {
      return res.status( 200 ).type('json').send( 'PDF attached and mail sent successfully' )
    })
  } catch (error) {
    res.status( 500 ).send( 'Unknown error' )
    throw error;
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
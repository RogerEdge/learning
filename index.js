const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

//session storage
const session = {
  code: 'JTE7MC',
  user: undefined, // becomes populated on user long
  admin: undefined // becomes populated on admin long
}

// ADMIN Define a route for submitting a form
app.post('/submit-form', (req, res, next) => {
  const formData = req.body;
  // Do something with the form data here
  if (formData.code !== '031600') {
    const error = new Error('forbidden')
    error.status = 403;
    return next(error);
  }
  //const code = generateCode();
  const code = 'JTE7MC';
  session.code = code
  res.json({ code: code });
});

app.post('/push-user', (req, res, next) => {
  const formData = req.body;

  // reject any invalid requests
  const valid = isCodeValid(formData.code);
  if (!valid) {
    const error = new Error('forbidden')
    error.status = 403;
    return next(error);
  }

  console.log('///// guard code')


  // only admin can push user data
  if (formData.isAdmin === 1) {
    // prevent bad requests
    if (!formData.userSession) {
      console.warn('🟠 no user session')
      return
    }

    /*session.admin.userSession = session.admin.userSession || {}
    session.admin.userSession = mergeObjects(session.admin.userSession, formData.userSession)

    const noDate = !formData.userSession.lastUpdatedAt && session.user.lastUpdatedAt
    const outDated = formData.userSession.lastUpdatedAt<session.user.lastUpdatedAt

    console.log('noDate', noDate)
    console.log('outDated', outDated)
    console.log('GGGGG',formData.userSession.lastUpdatedAt-session.user.lastUpdatedAt )

    if (noDate || outDated) {
      const error = new Error('out of date update')
      error.status = 400;
      return next(error);

    }*/


    // merge existing user data with formData
    session.user = mergeObjects(session.user, formData.userSession)
    session.user.lastUpdatedAt = Date.now()
  } else{
    session.user = mergeObjects(session.user, formData)
    session.user.lastUpdatedAt = Date.now()
  }

  console.info('pushed data',session.user)
})


app.post('/repost', (req, res, next) => {
  let formData = req.body;
  const valid = isCodeValid(formData.code);
  if (!valid) {
    const error = new Error('forbidden')
    error.status = 403;
    return next(error);
  }

  session.user = session.user || {}

  if (formData.isAdmin === 1) {
    session.admin = formData
    //the admin always gets the users data
    res.json(session.user);
  } else {
    res.json(session.user);

    //we decided not to update info here only read
    /*
    session.user = session.user || formData

    if (session.user.lastUpdatedAt) {
      if (!formData.lastUpdatedAt || session.user.lastUpdatedAt > formData.lastUpdatedAt) {
        formData = mergeObjects(formData, session.user)
        console.warn('🟠 server session was newer than user session')
      }
    }
    session.user = mergeObjects(session.user, formData)

    session.user.lastUpdatedAt = Date.now()
    res.json(session.user);*/
  }
});

app.post('/submit-nsync', (req, res, next) => {
  const formData = req.body
  const valid = isCodeValid(formData.code);
  // Do something with the form data here
  if (!valid) {
    console.warn('incorrect code expected ', session.code, 'but got', formData.code)
    const error = new Error('incorrect code')
    error.status = 403;
    return next(error);
  }
  session.status = 'ok'
  res.send('ok');
});

// check if user has entered code yet
app.get('/check-user-status', (req, res, next) => {
  if (session.status == 'ok') {
    res.send(session.status);
    return
  }
  const error = new Error('not ready')
  error.status = 401;
  return next(error);
});

// Define a default route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

function generateCode() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    const randomChar = chars[randomIndex];
    code += randomChar;
  }

  return code.toUpperCase();
}

function isCodeValid(code) {
  return code && code.toUpperCase() == session.code
}


function mergeObjects(obj1, obj2) {
  const result = {};

  for (let key in obj1) {
    if (Array.isArray(obj1[key])) {
      result[key] = obj1[key];
      if (Array.isArray(obj2[key])) {
        result[key] = obj2[key];

      }
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      result[key] = mergeObjects(obj1[key], obj2[key]);
    } else {
      result[key] = obj1[key];
    }
  }

  for (let key in obj2) {
    //if (!result.hasOwnProperty(key)) {
    result[key] = obj2[key];
    //}
  }

  return result;
}

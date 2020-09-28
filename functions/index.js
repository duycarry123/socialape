const app = require('express')();
const functions = require('firebase-functions');

const { getAllScreams, postOneScream, getScream, commentOnScream } = require('./handlers/screams')
const { signUp, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users')
const FBauth = require('./util/FBauth')

// * Scream Route
// Tạo dữ liệu gửi lên database
app.post('/screams', FBauth, postOneScream)
// Lấy tất cả dữ liệu từ database database
app.get('/screams', getAllScreams)
app.get('/screams/:screamId', getScream)
app.post('/screams/:screamId/comment', FBauth, commentOnScream)


// * User Route
// Signup Route
app.post('/signup', signUp)
// Login route
app.post('/login', login)
app.post('/user/image', FBauth, uploadImage)
app.post('/user', FBauth, addUserDetails)
app.get('/user', FBauth, getAuthenticatedUser)
//*  https://baseurl.com/api/
// functions.https.onRequest sẽ bắt được sự kiện khi có request đến
// Tạo ra functions kết hợp vs express để tạo ra url như thế này https://baseurl.com/api/screams
exports.api = functions.https.onRequest(app);
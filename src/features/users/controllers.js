const admin = require('firebase-admin');
const serviceAccount = require("./hackaton-ia-8-firebase-adminsdk-uta75-472ddecd01.json");
const SuggestionIA = require('../../utils/sugestion-ia');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackaton-ia-8.firebaseio.com"
});

let db = admin.firestore();

async function getUser(req, res, next) {
  const {userId} = req.params
  db.collection('users').doc(userId).get().then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());

      return res.send(doc.data())
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
}

async function getUserRecommendations(req, res, next) {
  const {userId} = req.params
  const user = await db.collection('users').doc(userId).get().then(doc => doc.data())

  const curiculum = await SuggestionIA.getCiriculum(user.competence)

  const vocation = await SuggestionIA.getVocation(user.interest, user.interest)

  return res.send({curiculum, vocation})
}


module.exports = {
  getUser,
  getUserRecommendations,
};

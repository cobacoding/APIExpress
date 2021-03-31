const db = require('../services/db');
// const helper = require('../helper');
// const config = require('../config');

// async function create(data, callback) {
// module.exports = {
//     create: (data, callback) => {
//         db.query(
//             `insert into registration(firstName, lastName, gender, email, password, number)
//                 values(?,?,?,?,?,?)`,
//             [
//                 data.first_name,
//                 data.last_name,
//                 data.gender,
//                 data.email,
//                 data.password,
//                 data.number
//             ],
//             (error, results, fields) => {
//                 if (error) {
//                 return callback(error);
//                 }
//                 return callback(null, results);
//             }
//         );
//     }

// }


//   module.exports = {
//     create,
//   }


async function create(post) {
    const result = await db.query(
      `insert into registration(firstName, lastName, gender, email, password, number)
      VALUES (?,?,?,?,?,?)`,
      [
        post.firstName, post.lastName, post.gender, post.email, post.password, post.number
      ]
    );
  
    let message = 'Error POST'
  
    if (result.affectedRows) {
      message = 'Success'
    }
  
    return {message};
}

module.exports = {
create,
}
const Link = require('../models/Link')

class UserService {
  static async updateUserLinksWithSession (sessionId, userId) {
    await Link.updateMany(
      { session: sessionId },
      { user: userId },
      { upsert: true },
      function (err, result) {
        if (err) {
          return res.json({ status: 422, error: error.toString() })
        } else {
          res.json({ status: 200 })
        }
      }
    )
  }
}

export default UserService

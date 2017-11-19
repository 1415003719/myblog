let mongoose = require('mongoose')

let connect = async (url) => {
  try {
    let connector = await mongoose.connect('mongodb://127.0.0.1:27017/myBlog')
    return connector
  } catch (err) {
    return err
  }
}

export default connect

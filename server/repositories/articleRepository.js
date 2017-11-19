let mongoose = require('mongoose')
let Schema = mongoose.Schema

let schemaOptions = {autoIndex: false, collection: 'articles', discriminatorKey: '_type'}
let ArticleRepositorySchema = new Schema({
  content: {type: String, required: true},
  title: {type: String, required: true},
  introduction: {type: String, required: true},
  publicationDate: {type: Date, required: true},
  active: {type: String, default: true},
  _type: {type: String, default: 'Article'}
}, schemaOptions)

ArticleRepositorySchema.statics.findBlogsByConditions = async function (options, callback) {
  var conditions = options || {}
  // console.log(conditions)
  var q = this.find()
  q.where('_type').equals('Article')

  if (conditions._id) {
    q.where('_id').equals(conditions._id)
  }

  if (typeof conditions.active === 'boolean') {
    q.where('active').equals(conditions.active)
  } else {
    q.where('active').equals(true)
  }

  // if (conditions.populate) {
  //   if (typeof conditions.populate === 'string') {
  //     conditions.populate = conditions.populate.split('+')
  //   }
  //   for (var i = 0; i < conditions.populate.length; i++) {
  //     q.populate(conditions.populate[i])
  //   }
  // }

  // if (conditions.sort) {
  //   q.sort(conditions.sort)
  // }
  // console.log(q.getQuery())
  var page = conditions.page
  if (typeof page !== 'undefined') {
    q.sort('publicationDate')
    var paginateOptions = {
      perPage: conditions.perPage || 10,
      delta: 9,
      page: page
    }
    // q.paginate(paginateOptions, function (err, res) {
    //   if (err) {
    //     callback(err)
    //   } else {
    //     callback(null, res.results, res.count)
    //   }
    // })
    let results = await q.paginate(paginateOptions)
    return results
  } else {
    let results = await q.exec()
    return results
  }
}
ArticleRepositorySchema.statics.saveArticle = async function (article) {
  let Self = this
  var id = article.getId() || new mongoose.Types.ObjectId()
  delete article.id
  let articleRepo = await Self.findById(id)
  if (articleRepo) {
    for (let prop in article) {
      if (prop !== '_id' && prop !== '_type') {
        articleRepo[prop] = article[prop]
      }
    }
    let blog = await articleRepo.save()
    return blog
  } else {
    let newArticle = new Self(article)
    let blog = await newArticle.save()
    return blog
  }
}

let articleRepository = mongoose.model('Article', ArticleRepositorySchema)
export default articleRepository

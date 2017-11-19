import ArticleRepository from './../repositories/articleRepository'

let Article = function (options) {
  options = options || {}
  this.id = options._id || options.id || null
  this.title = options.title || ''
  this.introduction = options.introduction || ''
  this.content = options.content || ''
  this.publicationDate = new Date()
  this.active = options.active || true
}

Article.create = async function (options) {
  options = options || {}
  let body = await validataBody(options)
  let article = init(body)
  // console.log(article)
  let blog = await article.save()
  return blog
}

Article.findAll = async function (options) {
  options = options || {}
  let conditions = await checkConditions(options)
  let blogs = await findBlogsByConditions(conditions)
  return blogs
}

// instance methods
Article.prototype.save = async function () {
  let article = await ArticleRepository.saveArticle(this)
  return article
}

Article.prototype.getId = function () {
  return this.id || null
}

Article.prototype.getTitle = function () {
  return this.title || ''
}

Article.prototype.getIntroduction = function () {
  return this.introduction || ''
}

Article.prototype.getContent = function () {
  return this.content || ''
}

Article.prototype.getPublicationDate = function () {
  return this.publicationDate || null
}

Article.prototype.isActive = function () {
  return this.active
}

// private methods
let validataBody = function (options) {
  return new Promise((resolve, reject) => {
    options = options || {}
    if (!options.content) {
      reject(new Error(401, 'no content'))
    }
    if (!options.title) {
      reject(new Error(401, 'no title'))
    }
    if (!options.introduction) {
      reject(new Error(401, 'no introduction'))
    }
    resolve(options)
  })
}

let checkConditions = function (options) {
  options = options || {}
  let conditions = {}
  return new Promise(function (resolve, reject) {
    if (options._id) {
      conditions._id = options._id
    }
    if (conditions.publicationDate) {
      conditions.publicationDate = options.publicationDate
    }
    if (typeof options.active === 'boolean') {
      conditions.active = options.active
    }
    if (options.page) {
      conditions.page = options.page
    }
    resolve(conditions)
  })
}

let findBlogsByConditions = async function (conditions) {
  conditions = conditions || {}
  let blogs = await ArticleRepository.findBlogsByConditions(conditions)
  return blogs
}

let init = function (article) {
  return new Article(article)
}

// let initArray = function (articles) {
//   return articles.map((article) => {
//     return Article.init(article)
//   })
// }

export default Article

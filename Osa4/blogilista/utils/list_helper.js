const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

  return  blogs.reduce((mostLiked, blog) => {
    if (mostLiked.title === undefined){
      mostLiked = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
    else if (blog.likes > mostLiked.likes){
      mostLiked = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
    return mostLiked
  }, {})
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
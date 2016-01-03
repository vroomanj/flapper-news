angular.module('flapperNews')
.factory('posts', [
'$http',
function($http){
  var o = {
    posts: []
  };

  // Get all posts.
  o.getAll = function() {
    return $http.get('/posts.json').success(function(data){
      angular.copy(data, o.posts);
    });
  };

  // Get a single post.
  o.get = function(id) {
    return $http.get('/posts/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  // Create a new post.
	o.create = function(post) {
	  return $http.post('/posts.json', post).success(function(data){
	    o.posts.push(data);
	  });
	};

  // Upvote a post.
  o.upvote = function(post) {
    return $http.put('/posts/' + post.id + '/upvote.json').success(function(data){
        post.upvotes += 1;
    });
  };

  // Add a comment to a post.
  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments.json', comment);
  };

  // Upvote a post comment.
  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
      .success(function(data){
        comment.upvotes += 1;
      });
  };

  return o;
}]);
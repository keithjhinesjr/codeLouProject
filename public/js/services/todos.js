angular.module('todoService', [])

// each function returns a promise object 
.factory('Todos', ['$http', function ($http) {
	return {
		get: function () { //task retrieval
			return $http.get('/api/todos');
		},
		create: function (todoData) { //task creation
			return $http.post('/api/todos', todoData);
		},
		delete: function (id) { //task deletion
			return $http.delete('/api/todos/' + id);
		}
	}
}]);
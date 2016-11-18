angular.module('todoController', [])

// Import the todo service into the controller.
.controller('mainController', ['$scope', '$http', 'Todos', function ($scope, $http, Todos) {
	$scope.formData = {};
	$scope.loading = true;

	// Get
	// When landing on the page, use the todo service to get all the todo list items in database and display them
	// on the page.
	Todos.get()
		.success(function (data) {
			$scope.todos = data;
			$scope.loading = false;
		});


	// create high priority task function
	// when submitting the form, sends text and priority level to node api
	$scope.createHigh = function () {
		// Make sure text is entered when submitting.  If not, nothing will happen.
		if ($scope.formData.text != undefined) {
			$scope.loading = true;


			$scope.priority = {
				priority: "high"
			};
			angular.extend($scope.priority, $scope.formData);

			Todos.create($scope.priority) // call the create function from services

			// if successful creation, call our get function to get all the new todos
			.success(function (data) {
				$scope.loading = false;
				$scope.formData = {}; // clears the form, so another task can be entered.
				$scope.todos = data; // re assigns our new list of todos
			});
		}
		console.log('New high priority task added.');
	};

	// create low priority task function

	$scope.createLow = function () {

		// Make sure text is entered when submitting.  If not, nothing will happen.
		if ($scope.formData.text != undefined) {
			$scope.loading = true;


			$scope.priority = {
				priority: "low" //adds priority level to JSON db model using angular
			};
			angular.extend($scope.priority, $scope.formData);

			Todos.create($scope.priority) // call the create function from services 

			// if successful creation, call our get function to get all the new todos
			.success(function (data) {
				$scope.loading = false;
				$scope.formData = {}; // clears the form, so another task can be entered.
				$scope.todos = data; // re assigns our new list of todos
			});
		}
		console.log('New low priority task added.');
	};

	// Delete
	// delete a todo after checking it off the list
	$scope.deleteTodo = function (id) {
		$scope.loading = true;

		Todos.delete(id)
			// if successful creation, call the get function to get all the new todos
			.success(function (data) {
				$scope.loading = false;
				$scope.todos = data; // re assign our new list of todos
			});
		console.log('Item deleted from task list');
	};
}]);
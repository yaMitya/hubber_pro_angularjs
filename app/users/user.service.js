angular.module('hubber-pro.usersService', [])
    .factory('UserService', ['$http', function ($http) {
        var getUsers = function () {
            return $http.get('https://jsonplaceholder.typicode.com/users')
        };

        var getTodos = function (id) {
            return $http.get('https://jsonplaceholder.typicode.com/todos?userId=' + id)
        };
        return {
            getUsers: getUsers,
            getTodos: getTodos
        }
    }]);
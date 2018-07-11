'use strict';

angular.module('hubber-pro.users', ['ngRoute', 'ngMaterial', 'hubber-pro.usersService'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', ['UserService', '$scope', '$mdDialog', function (userService, $scope, $mdDialog) {
        $scope.data = {pageSize: 5, currentPage: 0, pages: []};
        userService.getUsers().then(function (users) {
            $scope.data.allUsers = users.data;
            $scope.data.users = $scope.data.allUsers.slice(0, $scope.data.pageSize);
            $scope.data.pages.length = ~~($scope.data.allUsers.length / $scope.data.pageSize);
            if($scope.data.allUsers.length % $scope.data.pageSize){
                $scope.data.pages.length++;
            }
        });
        $scope.openEdit = function (index) {
            var scope = $scope.$new();
            scope.data = {user: $scope.data.users[index]};
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'users/dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: scope
            }).then(function (answer) {
            }, function () {
            });
        };
        $scope.changePage = function (index) {
            $scope.data.currentPage = index;
            $scope.data.users = $scope.data.allUsers.slice(index * $scope.data.pageSize, (index + 1) * $scope.data.pageSize);

        };

        function DialogController($scope, UserService) {
            UserService.getTodos($scope.data.user.id).then(function (todos) {
                $scope.data.todos = todos.data;
            });
        }
    }]);
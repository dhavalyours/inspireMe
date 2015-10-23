
angular.module('inspiresMe', ['ionic', 'inspiresMe.controllers', 'ngCordova', 'ionic.ion.imageCacheFactory'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // Each tab has its own nav history stack:

            .state('app', {
                url: '/app',
                templateUrl: 'templates/inspiresMe.html',
                controller: 'inspireMeController'
            })
            .state('info', {
                url: '/info',
                templateUrl: 'templates/info.html',
                controller:'infoController'
            }),

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app');

    });
/**
 * Created by dhaval on 15/10/15.
 */



angular.module('inspiresMe.controllers', [])

    .controller('inspireMeController', function($scope, $rootScope,$http,$timeout,$ionicGesture,$ImageCacheFactory,$cordovaSocialSharing) {

        $scope.maxArray=[];
        $scope.cachedImageArray=[];
        $rootScope.currentDisplayImage="https://pbs.twimg.com/media/CO1nrquWUAAsodc.jpg";
        $scope.currentDisplayImage="https://pbs.twimg.com/media/CO1nrquWUAAsodc.jpg";

        $scope.dismissAnimations = [
            "zoomOut",
            "swing",
            "rollOut",
            "fadeOutRightBig",
            "zoomOutRight",
            "hinge",
            "slideOutUp",
            "rotateOut",
            "bounceOut",
            "bounceOutUp"
        ];

        $scope.entryAnimations = [
            "lightSpeedIn",
            "zoomIn",
            "slideInLeft",
            "wobble",
            "rollIn",
            "slideInUp",
            "rotateIn",
            "bounceIn",
            "bounceInDown",
            "jello"
        ];




        $scope.gesture = {
            used: ''
        };

        $scope.onGesture = function(gesture) {

            $scope.gesture.used = gesture;
            switch (gesture){

                case "Swipe Left":
                    $scope.changeCard();
                    break;

                case "Swipe Right":
                    $scope.changeCard();
                    break;

            }
        }

        var element = angular.element(document.querySelector('#content'));

        $ionicGesture.on('tap', function(e){
            $scope.$apply(function() {
                $scope.gesture.used = 'Tap';
            })
        }, element);

        $scope.changeCard= function(){

            /*
             Get a random dismiss animation class and register an oncomplete handler. At oncomplete call the showNewCard function
             */

            var rand_index = Math.abs(Math.floor(Math.random() * $scope.dismissAnimations.length));
            var dismissAnimationClass =$scope.dismissAnimations[rand_index];
            dismissAnimationClass += " fullscreen-image animated ";
            var quote_card=angular.element(document.getElementById("quote_card"));
            quote_card.removeAttr("class");
            quote_card.addClass(dismissAnimationClass);
            quote_card.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', showNewCard);
        }


        function showNewCard(){
            /*
              Get a random entry animation class and show the new card.
              Pre-load 5 images in a cached  array,
              Each time an image is removed remove image from cached array
              add a new image to precache so when user browses he always finds an image in cache.

             https://farm6.staticflickr.com/5693/21430682122_6f681766bc_z.jpg,
             https://farm1.staticflickr.com/748/20648062604_6619e0879b_z.jpg,
             https://pbs.twimg.com/media/CPFBDePWgAAUPIj.jpg,
             https://farm8.staticflickr.com/7528/15860183962_0f0dd9109b_z.jpg
             */

            var rand_index = Math.abs(Math.floor(Math.random() * $scope.entryAnimations.length));
            var entryAnimationClass =$scope.entryAnimations[rand_index];
            entryAnimationClass += " fullscreen-image animated ";
            var quote_card=angular.element(document.getElementById("quote_card"));


            // remove image from cached array
            var item_to_remove=quote_card.attr('src');
            var item_index=$scope.cachedImageArray.indexOf(item_to_remove);

            if( item_index > -1){

                $scope.cachedImageArray.splice(item_index, 1);
                $scope.cachedImageArray.sort();
            }else{

            }

            var img_src=getRandomImageFromCache();

            if(img_src == item_to_remove){
                img_src=getRandomImageFromCache();
            }
            quote_card.attr('src', img_src);
            $scope.currentDisplayImage=img_src;
            $rootScope.currentDisplayImage=img_src;

            quote_card.removeAttr("class");
            quote_card.addClass(entryAnimationClass);

            //add a new image in cache image array
            cacheImage(getRandomCard());

        }


        function getRandomImageFromCache(){
            var rand_index = Math.abs(Math.floor(Math.random() * $scope.cachedImageArray.length));
            var img_url=$scope.cachedImageArray[rand_index];
            if(img_url  === undefined){
                getRandomImageFromCache();
            }else {
                return img_url;
            }
        }

        function getRandomCard(){
            var rand_index = Math.abs(Math.floor(Math.random() * $scope.maxArray.length));
            var img_url=$scope.maxArray[rand_index].img_url;
            return img_url;
        }



        angular.element(document).ready(function () {
            loadImageJson();
        });

        function startImagePreCache(){

            //cache 5 images initially
            for(var img_load=0;img_load<=2;img_load++){
                cacheImage(getRandomCard());
            }
        }



        function cacheImage(img_url){

            $ImageCacheFactory.Cache([
                img_url
            ]).then(function(){
                $scope.cachedImageArray.push(img_url);
                //console.log("updated image array is "+$scope.cachedImageArray +' count is '+$scope.cachedImageArray.length);
            });
        }


        $scope.showSharedScreen =function(){
            console.log("share code comes here");
            var message="";
            var subject="";
            var link="";
            $cordovaSocialSharing
                .share(message, subject, $rootScope.currentDisplayImage, link) // Share via native share sheet
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
        }






        function loadImageJson() {
            // do nothing
        }


        $http
            .get('data/myData.json')
            .success(function (response) {
                $scope.maxArray = response;
                startImagePreCache();
            });

    })

    .controller('infoController', function($scope, $rootScope,$cordovaSocialSharing) {





        $scope.showSharedScreen =function(){


            if($rootScope.currentDisplayImage==""){

                $rootScope.currentDisplayImage="https://pbs.twimg.com/media/CO1nrquWUAAsodc.jpg";
            }

            alert($rootScope.currentDisplayImage);
            console.log("share code comes here "+$rootScope.currentDisplayImage);
            var message="";
            var subject="";
            var link="";
            $cordovaSocialSharing
                .share(message, subject, $rootScope.currentDisplayImage, link) // Share via native share sheet
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
        }

    });



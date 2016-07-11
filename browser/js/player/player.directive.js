juke.directive('player', function (PlayerFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/player/player.html',
        link: function (scope, element, attrs) {
         angular.extend(scope, PlayerFactory); // copy props from param2 to param1

        function stopScrubber (target, cb) {
          window.addEventListener('mouseup', function () {
            target.removeEventListener('mousemove', cb);
            scrubbing = false;
          });
        }
         var scrubbing = false;
         var offsetX, width;
          scope.toggle = function () {
            if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
            else PlayerFactory.resume();
          };

          scope.getPercent = function () {
            // if (scrubbing) return (offsetX / width) * 100;
            return PlayerFactory.getProgress() * 100;
          };

          scope.handleProgressClick = function (evt) {
            PlayerFactory.seek(evt.offsetX / evt.currentTarget.scrollWidth);
          };

          scope.startScrubbing = function (evt) {
            width = evt.target.offsetWidth;
            offsetX = evt.offsetX;
            var target = evt.target;
            var start = function (e) {
                 scrubbing = true;

                PlayerFactory.seek(e.offsetX / e.currentTarget.scrollWidth);
            }
            target.addEventListener('mousemove', start);
            stopScrubber(target, start)
          }

        }

    };
})



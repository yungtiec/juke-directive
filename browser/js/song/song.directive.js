juke.directive('songList', function (PlayerFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/song/song-list.html',
        scope: {
            songs: '='
        },
        link: function (scope, elem, attrs) {
              scope.getCurrentSong = function () {
                return PlayerFactory.getCurrentSong();
              };

              scope.isPlaying = function (song) {
                return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
              };

              scope.toggle = function (song) {
                if (song !== PlayerFactory.getCurrentSong()) {
                  PlayerFactory.start(song, scope.songs);
                } else if ( PlayerFactory.isPlaying() ) {
                  PlayerFactory.pause();
                } else {
                  PlayerFactory.resume();
                }
              };
        }
    };
});

juke.directive('doubleClick', function () {
    return {
        restrict: 'A',
        scope: {
            onDoubleClick: '&'
        },
        link: function (scope, elem, attrs) {
            elem.on('dblclick', function () {
                scope.onDoubleClick();
            });
        }
    };
});

toggle = function () {
    return runExpr("toggle(song)", scope);
}


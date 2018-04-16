(function($) {
  'use strict';

  if(typeof $ !== 'undefined') {
    /**
     * Shake an Element
     *
     * @param distance Distance in px to shake
     * @param runs How many times it shakes
     * @param speed Speed of the shake
     * @param distanceReduce Reduction of the distance for each following shake
     */
    $.fn.pandoShake = function(distance, runs, speed, distanceReduce) {
      var element = this;
      var _distance = 10;
      var _speed = 100;
      var _runs = 3;
      var _distanceReduce = 0;

      if(typeof distance !== 'undefined') {
        _distance = distance;
      }
      if(typeof runs !== 'undefined') {
        _runs = runs;
      }
      if(typeof speed !== 'undefined') {
        _speed = speed;
      }
      if(typeof distanceReduce !== 'undefined') {
        _distanceReduce = distanceReduce;
      }

      var position = this.css('position');

      if(position === 'static') {
        this.css('position', 'relative');
      }

      var resetCSS = function() {
        $(this).css('position', '').css('left', '');
      };

      var runAnimation = function(run_index) {
        var first_speed = _speed;
        if(run_index === 0) {
          first_speed /= 2;
        }
        if(run_index === _runs) {
          element.animate({left: '0px'}, _speed / 2, resetCSS.bind(this));
        } else {
          element.animate({left: '-' + _distance + 'px'}, first_speed).animate({left: _distance + 'px'}, _speed, 'swing', function() {
            runAnimation(run_index + 1);
          });
        }
      };

      this.finish();
      runAnimation(0);

      return this;
    };
  }

}(jQuery));

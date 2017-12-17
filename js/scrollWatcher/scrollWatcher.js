/**
 * Scroll Watcher
 *
 * @param object options -- Options
 * including target, offset, action, reset
 */
function scrollWatcher( Options ) {
    // Variables
    let index = 0;
    let prevScene = null;
    let nextScene = Options.scenes[index];
    let pageOffset = pageYOffset;
    let prevOffset;
    let DefaultOpts = {
        target: null
    };
    let DefaultSceneOpts = {
		action: function() { return; },
		reset: function() { return; },
		offset: 100
    };
  
    // Executions
    setDefaultOptions(Options, DefaultOpts);
    DefaultSceneOpts.target = Options.target;
    manageDefaultSceneOptions(Options.scenes);
	document.addEventListener('scroll', scrollHandler);
  
    // Functions
    function scrollHandler() {
        //console.log('RUNNING!');
		if ( isNextSceneReached() ) {
            console.log('scene ' + index + ' action!');
            console.log('scene offset = ' + nextScene.offset);
			nextScene.action(nextScene.target);
			prevScene = nextScene;
			if ( index + 1 === Options.scenes.length ) {
                nextScene = null;
				return;
			}
			index++;
            nextScene = Options.scenes[index];
            once = true;
		} else if ( isPrevSceneReached() ) {
            console.log('scene ' + index + ' reset!');
            console.log('scene offset = ' + prevScene.offset);
			prevScene.reset(prevScene.target);
			nextScene = prevScene;
            if ( index === 0 ) {
                prevScene = null;
                return;
            }
			index--;
            prevScene = Options.scenes[index];
		}
    }
  
    function isNextSceneReached() {
    	if ( nextScene === null ) { return false; }
      	return pageYOffset >= nextScene.offset && isScrollDown();
    }

    function isPrevSceneReached() {
    	if ( prevScene === null ) { return false; }
    	return pageYOffset <= prevScene.offset && !isScrollDown();
    }
  
    function isScrollDown() {
		prevOffset = pageOffset;
		pageOffset = pageYOffset;
		return pageOffset > prevOffset;
    }
  
    function manageDefaultSceneOptions( scenes ) {
		for ( let i = 0, s = scenes; s[i]; i++ ) {
			setDefaultOptions(s[i], DefaultSceneOpts);
		}
    }
  
    function setDefaultOptions( Opts, DefOpts ) {
        for ( let i = 0, p = Object.keys(DefOpts); p[i]; i++ ) {
            if ( Opts.hasOwnProperty(p[i]) ) { continue; }
            Opts[p[i]] = DefOpts[p[i]];
        }
    }
}

// Example usage
/*
scrollFire({
	target: document.getElementById('a'),
	scenes: [
		{
			offset: 100,
			action: function(target) {
				colorize(target, 'pink');
			},
			reset: function(target) {
				colorize(target, 'red');
			}
		},
		{
			offset: 400,
			action: function(target) {
				colorize(target, 'blue');
			},
			reset: function(target) {
				colorize(target, 'pink');
			}
		},
		{
		    offset: 700,
		    action: function(target) {
				target.style.transition = 'opacity .5s';
				target.style.opacity = '0';
		    },
		    reset: function(target) {
		        target.style.opacity = '1';
		    }
		}
	]
});
  
function fader( element, opacity ) {
	element.style.opacity = opacity;
}

function colorize( element, color ) {
	element.style.background = color;
}
*/

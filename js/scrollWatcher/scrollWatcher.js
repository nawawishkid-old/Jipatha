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
        target: null,
		action: function() { return; },
		reset: function() { return; }
    };
    let DefaultSceneOpts = {
		offset: 100
    };
  
    // Executions
    setDefaultOptions(Options, DefaultOpts);
    DefaultSceneOpts.target = Options.target;
    DefaultSceneOpts.action = Options.action;
    DefaultSceneOpts.reset = Options.reset;
    manageDefaultSceneOptions(Options.scenes);
    stillHandler();
	document.addEventListener('scroll', scrollHandler);
  
    // Functions
    /**
     * stillHandler
     *
     * Loop through all scenes to check if
     * pageYOffset at the beginning of the function
     * is greater than the scene's offset.
     * If so, run scene's action without waiting for scrolling.
     * Use at the beginning of the (scrollWatcher) function.
     */
    function stillHandler() {       
        Options.scenes.forEach(function(scene) {
        	if ( pageYOffset > scene.offset) {
        		scene.action(scene.target);
        	}
        });
    }

    /**
     * scrollHandler
     *
     * Check if currently scrolling pageYOffset
     * is greater than the nextScene's offset.
     * If so, run the action.
     * Use when user's is scrolling the page.
     */
    function scrollHandler() {       
		if ( isNextSceneReached(true) ) {
            runNextScene();
		} else if ( isPrevSceneReached(true) ) {
            runPrevScene();
		}
    }
  
    function isNextSceneReached( scrolling = false ) {
    	if ( nextScene === null ) { return false; }
    	let isScrollDownValue = scrolling ? isScrollDown() : true;
      	return pageYOffset >= nextScene.offset && isScrollDownValue;
    }

    function isPrevSceneReached( scrolling = false ) {
    	if ( prevScene === null ) { return false; }
    	let isScrollDownValue = scrolling ? isScrollDown() : false;
    	return pageYOffset <= prevScene.offset && !isScrollDownValue;
    }
  
  	// Check if user is scrolling down or not.
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

    function runNextScene() {           
		nextScene.action(nextScene.target);
		prevScene = nextScene;
		if ( index + 1 === Options.scenes.length ) {
            nextScene = null;
			return;
		}
		index++;
        nextScene = Options.scenes[index];
        once = true;
    }

    function runPrevScene() {           
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

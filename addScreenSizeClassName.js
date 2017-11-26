var addScreenSizeClassName = {
    /**
     * Properties
     */
    breakPoint: {
        lg: 1200,
        md: 1024,
        sm: 768,
        xs: 0
    },
    target: document.querySelectorAll('html, body'),

    /**
     * === Methods ===
     */
    /**
     * Initial function
     *
     * @param options [object] { screenCode: [int] minWidthInPixel }
     * @return void
     */
    init: function(options = null) {
        for ( let key in options ) {
            if ( key in options ) {
                this['set_' + key](options[key]);
            }
        }
        this.addScreenCodeClass();
        window.addEventListener('resize', this.addScreenCodeClass.bind(this));
    },

    set_target: function(selector) {
        this.target = document.querySelectorAll(selector);
    },

    set_breakPoint: function(object) {
        this.breakPoint = object;
    },

    addScreenCodeClass: function() {
        let code = this.getScreenCode();
        this.target.forEach(function(element) {
            this.removeScreenCodeClass(element);
            element.classList.add(code);
        }, this);
    },

    removeScreenCodeClass: function(target) {
        target.classList.forEach(function(className){
            if ( this.getCodeArray().includes(className) ) {
                target.classList.remove(className);
            }
        }, this);
    },

    getScreenCode: function() {
        let width = innerWidth;
        let screenCode = this.getCodeArray();
        let bp = this.getBreakpointArray();
        let sortedBp = bp.sort(function(a, b) { return b - a; });
        let code;

        sortedBp.some(function(elem, index) {
            if ( width > elem ) {
                code = screenCode[bp.indexOf(elem)];
                return true;
            }
        });

        return code;
    },

    getCodeArray: function() { return Object.keys(this.breakPoint); },
    getBreakpointArray: function() { return Object.values(this.breakPoint); }
}
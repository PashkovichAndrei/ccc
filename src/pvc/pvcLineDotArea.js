
/**
 * LineDotAreaAbstract is the class that will be extended by
 * dot, line, stackedline and area charts.
 */
pvc.LineDotAreaAbstract = pvc.CategoricalAbstract.extend({

    constructor: function(options){

        this.base(options);

        // Apply options
        pvc.mergeDefaults(this.options, pvc.LineDotAreaAbstract.defaultOptions, options);
    },
    
    /**
     * Initializes each chart's specific roles.
     * @override
     */
    _initVisualRoles: function(){
        
        this.base();
        
        this._addVisualRoles({
            /* value: required, continuous, numeric */
            value: { 
                isMeasure: true, 
                isRequired: true, 
                isPercent: this.options.stacked,  
                requireSingleDimension: true, 
                requireIsDiscrete: false, 
                valueType: Number, 
                defaultDimensionName: 'value' 
            }
        });
    },

    /* @override */
    _createMainContentPanel: function(parentPanel){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in LineDotAreaAbstract");
        }
        
        var options = this.options;
        return new pvc.LineDotAreaPanel(this, parentPanel, {
            stacked:        options.stacked,
            showValues:     options.showValues,
            valuesAnchor:   options.valuesAnchor,
            showLines:      options.showLines,
            showDots:       options.showDots,
            showAreas:      options.showAreas,
            orientation:    options.orientation,
            nullInterpolationMode: options.nullInterpolationMode
        });
    }
}, {
    defaultOptions: {
        showDots: false,
        showLines: false,
        showAreas: false,
        showValues: false,
        // TODO: Set this way, setting, "axisOffset: 0" has no effect...
        orthoAxisOffset: 0.04,
        baseAxisOffset:  0.01, // TODO: should depend on being discrete or continuous base
        valuesAnchor: "right",
        panelSizeRatio: 1,
        nullInterpolationMode: 'none', // 'none', 'linear' 
        tipsySettings: def.create(pvc.BaseChart.defaultOptions.tipsySettings, { offset: 15 })
    }
});

/**
 * Dot Chart
 */
pvc.DotChart = pvc.LineDotAreaAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showDots = true;
    }
});

/**
 * Line Chart
 */
pvc.LineChart = pvc.LineDotAreaAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showLines = true;
    }
});

/**
 * Stacked Line Chart
 */
pvc.StackedLineChart = pvc.LineDotAreaAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showLines = true;
        this.options.stacked = true;
    }
});

/**
 * Stacked Area Chart
 */
pvc.StackedAreaChart = pvc.LineDotAreaAbstract.extend({

    constructor: function(options){

        this.base(options);

        this.options.showAreas = true;
        this.options.stacked = true;
    }
});

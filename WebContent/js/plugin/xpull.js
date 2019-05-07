/*
 Xpull - pull to refresh jQuery plugin for iOS and Android
 by Slobodan Jovanovic
 Initially made for Spreya app spreya.com
 To get the instance of Xpull:
 var xpull = $('selector').data("plugin_xpull");
  Methods:
  reset() - cancels he spinning and resets the plugin to initial state. Example: $('#container').data('plugin_xpull').reset();
*/
(function($, window, document, undefined) {
    var pluginName = "xpull",
        defaults = {
            paused: false,
            pullThreshold: 80,
            maxPullThreshold: 100000,
            spinnerTimeout: 1000,
            scrollingDom: null, // if null, specified element
            onPullStart: function() {},
            onPullEnd: function() {},
            callback: function() {}
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function() {
            var inst = this;
            var elm = $(inst.element).children();
            inst.elm = elm;
            elm.parent().find('.pull-indicator').remove();
            elm.parent().prepend('<div class="pull-indicator"><div class="genericon genericon-next"><span></span></div><div class="loading"><span id="lo1"></span><span id="lo2"></span><span id="lo3"></span></div></div>');
            inst.indicator = elm.parent().find('.pull-indicator:eq(0)');
            inst.spinner = elm.parent().find('.loading:eq(0)');
            inst.arrow = elm.parent().find('.genericon:eq(0)');
            inst.indicatorHeight = inst.indicator.outerHeight();
            elm.parent().css({
                '-webkit-overflow-scrolling': 'touch'
            });
            var ofstop = elm.parent().offset().top;
            var fingerOffset = 0;
            var top = 0;
            var hasc = false;
            inst.elast = true;
            inst.arrow.css('visibility', 'hidden');
            inst.indicatorHidden = true;
            elm.unbind('touchstart.' + pluginName);
            elm.on('touchstart.' + pluginName, function(ev) {
                if(inst.options.paused)
                  return false;

                inst.options.onPullStart.call(this);
                fingerOffset = ev.originalEvent.touches[0].pageY - ofstop
				
            });
            elm.unbind('touchmove.' + pluginName);
            elm.on('touchmove.' + pluginName, function(ev) {
                if(inst.options.paused)
                  return false;

                if (elm.position().top < 0 || (inst.options.scrollingDom || elm.parent()).scrollTop() > 0 || document.body.scrollTop > 0) { // trigger callback only if pulled from the top of the list
                    return true;
                }
				top = (ev.originalEvent.touches[0].pageY - ofstop - fingerOffset);
                if (top > 50) {
                    inst.arrow.css('visibility', 'visible');
                    inst.indicatorHidden = false;
                }

                if (top > 1) {

                    if (inst.elast) {
                        $(document.body).on('touchmove.' + pluginName, function(e) {
                            e.preventDefault();
                        });
                        inst.elast = false;
                    }

                    if (top <= (parseInt(inst.options.pullThreshold) + inst.options.maxPullThreshold)) {

                        $(elm).css({
                            '-webkit-transform': "translate3d(0px, " + (top) + "px, 0px)"
                        });

                        inst.indicator.css({
                            'top': (top/1.4) + "px"
                        });
						$('.pull-indicator .genericon span').css({ 
							'-webkit-transform': "rotate(" + (top * 2) + "deg)"
						});
                    }

                    if (top > inst.options.pullThreshold && !hasc) {
                        inst.indicator.addClass('arrow-rotate-180');
                    } else if (top <= inst.options.pullThreshold && hasc) {
                        inst.indicator.removeClass('arrow-rotate-180');
                    }
                } else {
                    $(document.body).unbind('touchmove.' + pluginName);
                    inst.elast = true;
                }
                hasc = inst.indicator.hasClass('arrow-rotate-180');

            });
            elm.unbind('touchend.' + pluginName);
            elm.on('touchend.' + pluginName, function(ev) {
                if(inst.options.paused)
                  return false;

                inst.options.onPullEnd.call(this);
                if (top > 0) {
                    if (top > inst.options.pullThreshold) {
                        inst.arrow.hide();
                        inst.spinner.show();
                        elm.css({
                            '-webkit-transform': 'translate3d(0px, ' + inst.indicatorHeight + 'px, 0px)',
                            '-webkit-transition': '-webkit-transform 300ms ease'
                        });
                        inst.indicator.css({
                            'top': + inst.indicatorHeight + "px",
                            '-webkit-transition': 'top 300ms ease'
                        });
                        if (inst.options.spinnerTimeout) {
                            setTimeout(function() {
                                inst.reset();
                            }, inst.options.spinnerTimeout);
                        }

                    } else {
                        inst.indicator.css({
                            'top': 0,
                            '-webkit-transition': 'top 300ms ease'
                        });
                        elm.css({
                            '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                            '-webkit-transition': '-webkit-transform 300ms ease'
                        });
						$('.pull-indicator .genericon span').css({ 
							'-webkit-transform': "rotate(0deg)"
						});
                    }
                    top = 0;
                }
                if (!inst.indicatorHidden) {
                    inst.arrow.css('visibility', 'hidden');
                    inst.indicatorHidden = true;
                }
                setTimeout(function() {
                    //inst.indicator.removeClass('arrow-rotate-180');
                    elm.css({
                        '-webkit-transition': ''
                    });
                    inst.indicator.css({
                        '-webkit-transition': ''
                    });
                    $(document.body).unbind('touchmove.' + pluginName);
                    inst.elast = true;
                }, 300);
            });
        },
        reset: function() {
            var inst = this;
            var elm = inst.elm;
            inst.indicator.css({
                'top': 0,
                '-webkit-transition': 'top 300ms ease'
            });
            elm.css({
                '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                '-webkit-transition': '-webkit-transform 300ms ease'
            });
            setTimeout(function() {
                inst.arrow.show();
                inst.spinner.hide();
                inst.indicator.removeClass('arrow-rotate-180');
                elm.css({
                    '-webkit-transition': ''
                });
                inst.indicator.css({
                    '-webkit-transition': ''
                });
				$('.pull-indicator .genericon span').css({ 
					'-webkit-transform': ''
				});
                $(document.body).unbind('touchmove.' + pluginName);
                inst.elast = true;
                inst.options.callback.call(this);
            }, 300);
        },
        insertCss: function(css, id) {
            var el = document.getElementById(id);
            if (el) {
                el.parentNode.removeChild(el);
            }
            var csse = document.createElement('style');
            csse.type = 'text/css';
            csse.id = id;
            if (csse.styleSheet) {
                document.getElementsByTagName("head")[0].appendChild(csse);
                csse.styleSheet.cssText = css;
            } else {
                var rules = document.createTextNode(css);
                csse.appendChild(rules);
                document.getElementsByTagName("head")[0].appendChild(csse);
            }
        }
    };
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

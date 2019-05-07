/* eiwaf-ui v1.0.0 | Plugin | (c)E4NET Ltd, Co. */
//center
(function(a){a.fn.extend({center:function(b){var b=a.extend({inside:window,transition:0,minX:0,minY:0,withScrolling:true,vertical:true,horizontal:true},b);return this.each(function(){var c={position:"absolute"};if(b.vertical){var e=(a(b.inside).height()-a(this).outerHeight())/2;if(b.withScrolling){e+=a(b.inside).scrollTop()||0}e=(e>b.minY?e:b.minY);a.extend(c,{top:e+"px"})}if(b.horizontal){var d=(a(b.inside).width()-a(this).outerWidth())/2;if(b.withScrolling){d+=a(b.inside).scrollLeft()||0}d=(d>b.minX?d:b.minX);a.extend(c,{left:d+"px"})}if(b.transition>0){a(this).animate(c,b.transition)}else{a(this).css(c)}return a(this)})}})})(jQuery);

//device
// page init
jQuery(function() {
    initOpenClose();
    initCycleCarousel();
});

// scroll gallery init
function initCycleCarousel() {
    jQuery('.cycle-gallery').scrollGallery({
        mask: '.mask',
        slider: '.slideset',
        slides: '.slide',
        btnPrev: 'a.btn-prev',
        btnNext: 'a.btn-next',
        generatePagination: '.pager-links',
        autoRotation: true,
        switchTime: 20000,
        animSpeed: 500
    });
}

/*
 * jQuery Carousel plugin
 */
(function ($) {
    function ScrollGallery(options) {
        this.options = $.extend({
            mask: 'div.mask',
            slider: '>*',
            slides: '>*',
            activeClass: 'active',
            disabledClass: 'disabled',
            btnPrev: 'a.btn-prev',
            btnNext: 'a.btn-next',
            generatePagination: false,
            pagerList: '<ul>',
            pagerListItem: '<li><a href="#"></a></li>',
            pagerListItemText: 'a',
            pagerLinks: 'ul.pager > li',
            currentNumber: 'span.current-num',
            totalNumber: 'span.total-num',
            btnPlay: '.btn-play',
            btnPause: '.btn-pause',
            btnPlayPause: '.btn-play-pause',
            galleryReadyClass: 'gallery-js-ready',
            autorotationActiveClass: 'autorotation-active',
            autorotationDisabledClass: 'autorotation-disabled',
            stretchSlideToMask: false,
            circularRotation: true,
            disableWhileAnimating: false,
            autoRotation: false,
            pauseOnHover: isTouchDevice ? false : true,
            maskAutoSize: false,
            switchTime: 4000,
            animSpeed: 600,
            event: 'click',
            swipeThreshold: 15,
            handleTouch: true,
            vertical: false,
            useTranslate3D: false,
            step: false
        }, options);
        this.init();
    }

    ScrollGallery.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.refreshPosition();
                this.refreshState(true);
                this.resumeRotation();
                this.makeCallback('onInit', this);
            }
        },

        findElements: function () {
            // define dimensions proporties
            this.fullSizeFunction = this.options.vertical ? 'outerHeight' : 'outerWidth';
            this.innerSizeFunction = this.options.vertical ? 'height' : 'width';
            this.slideSizeFunction = 'outerHeight';
            this.maskSizeProperty = 'height';
            this.animProperty = this.options.vertical ? 'marginTop' : 'marginLeft';

            // control elements
            this.gallery = $(this.options.holder).addClass(this.options.galleryReadyClass);
            this.mask = this.gallery.find(this.options.mask);
            this.slider = this.mask.find(this.options.slider);
            this.slides = this.slider.find(this.options.slides);
            this.btnPrev = this.gallery.find(this.options.btnPrev);
            this.btnNext = this.gallery.find(this.options.btnNext);
            this.currentStep = 0; this.stepsCount = 0;

            // get start index
            if (this.options.step === false) {
                var activeSlide = this.slides.filter('.' + this.options.activeClass);
                if (activeSlide.length) {
                    this.currentStep = this.slides.index(activeSlide);
                }
            }

            // calculate offsets
            this.calculateOffsets();

            // create gallery pagination
            if (typeof this.options.generatePagination === 'string') {
                this.pagerLinks = $();
                this.buildPagination();
            } else {
                this.pagerLinks = this.gallery.find(this.options.pagerLinks);
                this.attachPaginationEvents();
            }

            // autorotation control buttons
            this.btnPlay = this.gallery.find(this.options.btnPlay);
            this.btnPause = this.gallery.find(this.options.btnPause);
            this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);

            // misc elements
            this.curNum = this.gallery.find(this.options.currentNumber);
            this.allNum = this.gallery.find(this.options.totalNumber);
        },

        attachEvents: function () {
            // bind handlers scope
            var self = this;
            this.bindHandlers(['onWindowResize']);
            $(window).bind('load resize orientationchange', this.onWindowResize);

            // previous and next button handlers
            if (this.btnPrev.length) {
                this.prevSlideHandler = function (e) {
                    e.preventDefault();
                    self.prevSlide();
                };
                this.btnPrev.bind(this.options.event, this.prevSlideHandler);
            }
            if (this.btnNext.length) {
                this.nextSlideHandler = function (e) {
                    e.preventDefault();
                    self.nextSlide();
                };
                this.btnNext.bind(this.options.event, this.nextSlideHandler);
            }

            // pause on hover handling
            if (this.options.pauseOnHover && !isTouchDevice) {
                this.hoverHandler = function () {
                    if (self.options.autoRotation) {
                        self.galleryHover = true;
                        self.pauseRotation();
                    }
                };
                this.leaveHandler = function () {
                    if (self.options.autoRotation) {
                        self.galleryHover = false;
                        self.resumeRotation();
                    }
                };
                this.gallery.bind({ mouseenter: this.hoverHandler, mouseleave: this.leaveHandler });
            }

            // autorotation buttons handler
            if (this.btnPlay.length) {
                this.btnPlayHandler = function (e) {
                    e.preventDefault();
                    self.startRotation();
                };
                this.btnPlay.bind(this.options.event, this.btnPlayHandler);
            }
            if (this.btnPause.length) {
                this.btnPauseHandler = function (e) {
                    e.preventDefault();
                    self.stopRotation();
                };
                this.btnPause.bind(this.options.event, this.btnPauseHandler);
            }
            if (this.btnPlayPause.length) {
                this.btnPlayPauseHandler = function (e) {
                    e.preventDefault();
                    if (!self.gallery.hasClass(self.options.autorotationActiveClass)) {
                        self.startRotation();
                    } else {
                        self.stopRotation();
                    }
                };
                this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler);
            }

            // enable hardware acceleration
            if (isTouchDevice && this.options.useTranslate3D) {
                this.slider.css({ '-webkit-transform': 'translate3d(0px, 0px, 0px)' });
            }

            // swipe event handling
            if (isTouchDevice && this.options.handleTouch && window.Hammer && this.mask.length) {
                this.swipeHandler = new Hammer.Manager(this.mask[0]);
                this.swipeHandler.add(new Hammer.Pan({
                    direction: self.options.vertical ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
                    threshold: self.options.swipeThreshold
                }));

                this.swipeHandler.on('panstart', function () {
                    if (self.galleryAnimating) {
                        self.swipeHandler.stop();
                    } else {
                        self.pauseRotation();
                        self.originalOffset = parseFloat(self.slider.css(self.animProperty));
                    }
                }).on('panmove', function (e) {
                    var tmpOffset = self.originalOffset + e[self.options.vertical ? 'deltaY' : 'deltaX'];
                    tmpOffset = Math.max(Math.min(0, tmpOffset), self.maxOffset);
                    self.slider.css(self.animProperty, tmpOffset);
                }).on('panend', function (e) {
                    self.resumeRotation();
                    if (e.distance > self.options.swipeThreshold) {
                        if (e.offsetDirection === Hammer.DIRECTION_RIGHT || e.offsetDirection === Hammer.DIRECTION_DOWN) {
                            self.nextSlide();
                        } else {
                            self.prevSlide();
                        }
                    } else {
                        self.switchSlide();
                    }
                });
            }
        },
        onWindowResize: function () {
            if (!this.galleryAnimating) {
                this.calculateOffsets();
                this.refreshPosition();
                this.buildPagination();
                this.refreshState();
                this.resizeQueue = false;
            } else {
                this.resizeQueue = true;
            }
        },
        refreshPosition: function () {
            this.currentStep = Math.min(this.currentStep, this.stepsCount - 1);
            this.tmpProps = {};
            this.tmpProps[this.animProperty] = this.getStepOffset();
            this.slider.stop().css(this.tmpProps);
        },
        calculateOffsets: function () {
            var self = this, tmpOffset, tmpStep;
            if (this.options.stretchSlideToMask) {
                var tmpObj = {};
                tmpObj[this.innerSizeFunction] = this.mask[this.innerSizeFunction]();
                this.slides.css(tmpObj);
            }

            this.maskSize = this.mask[this.innerSizeFunction]();
            this.sumSize = this.getSumSize();
            this.maxOffset = this.maskSize - this.sumSize;

            // vertical gallery with single size step custom behavior
            if (this.options.vertical && this.options.maskAutoSize) {
                this.options.step = 1;
                this.stepsCount = this.slides.length;
                this.stepOffsets = [0];
                tmpOffset = 0;
                for (var i = 0; i < this.slides.length; i++) {
                    tmpOffset -= $(this.slides[i])[this.fullSizeFunction](true);
                    this.stepOffsets.push(tmpOffset);
                }
                this.maxOffset = tmpOffset;
                return;
            }

            // scroll by slide size
            if (typeof this.options.step === 'number' && this.options.step > 0) {
                this.slideDimensions = [];
                this.slides.each($.proxy(function (ind, obj) {
                    self.slideDimensions.push($(obj)[self.fullSizeFunction](true));
                }, this));

                // calculate steps count
                this.stepOffsets = [0];
                this.stepsCount = 1;
                tmpOffset = tmpStep = 0;
                while (tmpOffset > this.maxOffset) {
                    tmpOffset -= this.getSlideSize(tmpStep, tmpStep + this.options.step);
                    tmpStep += this.options.step;
                    this.stepOffsets.push(Math.max(tmpOffset, this.maxOffset));
                    this.stepsCount++;
                }
            }
                // scroll by mask size
            else {
                // define step size
                this.stepSize = this.maskSize;

                // calculate steps count
                this.stepsCount = 1;
                tmpOffset = 0;
                while (tmpOffset > this.maxOffset) {
                    tmpOffset -= this.stepSize;
                    this.stepsCount++;
                }
            }
        },
        getSumSize: function () {
            var sum = 0;
            this.slides.each($.proxy(function (ind, obj) {
                sum += $(obj)[this.fullSizeFunction](true);
            }, this));
            this.slider.css(this.innerSizeFunction, sum);
            return sum;
        },
        getStepOffset: function (step) {
            step = step || this.currentStep;
            if (typeof this.options.step === 'number') {
                return this.stepOffsets[this.currentStep];
            } else {
                return Math.min(0, Math.max(-this.currentStep * this.stepSize, this.maxOffset));
            }
        },
        getSlideSize: function (i1, i2) {
            var sum = 0;
            for (var i = i1; i < Math.min(i2, this.slideDimensions.length) ; i++) {
                sum += this.slideDimensions[i];
            }
            return sum;
        },
        buildPagination: function () {
            if (typeof this.options.generatePagination === 'string') {
                if (!this.pagerHolder) {
                    this.pagerHolder = this.gallery.find(this.options.generatePagination);
                }
                if (this.pagerHolder.length && this.oldStepsCount != this.stepsCount) {
                    this.oldStepsCount = this.stepsCount;
                    this.pagerHolder.empty();
                    this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
                    for (var i = 0; i < this.stepsCount; i++) {
                        $(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i + 1);
                    }
                    this.pagerLinks = this.pagerList.children();
                    this.attachPaginationEvents();
                }
            }
        },
        attachPaginationEvents: function () {
            var self = this;
            this.pagerLinksHandler = function (e) {
                e.preventDefault();
                self.numSlide(self.pagerLinks.index(e.currentTarget));
            };
            this.pagerLinks.bind(this.options.event, this.pagerLinksHandler);
        },
        prevSlide: function () {
            if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                if (this.currentStep > 0) {
                    this.currentStep--;
                    this.switchSlide();
                } else if (this.options.circularRotation) {
                    this.currentStep = this.stepsCount - 1;
                    this.switchSlide();
                }
            }
        },
        nextSlide: function (fromAutoRotation) {
            if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                if (this.currentStep < this.stepsCount - 1) {
                    this.currentStep++;
                    this.switchSlide();
                } else if (this.options.circularRotation || fromAutoRotation === true) {
                    this.currentStep = 0;
                    this.switchSlide();
                }
            }
        },
        numSlide: function (c) {
            if (this.currentStep != c) {
                this.currentStep = c;
                this.switchSlide();
            }
        },
        switchSlide: function () {
            var self = this;
            this.galleryAnimating = true;
            this.tmpProps = {};
            this.tmpProps[this.animProperty] = this.getStepOffset();
            this.slider.stop().animate(this.tmpProps, {
                duration: this.options.animSpeed, complete: function () {
                    // animation complete
                    self.galleryAnimating = false;
                    if (self.resizeQueue) {
                        self.onWindowResize();
                    }

                    // onchange callback
                    self.makeCallback('onChange', self);
                    self.autoRotate();
                }
            });
            this.refreshState();

            // onchange callback
            this.makeCallback('onBeforeChange', this);
        },
        refreshState: function (initial) {
            if (this.options.step === 1 || this.stepsCount === this.slides.length) {
                this.slides.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
            }
            this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
            this.curNum.html(this.currentStep + 1);
            this.allNum.html(this.stepsCount);

            // initial refresh
            if (this.options.maskAutoSize && typeof this.options.step === 'number') {
                this.tmpProps = {};
                this.tmpProps[this.maskSizeProperty] = this.slides.eq(Math.min(this.currentStep, this.slides.length - 1))[this.slideSizeFunction](true);
                this.mask.stop()[initial ? 'css' : 'animate'](this.tmpProps);
            }

            // disabled state
            if (!this.options.circularRotation) {
                this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
                if (this.currentStep === 0) this.btnPrev.addClass(this.options.disabledClass);
                if (this.currentStep === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
            }

            // add class if not enough slides
            this.gallery.toggleClass('not-enough-slides', this.sumSize <= this.maskSize);
        },
        startRotation: function () {
            this.options.autoRotation = true;
            this.galleryHover = false;
            this.autoRotationStopped = false;
            this.resumeRotation();
        },
        stopRotation: function () {
            this.galleryHover = true;
            this.autoRotationStopped = true;
            this.pauseRotation();
        },
        pauseRotation: function () {
            this.gallery.addClass(this.options.autorotationDisabledClass);
            this.gallery.removeClass(this.options.autorotationActiveClass);
            clearTimeout(this.timer);
        },
        resumeRotation: function () {
            if (!this.autoRotationStopped) {
                this.gallery.addClass(this.options.autorotationActiveClass);
                this.gallery.removeClass(this.options.autorotationDisabledClass);
                this.autoRotate();
            }
        },
        autoRotate: function () {
            var self = this;
            clearTimeout(this.timer);
            if (this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
                this.timer = setTimeout(function () {
                    self.nextSlide(true);
                }, this.options.switchTime);
            } else {
                this.pauseRotation();
            }
        },
        bindHandlers: function (handlersList) {
            var self = this;
            $.each(handlersList, function (index, handler) {
                var origHandler = self[handler];
                self[handler] = function () {
                    return origHandler.apply(self, arguments);
                };
            });
        },
        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function () {
            // destroy handler
            $(window).unbind('load resize orientationchange', this.onWindowResize);
            this.btnPrev.unbind(this.options.event, this.prevSlideHandler);
            this.btnNext.unbind(this.options.event, this.nextSlideHandler);
            this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler);
            this.gallery.unbind('mouseenter', this.hoverHandler);
            this.gallery.unbind('mouseleave', this.leaveHandler);

            // autorotation buttons handlers
            this.stopRotation();
            this.btnPlay.unbind(this.options.event, this.btnPlayHandler);
            this.btnPause.unbind(this.options.event, this.btnPauseHandler);
            this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler);

            // destroy swipe handler
            if (this.swipeHandler) {
                this.swipeHandler.destroy();
            }

            // remove inline styles, classes and pagination
            var unneededClasses = [this.options.galleryReadyClass, this.options.autorotationActiveClass, this.options.autorotationDisabledClass];
            this.gallery.removeClass(unneededClasses.join(' '));
            this.slider.add(this.slides).removeAttr('style');
            if (typeof this.options.generatePagination === 'string') {
                this.pagerHolder.empty();
            }
        }
    };

    // detect device type
    var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    // jquery plugin
    $.fn.scrollGallery = function (opt) {
        return this.each(function () {
            $(this).data('ScrollGallery', new ScrollGallery($.extend(opt, { holder: this })));
        });
    };
}(jQuery));

// open-close init
function initOpenClose() {
    jQuery('.open-close').openClose({
        hideOnClickOutside: true,
        activeClass: 'active',
        opener: '.opener',
        slider: '.slide',
        animSpeed: 400,
        effect: 'slide'
    });
}

/*
 * jQuery Open/Close plugin
 */
(function ($) {
    function OpenClose(options) {
        this.options = $.extend({
            addClassBeforeAnimation: true,
            hideOnClickOutside: false,
            activeClass: 'active',
            opener: '.opener',
            slider: '.slide',
            animSpeed: 400,
            effect: 'fade',
            event: 'click'
        }, options);
        this.init();
    }
    OpenClose.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function () {
            this.holder = $(this.options.holder);
            this.opener = this.holder.find(this.options.opener);
            this.slider = this.holder.find(this.options.slider);
        },
        attachEvents: function () {
            // add handler
            var self = this;
            this.eventHandler = function (e) {
                e.preventDefault();
                if (self.slider.hasClass(slideHiddenClass)) {
                    self.showSlide();
                } else {
                    self.hideSlide();
                }
            };
            self.opener.bind(self.options.event, this.eventHandler);

            // hover mode handler
            if (self.options.event === 'over') {
                self.opener.bind('mouseenter', function () {
                    if (!self.holder.hasClass(self.options.activeClass)) {
                        self.showSlide();
                    }
                });
                self.holder.bind('mouseleave', function () {
                    self.hideSlide();
                });
            }

            // outside click handler
            self.outsideClickHandler = function (e) {
                if (self.options.hideOnClickOutside) {
                    var target = $(e.target);
                    if (!target.is(self.holder) && !target.closest(self.holder).length) {
                        self.hideSlide();
                    }
                }
            };

            // set initial styles
            if (this.holder.hasClass(this.options.activeClass)) {
                $(document).bind('click touchstart', self.outsideClickHandler);

            } else {
                this.slider.addClass(slideHiddenClass);
            }
        },
        showSlide: function () {
            var self = this;
            if (self.options.addClassBeforeAnimation) {
                self.holder.addClass(self.options.activeClass);
            }
            self.slider.removeClass(slideHiddenClass);
            $(document).bind('click touchstart', self.outsideClickHandler);

            self.makeCallback('animStart', true);
            toggleEffects[self.options.effect].show({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function () {
                    if (!self.options.addClassBeforeAnimation) {
                        self.holder.addClass(self.options.activeClass);
                    }
                    self.makeCallback('animEnd', true);
                }
            });
        },
        hideSlide: function () {
            var self = this;
            if (self.options.addClassBeforeAnimation) {
                self.holder.removeClass(self.options.activeClass);
            }
            $(document).unbind('click touchstart', self.outsideClickHandler);

            self.makeCallback('animStart', false);
            toggleEffects[self.options.effect].hide({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function () {
                    if (!self.options.addClassBeforeAnimation) {
                        self.holder.removeClass(self.options.activeClass);
                    }
                    self.slider.addClass(slideHiddenClass);
                    self.makeCallback('animEnd', false);
                }
            });
        },
        destroy: function () {
            this.slider.removeClass(slideHiddenClass).css({ display: '' });
            this.opener.unbind(this.options.event, this.eventHandler);
            this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
            $(document).unbind('click touchstart', this.outsideClickHandler);
        },
        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    };

    // add stylesheet for slide on DOMReady
    var slideHiddenClass = 'js-slide-hidden';
    (function () {
        var tabStyleSheet = $('<style type="text/css">')[0];
        var tabStyleRule = '.' + slideHiddenClass;
        tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
        if (tabStyleSheet.styleSheet) {
            tabStyleSheet.styleSheet.cssText = tabStyleRule;
        } else {
            tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
        }
        $('head').append(tabStyleSheet);
    }());

    // animation effects
    var toggleEffects = {
        slide: {
            show: function (o) {
                o.box.stop(true).hide().slideDown(o.speed, o.complete);
            },
            hide: function (o) {
                o.box.stop(true).slideUp(o.speed, o.complete);
            }
        },
        fade: {
            show: function (o) {
                o.box.stop(true).hide().fadeIn(o.speed, o.complete);
            },
            hide: function (o) {
                o.box.stop(true).fadeOut(o.speed, o.complete);
            }
        },
        none: {
            show: function (o) {
                o.box.hide().show(0, o.complete);
            },
            hide: function (o) {
                o.box.hide(0, o.complete);
            }
        }
    };

    // jQuery plugin interface
    $.fn.openClose = function (opt) {
        return this.each(function () {
            jQuery(this).data('OpenClose', new OpenClose($.extend(opt, { holder: this })));
        });
    };
}(jQuery));

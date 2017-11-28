(function () {
    function backTop(button, opts) {
        this.opts = $.extend({}, backTop.DEFAULTS, opts)
        this.$el = $('html, body')
        this.button = $(button)
        this.checkPosition()
        this.button.on('click', $.proxy(this[this.opts.mode], this))
        $(window).on('scroll', debounce(this.checkPosition.bind(this), 300))
    }

    function debounce(fn, delay) {
        var timer
        return function () {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(function () {
                fn.apply(null, arguments)
            }, delay)
        }
    }

    backTop.prototype.move = function () {
        if (this.judgeAnimate()) {
            this.$el.animate({
                scrollTop: this.opts.pos
            }, this.opts.delay)
        }
    }

    backTop.prototype.go = function () {
        if (this.judgeAnimate()) {
            this.$el.scrollTop(this.opts.pos)
        }
    }

    backTop.prototype.checkPosition = function () {
        var clientHeight = $(window).height()
        if ($(window).scrollTop() > clientHeight) {
            this.button.fadeIn()
        } else {
            this.button.fadeOut()
        }
    }

    backTop.prototype.judgeAnimate = function () {
        return $(window).scrollTop() !== this.opts.pos && !this.$el.is(':animated')
    }

    backTop.DEFAULTS = {
        pos: 0,
        delay: 300,
        mode: 'move'
    }

    _globals = (function () {
        return this || (0, eval)("this");
    }())

    if (typeof module !== "undefined" && module.exports) {
        module.exports = backTop
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return backTop
        })
    } else {
        _globals.backTop = backTop
    }

    $.fn.extend({
        backTop: function (opts) {
            return this.each(function () {
                new backTop(this, opts)
            })
        }
    })
})()
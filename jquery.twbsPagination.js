/**
 * jQuery pagination plugin v1.1.1
 * http://esimakin.github.io/twbs-pagination/
 *
 * Copyright 2014, Eugene Simakin
 * Released under Apache 2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 */

// CMD wrapper
var $ = require('jquery');
var Events = require('eventor');

//@todo update function
//@destroy method

// PROTOTYPE AND CONSTRUCTOR
var defaults = {
    totalPages: 0,
    startPage: 1,
    visiblePages: 10,
    href: 'javascript:void(0);',
    hrefVariable: '{{number}}',
    first: '首页',
    prev: '上一页',
    next: '下一页',
    last: '最后一页',
    nlChange:false,
    paginationClass: 'mk-pagination',
    paginationItemClass: 'mk-pagination-item',
    onPageClick: null,
    autoHide:false,
    showFirst: true,// if show first btn
    showLast: true, // if show last btn
    showPrev:true,
    showNext:true,
    triggerClickOnInt: false // it may cause page crash if set to true when bind onclick callback not carefully
};
var Pager = function (options) {
    this.$element = $(options.target);
    this.options = $.extend({}, defaults, options);
    this.init(this.options);
};

// mixin
Events.mixTo(Pager);

Pager.prototype.init = function (options) {
    this.options = $.extend({}, this.options, options);

    if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
        throw new Error('Start page option is incorrect');
    }

    if (this.options.totalPages <= 0) {
        throw new Error('Total pages option cannot be less 1 (one)!');
    }

    if (this.options.totalPages < this.options.visiblePages) {
        this.options.visiblePages = this.options.totalPages;
    }

    if (this.options.onPageClick instanceof Function) {
        this.$element.bind('ui-pager-page', this.options.onPageClick);
    }

    var tagName = (typeof this.$element.prop === 'function') ?
        this.$element.prop('tagName') : this.$element.attr('tagName');

    if (tagName === 'UL') {
        this.$listContainer = this.$element;
    } else {
        this.$listContainer = $('<ul></ul>');
    }

    this.$listContainer.addClass(this.options.paginationClass);

    if (tagName !== 'UL') {
        this.$element.append(this.$listContainer);
    }

    this.render(this.getPages(this.options.startPage));
    this.setupEvents();
    this.trigger('init');

    if (this.options.triggerClickOnInt) {
        this.$element.trigger('ui-pager-page', this.options.startPage);
    }

    return this;
};

Pager.prototype.destroy = function () {
    this.$element.empty();
    this.trigger('destroy');
    return this;
};

Pager.prototype.show = function (page) {
    if (page < 1 || page > this.options.totalPages) {
        throw new Error('Page is incorrect.');
    }

    this.render(this.getPages(page));
    this.setupEvents();

    this.$element.trigger('ui-pager-page', page);
    this.trigger('show', page, page===1, page===this.options.totalPages);
    return this;
};

Pager.prototype.buildListItems = function (pages) {
    var $listItems = $();

    if(this.options.pfChange){
        if (this.options.prev && this.options.showPrev) {
            var prev = pages.currentPage > 1 ? pages.currentPage - 1 : 1;
            $listItems = $listItems.add(this.buildItem('prev', prev));
        }

        if (this.options.first && this.options.showFirst) {
            $listItems = $listItems.add(this.buildItem('first', 1));
        }
    }else{
        if (this.options.first && this.options.showFirst) {
            $listItems = $listItems.add(this.buildItem('first', 1));
        }

        if (this.options.prev && this.options.showPrev) {
            var prev = pages.currentPage > 1 ? pages.currentPage - 1 : 1;
            $listItems = $listItems.add(this.buildItem('prev', prev));
        }
    }

    for (var i = 0; i < pages.numeric.length; i++) {
        $listItems = $listItems.add(this.buildItem('ui-pager-page', pages.numeric[i]));
    }

    if(this.options.nlChange){
        if (this.options.last && this.options.showLast) {
            $listItems = $listItems.add(this.buildItem('last', this.options.totalPages));
        }
        if (this.options.next) {
            var next = pages.currentPage >= this.options.totalPages ? this.options.totalPages : pages.currentPage + 1;
            $listItems = $listItems.add(this.buildItem('next', next));
        }
    }else{
        if (this.options.next) {
            var next = pages.currentPage >= this.options.totalPages ? this.options.totalPages : pages.currentPage + 1;
            $listItems = $listItems.add(this.buildItem('next', next));
        }

        if (this.options.last && this.options.showLast) {
            $listItems = $listItems.add(this.buildItem('last', this.options.totalPages));
        }

    }
    return $listItems;
};

Pager.prototype.buildItem = function (type, page) {
    var itemContainer = $('<li></li>'),
        itemContent = $('<a></a>'),
        itemText = null;

    itemContainer.addClass(type);
    // I just cannot simply change another class name..
    if (type === 'ui-pager-page') {
        itemContainer/*.removeClass('page')*/.addClass(this.options.paginationItemClass);
    }
    itemContainer.data('ui-pager-page', page);

    switch (type) {
        case 'ui-pager-page':
            itemText = page;
            break;
        case 'first':
            itemText = this.options.first;
            break;
        case 'prev':
            itemText = this.options.prev;
            break;
        case 'next':
            itemText = this.options.next;
            break;
        case 'last':
            if(this.options.visiblePages+1===this.options.totalPages){
                this.options.last = this.options.last.match(/(\d+)/)[0]
            }
            itemText = this.options.last;
            break;
        default:
            break;
    }

    itemContainer.append(itemContent.attr('href', this.href(page)).html(itemText));
    return itemContainer;
};

Pager.prototype.getPages = function (currentPage) {
    var pages = [];

    var half = Math.floor(this.options.visiblePages / 2);
    var start = currentPage - half + 1 - this.options.visiblePages % 2;
    var end = currentPage + half;

    // handle boundary case
    if (start <= 0) {
        start = 1;
        end = this.options.visiblePages;
    }
    if (end > this.options.totalPages) {
        start = this.options.totalPages - this.options.visiblePages + 1;
        end = this.options.totalPages;
    }

    var itPage = start;
    while (itPage <= end) {
        pages.push(itPage);
        itPage++;
    }

    return {
        "currentPage": currentPage,
        "numeric": pages
    };
};

Pager.prototype.render = function (pages) {
    this.$listContainer.children().remove();
    this.$listContainer.append(this.buildListItems(pages));

    this.$listContainer.find('.'+this.options.paginationClass).removeClass('active');
    this.$listContainer.find('.'+this.options.paginationItemClass).filter(function () {
        return $(this).data('ui-pager-page') === pages.currentPage;
    }).addClass('active');

    var minFirstHide,maxLastHide;
    minFirstHide = Math.ceil(this.options.visiblePages/2+1);
    maxLastHide = Math.floor(this.options.totalPages-this.options.visiblePages/2);


    if(pages.currentPage<minFirstHide||this.options.totalPages<=this.options.visiblePages){
        this.$listContainer.find('.first').hide();
    }

    if (pages.currentPage === 1) {
        this.$listContainer.find('.prev a,.first a').attr("href", "javascript:void(0);");
        if(this.options.autoHide===true){
            this.$listContainer.find('.prev').hide();

        }
    }

    if(this.options.totalPages<=this.options.visiblePages){

        this.$listContainer.find('.last').hide();
        if (pages.currentPage === this.options.totalPages) {
            this.$listContainer.find('.next a,.last a').attr("href", "javascript:void(0);");
            if(this.options.autoHide===true){
                this.$listContainer.find('.next').hide();
            }
        }
    }else{
        if(pages.currentPage>maxLastHide){
            this.$listContainer.find('.last').hide();
        }

        if (pages.currentPage === this.options.totalPages) {
            this.$listContainer.find('.next a,.last a').attr("href", "javascript:void(0);");
            if(this.options.autoHide===true){
                this.$listContainer.find('.next').hide();
            }
        }
    }



    this.$listContainer.find('.first')
        .toggleClass('disabled', pages.currentPage === 1);

    this.$listContainer.find('.last')
        .toggleClass('disabled', pages.currentPage === this.options.totalPages);

    this.$listContainer.find('.prev')
        .toggleClass('disabled', pages.currentPage === 1);

    this.$listContainer.find('.next')
        .toggleClass('disabled', pages.currentPage === this.options.totalPages);
};

Pager.prototype.setupEvents = function () {
    var base = this;
    this.$listContainer.find('li').each(function () {
        var $this = $(this);
        $this.off();
        if ($this.hasClass('disabled') || $this.hasClass('active')) return;
        $this.click(function () {
            base.show(parseInt($this.data('ui-pager-page'), 10));
        });
    });
};

Pager.prototype.equals = function (arr1, arr2) {
    var i = 0;
    while ((i < arr1.length) || (i < arr2.length)) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
        i++;
    }
    return true;
};

Pager.prototype.href = function (c) {
    return this.options.href.replace(this.options.hrefVariable, c);
};


module.exports = Pager;
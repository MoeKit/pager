# 分页加入href属性
- order: 3
---
##配置href,点击后跳转

配置 `href`


````html
<link href="../pager.css" rel="stylesheet">
<div class="ui-pager clearfix">
<ul class="href-pagination ui-pager-pg"></ul>
</div>
 <div id="sync-example-page-content" class="well"></div>
 
<div class="ui-pager clearfix">
<ul class="sync-pagination ui-pager-pg"></ul>
 </div>
````

 
````javascript
var Pager = require('pager');
new Pager({
        target:'.href-pagination',
        totalPages: 35,
        visiblePages: 7,
        startPage: 5,
        href: 'pager_{{number}}',
        hrefVariable: '{{number}}',
        paginationItemClass: 'ui-pager-item',
        showFirst:false,
        showPrev:false,
        onPageClick: function (event, page) {
           //alert(page);
           // a bug
        }
    }).on('all',function(event,a){
        console.log(event,a);
    });
````
---

##配置href,点击后不跳转

同时配置 `href`和`preventDefault:true`

````html
<link href="../pager.css" rel="stylesheet">
<div class="ui-pager clearfix">
<ul class="href-prevent-pagination ui-pager-pg"></ul>
</div>
<div id="sync-example-page-content" class="well"></div>
 
<div class="ui-pager clearfix">
<ul class="sync-pagination ui-pager-pg"></ul>
</div>
````

 
````javascript
var Pager = require('pager');
new Pager({
        target:'.href-prevent-pagination',
        totalPages: 35,
        visiblePages: 7,
        startPage: 5,
        href: '{{number}}',
        hrefVariable: '{{number}}',
        paginationItemClass: 'ui-pager-item',
        showFirst:false,
        showPrev:false,
        preventDefault:true,
        onPageClick: function (event, page) {
           //alert(page);
           // a bug
        }
    }).on('all',function(event,a){
        console.log(event,a);
    });

````
---
# Demo

---

##论坛风格的分页

<link href="../pager.css" rel="stylesheet">
<div id="demo-1" class="ui-pager clearfix"></div>

````javascript
seajs.use('index',function(Pager){
    new Pager({
            target:'#demo-1',
            totalPages: 35,
            visiblePages: 7,
            startPage: 5,
            paginationClass: 'ui-pager-pg',
            paginationItemClass: 'ui-pager-item',
            onPageClick: function (event, page) {
               alert(page);
            }
        }).on('show',function(page,isFirst,isLast){
            console.log(page,isFirst,isLast);
        });
});
````

---

##传说的可同步分页

<link href="../pager.css" rel="stylesheet">
<div class="ui-pager clearfix">
<ul class="sync-pagination ui-pager-pg"></ul>
</div>
 <div id="sync-example-page-content" class="well"></div>
 
<div class="ui-pager clearfix">
<ul class="sync-pagination ui-pager-pg"></ul>
 </div>
 
````javascript
seajs.use('index',function(Pager){
    new Pager({
            target:'.sync-pagination',
            totalPages: 35,
            visiblePages: 7,
            startPage: 5,
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
});
````

---

##真论坛风格的分页
 <p>按照当前论坛风格，加入<code>autoHide</code>参数控制前页后页首页末页4个按钮的隐藏于显示。</p>
 
<link href="../pager.css" rel="stylesheet">
<div id="demo-bbs" class="ui-pager clearfix"></div>


````javascript
seajs.use('index',function(Pager){
    var total = Math.ceil(86/10),visible = 6;
    new Pager({
            target:'#demo-bbs',
            totalPages: total,
            visiblePages: visible,
            startPage: 1,
            paginationClass: 'ui-pager-pg',
            paginationItemClass: 'ui-pager-item',
            first:'1...',
            prev:'<',
            last:'...'+total,
            next:' > ',
            pfChange:true,          
            nlChange:true,          
            autoHide:true,          
            onPageClick: function (event, page) {
               alert(page);
            }
        }).on('show',function(page,isFirst,isLast){
            console.log(page,isFirst,isLast);
        });
});
````

---


##Boostrap风格的分页

<link href="../twbspager.css" rel="stylesheet">

<div id="demo-2" class="ui-pager clearfix"></div>

````javascript
seajs.use('index',function(Pager){
    new Pager({
            target:'#demo-2',
            totalPages: 35,
            visiblePages: 7,
            startPage: 5,
            paginationClass: 'mk-pagination mk-pagination-sz',
            onPageClick: function (event, page) {
               //alert(page);
               // a bug
            }
        }).on('all',function(event,a){
            console.log(event,a);
        });
});
````
---

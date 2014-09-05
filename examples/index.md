# Demo

---

##论坛风格的分页

<link href="../pager.css" rel="stylesheet">
<div id="demo-1" class="ui-pager clearfix"></div>

````javascript
seajs.use('index',function(Pager){
    console.log(Pager);
    new Pager({
            target:'#demo-1',
            totalPages: 35,
            visiblePages: 7,
            startPage: 5,
            paginationClass: 'ui-pager-pg',
            paginationItemClass: 'ui-pager-item',
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

##Boostrap风格的分页

<link href="../twbspager.css" rel="stylesheet">

<div id="demo-2" class="ui-pager clearfix"></div>

````javascript
seajs.use('index',function(Pager){
    console.log(Pager);
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
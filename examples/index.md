# Demo

- order: 1
---
##Boostrap风格的分页

<link href="../twbspager.css" rel="stylesheet">

<div id="demo-2" class="ui-pager clearfix"></div>

````javascript
var Pager = require('pager');
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
````

---

# Destroy
- order: 4

---
##destroy

<link href="../pager.css" rel="stylesheet">

<a id="page_init" style="padding:5px;border:1px solid #dedede;background:#efefef;">点我初始化</a>

<div id="demo-destroy" class="ui-pager clearfix"></div>


````javascript
var Pager = require('pager'),pageHandler=null,$ = require('jquery');
var total = 10,visible = 6,startPage =1;

$('#page_init').on('click',function(){
   pageHandler && pageHandler.destroy(); 
   
   pageHandler=new Pager({
                       target:'#demo-destroy',
                       totalPages: total,
                       visiblePages: visible,
                       startPage: startPage,
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
                       alert('on show '+page);
                       console.log(page,isFirst,isLast);
                   });
   total+=1;
   visible += 1;
   startPage+=1;

})


````

---
# Demo

---

````html
<div id="demo-1"></div>
````
````javascript
seajs.use('index',function(Pager){
    console.log(Pager);
    new Pager({
            target:'#demo-1',
            totalPages: 35,
            visiblePages: 7,
            startPage: 5,
            onPageClick: function (event, page) {
               //alert(page);
               // a bug
            }
        });
});
````
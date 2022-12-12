function setData () {
    
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
}
function setData1 (data) {
    let {id,title,price} = data;
    console.log(id,title,price);
   
   
}

function test() {
    $.getJSON("./db.JSON", function (db) {

        document.getElementById("main-prod").innerHTML = 
        db.map((data)=>{
           let link="./images/"+data.id+".jpg";
           
            return '<div class="col">'+
            '<div class="card" style="width: 18rem;">'+
                '<img src='+link+' alt="..." class="card-img-top" >'+
                '<div class="card-body">'+
                  '<h5 class="card-title">'+data.title+'</h5>'+
                  '<p class="card-text"><strong>Price: </strong>'+data.price+'</p>'+
                  '<button class="btn btn-primary" id="card-button" onClick="setData('+data.id+','+data.price+','+data.title+')">Add to cart</button>'+
                '</div>'+
              '</div>'+
          '</div>'
        })
    })
}
//,'+data.title+','+data.price+'     
// $(document).on("click", "#card-button", function(e) {
//     alert("Your values are :"+ $(this).data("value"));  
//     //setData1(data);
//     // or you can just place the contents of setLocalStorage directly 
//     // into here! 
// })
// $(document).ready(function() {
//     $('#card-button').on('click', function (e) {
//      alert("Your values are :"+ $(this).data("value"));        
//     });   
// });
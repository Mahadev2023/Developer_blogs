
var c=1010;
while(c-->0){let id=c%10; fetch("http://localhost:3000/blogs",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
  
  "where":{
      "creator":id
  }

      
})
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) });fetch("http://localhost:3000/rating",
{
    method: "get",
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })}
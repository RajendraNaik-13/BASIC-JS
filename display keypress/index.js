
$("h1").text("hello")

$("h1").text($("button").keypress(function(event){
    console.log(event.key)
}))

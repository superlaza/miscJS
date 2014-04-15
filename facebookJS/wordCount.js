var jq = document.createElement('script');
jq.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type.
jQuery.noConflict();

var theirTotal = 0;
var yourTotal = 0;

$(document).ready(function(){
	//var yourName = $("h1","#rhs").text();
	var yourName = "Perlaza"
	var theirName = "Bird";
	$(".thread").each(function(){
		if(this.innerHTML.slice(0,20).split(" ")[1].slice(0,-1) == theirName){
			$(".message",$(this)).each(function(){
				var words;
				if($(".user",$(".message_header",$(this))).text().split(" ")[1]==theirName){
					words = $(this).siblings(".msgbody").text();
					theirTotal+=words.split(' ').length;
				}
				if($(".user",$(".message_header",$(this))).text().split(" ")[1]==yourName){
					words = $(this).siblings(".msgbody").text();
					yourTotal+=words.split(' ').length;
				}
			});
			//break loop
			return false;
		}
	});
	alert(yourName+": "+yourTotal+"\n"+theirName+": "+theirTotal);
});

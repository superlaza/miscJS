var theirTotal = 0;
var yourTotal = 0;

$(document).ready(function(){
	var yourName = $("h1","#rhs").text();
	var theirName = "Santiago Guisasola";
	$(".thread").each(function(){
		if($(".profile",$(".header",$(this))).text().match(theirName)!== null){
			$(".from",$(this)).each(function(){
				var words;
				if($(".profile",$(this)).text()==theirName){
					words = $(this).siblings(".msgbody").text();
					theirTotal+=words.split(' ').length;
				}
				if($(".profile",$(this)).text()==yourName){
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

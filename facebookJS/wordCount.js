var jq = document.createElement('script');
jq.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type.
jQuery.noConflict();

//utility function
function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}

var theirTotal = 0;
var yourTotal = 0;

jQuery(document).ready(function(){
	var yourName = "Bird"
	var theirName = "Perlaza";
	jQuery(".thread").each(function(){
		// might want to change this to "this.text().indexOf(theirName) != -1
		if(this.innerHTML.split("<")[0].indexOf(theirName) != -1){
			jQuery(".message",jQuery(this)).each(function(){
				var words;
				userName = jQuery(".user",jQuery(".message_header",jQuery(this))).text().split(" ")[1];
				if(userName==theirName){
					words = jQuery(this).siblings("p").text();
					theirTotal+=words.split(' ').length;
				}
				if(userName==yourName){
					words = $(this).siblings("p").text();
					yourTotal+=words.split(' ').length;
				}
			});
			//break loop
			return false;
		}
	});
	alert(yourName+": "+yourTotal+"\n"+theirName+": "+theirTotal);
});

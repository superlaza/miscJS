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

//jQuery(document).ready(function(){

	var yourName = "Bird";
	var theirName = "Perlaza";
	//just run through the first thread
	jQuery([jQuery(".thread")[0]]).each(function(){
		// might want to change this to "this.text().indexOf(theirName) != -1
		if(this.innerHTML.split("<")[0].indexOf(theirName) != -1){
			results = jQuery(".message",jQuery(this));
			for(var i=0; i<results.length; ++i){
				var words;
				var split;
				userName = jQuery(".user",jQuery(".message_header",jQuery(results[i]))).text().split(" ")[1];
				words = jQuery(results[i]).next("p").text();//get the p element immediately following the message div
				console.log(results[i]);
				split = words.split(' ').length;
				if(userName==theirName){
					theirTotal+=split;
				}
				if(userName==yourName){
					yourTotal+=split;
				}
			}
			//break loop
			return false;
		}
	});
	alert(yourName+": "+yourTotal+"\n"+theirName+": "+theirTotal);

//});

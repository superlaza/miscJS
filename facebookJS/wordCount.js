/**
 * Created by David on 6/15/2014.
 */
function jqLoad(){
    var jq = document.createElement('script');
    jq.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    // ... give time for script to load, then type.
    jQuery.noConflict();
}

//initialize
var theirTotal = 0;
var yourTotal = 0;

//JSON object
conversation = {
    "participants" : [],
    "messages" : []
};

months = {'January': 1,
    'February':2,
    'March':3,
    'April':4,
    'May':5,
    'June':6,
    'July':7,
    'August':8,
    'September':9,
    'October':10,
    'November':11,
    'December':12};

//jQuery(document).ready(function(){

var yourName = "Bird";
var theirName = "Perlaza";
//just run through the first thread
jQuery([jQuery(".thread")[0]]).each(function(){
    // might want to change this to "this.text().indexOf(theirName) != -1
    if(this.innerHTML.split("<")[0].indexOf(theirName) != -1){
        results = jQuery(".message",jQuery(this));
        for(var i=0; i<results.length; ++i){
            //local scope
            message = {
                "user" : "",
                "date" : "",
                "text" : ""
            };
            var fbdate;
            var fbtime;
            var text;
            var words;

            /*========GET USER===========*/
            //these queries are really inefficient
            userName = jQuery(".user",jQuery(".message_header",jQuery(results[i]))).text().split(" ")[1];

            /*========GET DATE===========*/
            //1:month, 2:day, 3:year, 5:time, need to incorporate different timezone codes later.....
            fbdate = jQuery(".meta",jQuery(".message_header",jQuery(results[i]))).text().split(/[ ,]+/);
            //extract the time, make array of [hour, minute]
            fbtime = fbdate[5].slice(0,-2).split(":");
            if(fbdate[5].slice(-2) == "pm"){
                date = new Date(parseInt(fbdate[3]), months[fbdate[1]], parseInt(fbdate[2]), parseInt(fbtime[0])+12, parseInt(fbtime[1]));
            }
            else{
                date = new Date(parseInt(fbdate[3]), months[fbdate[1]], parseInt(fbdate[2]), parseInt(fbtime[0]), parseInt(fbtime[1]));
            }

            /*========GET TEXT===========*/
            text = jQuery(results[i]).next("p").text();//get the p element immediately following the message div

            /*===========================*/
            wordcount = text.split(' ').length;
            if(userName==theirName){
                theirTotal+=wordcount;
            }
            if(userName==yourName){
                yourTotal+=wordcount;
            }
        }
        //break loop
        return false;
    }
});
alert(yourName+": "+yourTotal+"\n"+theirName+": "+theirTotal);

//});

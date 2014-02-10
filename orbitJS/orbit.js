$(document).on({
    mousemove: onMove
});
//dopri(x0,x1,y0,f,tol,maxit,event) solve within interval (x0,x1) where (x0,y0) are initial values

//le globals
var m = 0.6;
var x0 = 600; //initial positions
var y0 = 300;

var inMotion = false;
var solved = false;

var lapse = 0;

//starting velocities
var vx = 0;
var vy = 0;

var sol;

var fly = document.getElementById("test");
fly.style.position = "absolute";
fly.style.left = "100px";
fly.style.top = "100px";
var time = 0;

//positions of the flying element
var flyX = parseInt(fly.style.left);
var flyY = parseInt(fly.style.top);

//solve the gravitational motion differential equations with the given initial conditions
sol = dopri(0,
2000, [flyX, vx, flyY, vy],

function (t, y) {
    return [y[1], -m * (y[0] - x0) / Math.sqrt((y[0] - x0) * (y[0] - x0) + (y[2] - y0) * (y[2] - y0)),
    y[3], -m * (y[2] - y0) / Math.sqrt((y[0] - x0) * (y[0] - x0) + (y[2] - y0) * (y[2] - y0))];
});

function onMove() {
    inMotion = true;

    flyX = sol.at([time])[0][0];
    flyY = sol.at([time])[0][2];

    x0 = window.event.clientX;
    y0 = window.event.clientY;

    ++lapse;
    //15 millisecond lapse works well
    if (lapse == 15) {
        sol = dopri(0 + time,
        2000 + time, [flyX, vx, flyY, vy],

        function (t, y) {
            return [y[1], -m * (y[0] - x0) / Math.sqrt((y[0] - x0) * (y[0] - x0) + (y[2] - y0) * (y[2] - y0)),
            y[3], -m * (y[2] - y0) / Math.sqrt((y[0] - x0) * (y[0] - x0) + (y[2] - y0) * (y[2] - y0))];
        });
        lapse = 0;
    }

    inMotion = false;
}

//var coords = document.getElementById('divCoord');
var interval = setInterval(function () {
    if (!solved && !inMotion) {
        sol = dopri(0 + time,
        20000 + time, [flyX, vx, flyY, vy],

        function (t, y) {
            return [y[1], -m * (y[0] - x0) / Math.sqrt((y[0] - x0) * (y[0] - x0) + (y[2] - y0) * (y[2] - y0)),
            y[3], -m * (y[2] - y0) / Math.sqrt((y[0] - x0) * (y[0] - x0) + (y[2] - y0) * (y[2] - y0))];
        });
        solved = true;
    }
    fly.style.left = Math.round(sol.at([time])[0][0]) + "px";
    fly.style.top = Math.round(sol.at([time])[0][2]) + "px";
    //var s = 'X=' + sol.at([time])[0][0] +  ' Y=' + sol.at([time])[0][2];
    //coords.innerText = s;
    vx = sol.at([time])[0][1];
    vy = sol.at([time])[0][3];
    time += 0.1;
    $("#time").text(time);
}, 1);

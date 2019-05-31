const HOST_URL = 'https://androidgyrosocket.herokuapp.com';
var socket = io.connect(HOST_URL);

var cnt = 0;

Plotly.plot('chart', [{
    y: [0],
    type: "scatter",
    mode: "lines",
    name: "X",
    //line: {color: '#17BECF'}
}, {
    y: [0],
    type: "scatter",
    mode: "lines",
    name: "Y",
    //line: {color: '#7F7F7F'}
}, {
    y: [0],
    type: "scatter",
    mode: "lines",
    name: "Z",
    //line: {color: '#7F7F7F'}
}]);

socket.on('recieveAccelerometerDatea', data => {
     //console.log(data);
    var x = document.getElementById("xRow");
    x.innerHTML = data.x;
    var y = document.getElementById("yRow");
    y.innerHTML = data.y;
    var z = document.getElementById("zRow");
    z.innerHTML = data.z;
    var i = document.getElementById("iRow");
    i.innerHTML = data.i;

    Plotly.extendTraces('chart', {
        y: [[data.x], [data.y], [data.z]]
    }, [0, 1, 2])
    cnt++;
    if(cnt > 500){
        Plotly.relayout('chart', {
            xaxis: {
                range: [cnt-500, cnt]
            }
        });
    }
});

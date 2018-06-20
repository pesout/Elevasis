/*
************************
Created by Stepan Pesout
*****www.pesout.eu******
*****@stepanpesout******
************************
*/

var platno = document.getElementById("platno");
var kontext = platno.getContext("2d");

function drawAxis() {
    kontext.fillStyle = "#ecf0f1";
    kontext.fillRect(0, 0, platno.width, platno.height);

    kontext.lineWidth = 2;
    kontext.strokeStyle = "#dcdcdc";
    kontext.beginPath();
        kontext.setLineDash([5, 5]);
        kontext.moveTo(0, 10);
        kontext.lineTo(platno.width, 10);
    kontext.closePath();
    kontext.stroke();

    kontext.lineWidth = 2;
    kontext.strokeStyle = "#dcdcdc";
    kontext.beginPath();
        kontext.setLineDash([5, 5]);
        kontext.moveTo(0, 70);
        kontext.lineTo(platno.width, 70);
    kontext.closePath();
    kontext.stroke();

    kontext.lineWidth = 2;
    kontext.strokeStyle = "#dcdcdc";
    kontext.beginPath();
        kontext.setLineDash([5, 5]);
        kontext.moveTo(0, 131);
        kontext.lineTo(platno.width, 131);
    kontext.closePath();
    kontext.stroke();
}

function graphDataProc(input_str)
{
    if (input_str.charAt(0) == ",")
        input_str = input_str.substring(1, input_str.length)
    input_arr = input_str.split(",");
    result = input_arr[0];
    for (i = 0; i < input_arr.length-1; i++) {
        difference = Math.round(input_arr[i+1]*1) - Math.round(input_arr[i]*1);
        result = result + "," + difference;
    }

    return result;
}

function drawGraph(input_data)
{
    var b = 0;
    var c = 0;
    var d = 0;
    var ea = 0;
    var eb = 0;

    var i = 0;

    var x = 0;
    var y = 0;
    var xpuv = 0;
    var ypuv = 0;
    var now = 0;

    var platno = document.getElementById("platno");
    var kontext = platno.getContext("2d");

  kontext.fillStyle = "#ecf0f1";
  kontext.fillRect(0, 0, platno.width, platno.height);

  a = graphDataProc(input_data) + ',';

  a = a.split(',');


  f = a[0];
  g = a[0];

  //Koncova vyska + nejvyssi a nejnizsi bod
  for (i = 0; i < a.length-1; i++)
  {
    b = b + (a[i]*1);
    if (b > f) {f = b;}
    if (b < g) {g = b;}
  }

  //Celkove stoupani
  for (i = 0; i < a.length-1; i++)
  {
    if (a[i]*1 > 0) {c = c + (a[i]*1)}
  }

  //Celkove klesani
  for (i = 0; i < a.length-1; i++)
  {
    if (a[i]*1 < 0) {d = d + (a[i]*-1)}
  }

  //Kresleni
  drawAxis();





  // kontext.lineWidth = 0.15;
  // kontext.strokeStyle = "#000";
  // kontext.beginPath();
  //   kontext.moveTo(0, 25);
  //   kontext.lineTo(platno.width, 25);
  //   kontext.moveTo(0, 40);
  //   kontext.lineTo(platno.width, 40);
  //   kontext.moveTo(0, 55);
  //   kontext.lineTo(platno.width, 55);
  //   kontext.moveTo(0, 85);
  //   kontext.lineTo(platno.width, 85);
  //   kontext.moveTo(0, 100);
  //   kontext.lineTo(platno.width, 100);
  //   kontext.moveTo(0, 115);
  //   kontext.lineTo(platno.width, 115);
  // kontext.closePath();
  // kontext.stroke();

  ea = 120 / (f - g);
  eb = (platno.width) / (a.length - 2);

  //Prvni zmena vysky
  xpuv = 0;
  ypuv = 130 - ((a[0] - g) * ea);

  now = (a[0]*1) + (a[1]*1);
  x = x + eb;
  y = 130 - ((now - g) * ea);

  kontext.lineWidth = 2.5;
  kontext.strokeStyle = "#777";

  kontext.beginPath();
    kontext.lineCap="round";
    kontext.setLineDash([0, 0]);
    kontext.moveTo(xpuv, ypuv);
    kontext.lineTo(x, y);
  kontext.closePath();
  kontext.stroke();

  //Druha az n-ta zmena vysky
  for (i = 2; i < a.length-1; i++)
  {
    xpuv = x;
    ypuv = y;

    now = now + (a[i]*1)
    x = x + eb;
    y = 130 - ((now - g) * ea);

    kontext.beginPath();
        kontext.lineCap="round";
        kontext.setLineDash([0, 0]);
      kontext.moveTo(xpuv, ypuv);
      kontext.lineTo(x, y);
      kontext.closePath();
      kontext.stroke();
  }

  //  ---  VYSTUP  ---
  document.getElementById("a").innerHTML = a[0];
  document.getElementById("b").innerHTML = b;
  document.getElementById("c").innerHTML = c - a[0];
  document.getElementById("d").innerHTML = d;
  document.getElementById("f").innerHTML = f;
  document.getElementById("g").innerHTML = g;


  document.getElementById("po1").innerHTML = f;
  if  (Math.abs(f-g) == 1)
    document.getElementById("po2").innerHTML = (((f*1) + (g*1)) / 2).toFixed(1);
  else
    document.getElementById("po2").innerHTML = Math.round(((f*1) + (g*1)) / 2);
  document.getElementById("po3").innerHTML = g;
}

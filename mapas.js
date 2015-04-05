function agregar_coordenadas(x,y,z){
	var posicion = L.marker([x,y]).addTo(map);
}

var colores = ['red','black','lightblue','pink','green',
'purple','red','black','lightblue','pink','green','purple','red','black','lightblue','pink','green','purple']

var user;
var fecha1;
var fecha2;
var jeison;
var lat;
var lon;
var lat2;
var lon2;
function form1() {
    user   = document.getElementById("usuario").value;
    fecha1 = document.getElementById("F1").value;
    fecha2 = document.getElementById("F2").value;
    jeison = JSON.parse(httpGet('input3.json'));
    agregar_coordenadas(0,0);
    for (i = 0; i < jeison.usuarios.length; i++) {
        if (jeison.usuarios[i].id == parseInt(user)) {
            for (k = 0; k < jeison.usuarios[i].checkins.length; k++){
                if (parseInt(jeison.usuarios[i].checkins[k].time.substring(5, 7))
                    <= parseInt(fecha2.substring(5,7)) && 
                    parseInt(jeison.usuarios[i].checkins[k].time.substring(5, 7)) 
                    >= parseInt(fecha1.substring(5,7))){
                    lat = jeison.usuarios[i].checkins[k].latitude;
                    lon = jeison.usuarios[i].checkins[k].longitude;
                    agregar_coordenadas(lat,lon);
                    if (k+1 < jeison.usuarios[i].checkins.length && 
                        parseInt(jeison.usuarios[i].checkins[k+1].time.substring(5, 7))
                        <= parseInt(fecha2.substring(5,7)) && 
                        parseInt(jeison.usuarios[i].checkins[k+1].time.substring(5, 7)) 
                        >= parseInt(fecha1.substring(5,7))){
                        lat2 = jeison.usuarios[i].checkins[k+1].latitude;
                        lon2 = jeison.usuarios[i].checkins[k+1].longitude;
                        UnirChecks([lat,lon],[lat2,lon2],{color: 'blue'});
                    }
                    }
                }
            for (j = 0; j < jeison.usuarios[i].amigos.length; j++){
                for (k = 0; k < jeison.usuarios[i].amigos[j].checkins.length; k++){
                    if (parseInt(jeison.usuarios[i].amigos[j].checkins[k].time.substring(5, 7))
                        <= parseInt(fecha2.substring(5,7)) && 
                        parseInt(jeison.usuarios[i].amigos[j].checkins[k].time.substring(5, 7)) 
                        >= parseInt(fecha1.substring(5,7))){
                        lat = jeison.usuarios[i].amigos[j].checkins[k].latitude;
                        lon = jeison.usuarios[i].amigos[j].checkins[k].longitude;
                        agregar_coordenadas(lat,lon,colores[j]);
                        if (k+1 < jeison.usuarios[i].amigos[j].checkins.length &&
                            parseInt(jeison.usuarios[i].amigos[j].checkins[k].time.substring(5, 7))
                            <= parseInt(fecha2.substring(5,7)) && 
                            parseInt(jeison.usuarios[i].amigos[j].checkins[k].time.substring(5, 7)) 
                            >= parseInt(fecha1.substring(5,7))){
                            lat2 = jeison.usuarios[i].amigos[j].checkins[k+1].latitude;
                            lon2 = jeison.usuarios[i].amigos[j].checkins[k+1].longitude;
                            UnirChecks([lat,lon],[lat2,lon2],colores[j]);
                        }
                    }
                }
            }
        }
    }  
}

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var a;
function obtenerJSON(){
    a = JSON.parse(httpGet('input3.json'));
    return a;
}

function prueba(x){
    alert('holi');
}

function addPoint(x,y){
    if(Math.abs(x[1] - y[1]) < 1){
        x[1] = y[1];
        x[0] = y[0];
        polyline.addLatLng(L.latLng(x, y));
    }
    else if (y[1] > x[1]){
        x[1] = x[1] + 1;
        x[0] = pendiente*x[1] + y[0] - pendiente*y[1];
        polyline.addLatLng(L.latLng(x, y));
        addPoint(x,y);
    }
    else if(y[1] < x[1]){
        x[1] = x[1] - 1;
        x[0] = pendiente*x[1] + y[0] - pendiente*y[1];
        polyline.addLatLng(L.latLng(x, y));
        addPoint(x,y);
    }
}

var polyline;
var pendiente;
function UnirChecks(x,y,z){
    polyline = L.polyline([],{color: z}).addTo(map);
    pendiente = (y[0]-x[0])/(y[1]-x[1]);
    polyline.addLatLng(L.latLng(x, y));
    addPoint(x,y);
    map.setView([0, 0], 1);
    }
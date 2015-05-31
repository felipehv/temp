import smtplib
import pywapi
global msg, micorreo,para,usuario,contraseña
micorreo = 'fahaase95@gmail.com'
para = 'fahaase@uc.cl'
usuario = 'fahaase95'
contraseña = 'computacion1005'
#crontab -e
def enviar_correo(msg):
	server = smtplib.SMTP('smtp.gmail.com:587')
	server.ehlo()
	server.starttls()
	server.login(usuario,contraseña)
	server.sendmail(micorreo, para, msg)
	server.quit()

clima = pywapi.get_weather_from_yahoo( 'CIXX0020' , units = 'metric' )
T_max = clima['forecasts'][0]['low']
T_min = clima['forecasts'][0]['high']
T_actual = clima['condition']['temp']
Fecha = clima['forecasts'][0]['date']
msg1 = 'La temperatura actual es de: ' + T_actual + ' grados\nLa maxima para hoy sera de ' + T_max + ' grados\nLa minima para hoy sera de: ' + T_min + ' grados\n'
msg = "\r\n".join(['From:'+
  micorreo,
  "To: "+ para,
  "Subject: Pronostico del tiempo " + Fecha,
  '',
  msg1
  ])
#enviar_correo(msg)

with open('holi.txt','w') as a:
	a.writelines(msg)
	a.close()

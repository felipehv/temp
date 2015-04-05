import csv
import random
### 0 = Usuario
### 1,2 = coordenadas
### 3 = fecha y hora
### 4 = lugar

### Amistades ###########################################################
friends = []
h = open('foursquare_friendship.csv')
friends = h.readlines()
for i in range(len(friends)):
	friends[i] = friends[i].strip().split(',')[0]
cantidad_amigos = []
aux = friends[0]
contador = 0
for friend in friends:
	if friend == aux:
		contador += 1
	else:
		aux = friend
		cantidad_amigos.append(contador)
		contador = 0
print(cantidad_amigos)
suma = 0
for can in cantidad_amigos:
	suma += can

print(suma)
cantidadpromedio = suma/len(cantidad_amigos)
print(cantidadpromedio)
		


#########################################

### Lista de checkins
a = open('foursquare_checkins.csv','r')
b = a.readlines()

checks = []
for check in b:
	checks.append(check.strip().split(','))

pl = checks[0]
checks = checks[1:]
a.close()
#Agregamos los usuarios para contarlos sin repetir
usuarios = []
lugares = []
for user in checks:
	usuarios.append(user[0])
	lugares.append(user[4])

#algo_sr = sin repetir

lugares_sr = set(lugares)
usuarios_sr = set(usuarios)
cantidad_usuarios = len(usuarios_sr)
cantidad_lugares = len(lugares_sr)
print('Usuarios',cantidad_usuarios)
print('Ubicaciones',cantidad_lugares)
print('Lugares por usuario',cantidad_lugares/cantidad_usuarios)
print('Cantidad de check-ins',len(checks))
print('Checkins por lugar: ',len(checks)/cantidad_lugares)
print('Amigos por usuario: ',camigos/cantidad_usuarios)


#Lo que viene en mi notebook demora un poco mas de 50 segundos
salida = open('azar.csv','w')
escritor = csv.writer(salida, delimiter=',')
escritor.writerow(['latitude','longitude'])
for i in range(500):
	r = random.randint(0,len(checks))
	print(str(checks[r][1])+','+str(checks[r][2]))
	try:
		escritor.writerow([str(checks[r][1]),str(checks[r][2])])
		checks.remove(checks[r])
	except:
		salida.close()

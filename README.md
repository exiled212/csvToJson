# csvToJson
Herramienta que permite transformar un archivo csv con headers en un archivo con formato json, este se crea en la misma ruta del archivo csv.

# Instalar:
* npm i
 # Instrucción
* node index.js --input=ruta del archivo csv sin extención
# Ejemplos:
Teniendo en cuenta que tenemos 3 archivos csv en las siguientes rutas:
* ./file.csv
* /home/user/document/file.csv
* ../csv/file.csv

Podemos ejecutar los siguientes comandos:
* node index.js --input=./file
* node index.js --input=/home/user/document/file
* node index.js --input=../csv/file

Lo cual nos creara un json para cada uno:
* ./file.json
* /home/user/document/file.json
* ../csv/file.json

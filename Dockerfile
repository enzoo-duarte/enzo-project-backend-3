# 1. Imagen base oficial de Node.js
FROM node:20.11.0

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copia archivos de dependencias
COPY package*.json ./

# 4. Instala dependencias
RUN npm install

# 5. Copia todo el código fuente
COPY . .

# 6. Expone el puerto 8080
EXPOSE 8080

# 7. Comando para iniciar la app
CMD ["npm", "start"]

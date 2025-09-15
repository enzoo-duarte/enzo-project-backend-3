# 1. Imagen base oficial de Node.js
FROM node:20.11.0

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copia los archivos de dependencias
COPY package*.json ./

# 4. Instala las dependencias
RUN npm install

# 5. Copia el código fuente
COPY ./src ./src

# 6. Expone el puerto interno 8080
EXPOSE 8080

# 7. Comando para iniciar la app
CMD ["npm", "start"]

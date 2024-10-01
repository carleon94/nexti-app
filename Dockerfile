# Usar la imagen base de Node.js para construir la aplicación
FROM node:20 AS build
WORKDIR /app

# Copiar los archivos de configuración y de dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código y construir la aplicación
COPY . ./
RUN npm run build

# Usar una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 5174
EXPOSE 5174

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
FROM node:20 as build

WORKDIR /app

# Clean install
COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm install --legacy-peer-deps --platform=linux --arch=x64

COPY . .
RUN npm run build

# Production stage
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
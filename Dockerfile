FROM node:20.18.0 AS build
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build


FROM nginx:stable-perl
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

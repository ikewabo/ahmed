FROM nginx:alpine

ENV PORT=8080

COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY . /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

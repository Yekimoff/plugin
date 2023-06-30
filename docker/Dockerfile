FROM nginx:1.23.4-alpine-slim

EXPOSE 80

ENV ENV1=ENV1 \
    ENV2=ENV2 \
    TZ=Europe/Moscow

ADD ./default.conf /etc/nginx/conf.d/
ADD ./nginx.conf /etc/nginx/
ADD ./dist/* /usr/share/nginx/html/






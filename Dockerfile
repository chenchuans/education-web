FROM nginx:1.15.2

COPY ./dist/* /usr/share/nginx/html/
COPY ./dist/css /usr/share/nginx/html/css
COPY ./dist/img/icons /usr/share/nginx/html/img/icons
COPY ./dist/js /usr/share/nginx/html/js

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log


STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]

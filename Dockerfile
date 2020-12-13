FROM nginx:1.15.2

COPY ./dist/* /usr/share/nginx/html/*

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log


STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
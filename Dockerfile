FROM nginx:stable-alpine
LABEL maintainer="Aymé PIGNON <ayme.pignon@hotmail.com>"

# Clean default nginx html and copy site files
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html

# Expose HTTP
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
FROM nginx:alpine
ARG DEPLOYMENT_ENV
RUN echo "is=${DEPLOYMENT_ENV}"
COPY ${DEPLOYMENT_ENV}.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

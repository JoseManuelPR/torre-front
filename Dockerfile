FROM node:16
WORKDIR /var/front-torre

COPY . .
EXPOSE 3000

RUN chmod 775 /var/front-torre/dev-front.sh
CMD [ "sh","/var/front-torre/dev-front.sh" ]
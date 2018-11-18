FROM node:latest

MAINTAINER Jason <jlam@palo-it.com>

ENV WORKSPACE /code

COPY code ${WORKSPACE}

RUN cd ${WORKSPACE} && npm i

WORKDIR ${WORKSPACE}
VOLUME /repo

CMD ["tail", "-f", "/dev/null"]
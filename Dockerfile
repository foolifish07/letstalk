FROM node:8.9.1

# Author
MAINTAINER foolifish07 <foolifish07@gmail.com>

COPY ./backend /backend
COPY ./frontend/dist /frontend/dist

WORKDIR /backend

CMD ["npm", "start"]
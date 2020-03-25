# base image
FROM node:9.11

# set working directory
RUN mkdir /app
WORKDIR /app

# add /usr/src/app/node_modules/.bin to $PATH

# install and cache app dependencies
RUN npm install
RUN npm install react-scripts -g
# start app
CMD ["npm", "run","dev"]
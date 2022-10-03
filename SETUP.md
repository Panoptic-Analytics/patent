Installation:

Install the dependencies and devDependencies and start the server.

1. cd patents-master
2. npm i
3. npm start

Setting up Port:

1. Create a .env file in root directory
2. Specify port- PORT=[PORT] //Example: PORT=3001
3. After changing port you have to restart the server

Setting up Docker:

1. docker build -t patents:dev .
2. docker run -p 3000:3000 -d patents:dev

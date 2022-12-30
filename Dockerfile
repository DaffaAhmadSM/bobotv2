FROM node:18.12.1

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install our bot
COPY package.json /usr/src/bot
RUN npm install

# Our precious bot
COPY . /usr/src/bot
RUN npx prisma migrate deploy
RUN npx prisma generate --schema=./prisma/schema.prisma

# Start me!
CMD ["node", "index.js"]
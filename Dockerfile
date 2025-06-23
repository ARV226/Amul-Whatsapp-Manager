FROM node:18

RUN apt-get update && apt-get install -y \
  libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
  libasound2 libatk-bridge2.0-0 libcups2 libdbus-1-3 \
  libgdk-pixbuf2.0-0 libnspr4 libnss3 libxss1 xdg-utils \
  libgtk-3-0 libdrm2 libxshmfence1 libxfixes3 --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN mkdir -p /app/session && chmod -R 777 /app/session

RUN npm install
CMD ["npm", "start"]
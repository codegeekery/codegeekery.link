FROM node:23.10.0-alpine AS development-dependencies-env
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:23.10.0-alpine AS production-dependencies-env
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev


FROM node:23.10.0-alpine AS build-env
WORKDIR /app
COPY --from=development-dependencies-env /app /app
COPY tsconfig.json .
RUN npm run build


FROM node:23.10.0-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/dist ./dist
COPY --from=build-env /app/app/views ./dist/app/views
COPY --from=build-env /app/app/public ./dist/app/public

CMD ["npm", "run", "start"]

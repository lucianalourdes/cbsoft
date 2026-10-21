# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app

# Caminho público do site. "/" para domínio próprio; "/cbsoft/" se servido
# num subdiretório (ex.: https://servidor/cbsoft/).
ARG VITE_BASE=/cbsoft27/
ENV VITE_BASE=${VITE_BASE}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime ----
FROM nginx:1.27-alpine
ARG VITE_BASE=/cbsoft27/
ENV VITE_BASE=${VITE_BASE}

# A imagem oficial do nginx roda envsubst nos *.template ao iniciar.
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html${VITE_BASE}

EXPOSE 80

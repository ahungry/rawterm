# -*- mode: dockerfile -*-

# Build the host instance
#FROM alpine:3.10.1 AS build
FROM debian:jessie-slim AS build
RUN DEBIAN_FRONTEND=noninteractive apt-get update \
  && apt-get install -y git gcc make

WORKDIR /usr/src
RUN git clone https://github.com/ahungry/rawterm /usr/src/rawterm \
  && cd /usr/src/rawterm \
  && mkdir obj \
  && make

FROM debian:jessie-slim
COPY --from=build /usr/src/rawterm/rawterm.bin /usr/local/bin/rawterm
COPY . /app
WORKDIR /app

CMD ["/usr/local/bin/rawterm", "12345", "127.0.0.1", "12346"]

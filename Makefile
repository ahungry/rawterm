CFLAGS=-Wall -Wextra -pedantic -std=gnu11
LDFLAGS=-lm -ldl -pthread -Wl,-z,stack-size=1048576

SRC := src
OBJ := obj

SOURCES := $(wildcard $(SRC)/*.c)
OBJECTS := $(patsubst $(SRC)/%.c, $(OBJ)/%.o, $(SOURCES))

rawterm.bin: $(OBJECTS)
	$(CC) $^ -o $@ $(LDFLAGS)

$(OBJ)/%.o: $(SRC)/%.c
	$(CC) $(CFLAGS) -I$(SRC) -c $< -o $@

# Runs and sends keypress to itself
run: rawterm.bin
	reset
	./$< 12345 127.0.0.1 12345

install: rawterm.bin
	cp rawterm.bin /usr/local/bin/rawterm 

docs: docs/diagram.png

docs/diagram.png: docs/diagram.dot
	dot docs/diagram.dot -Tpng -o docs/diagram.png && feh -F docs/diagram.png

docker-build: Dockerfile
	docker build -t rawterm .

docker-run: docker-build
	docker run --rm -it --net=host --name=rawterm rawterm:latest

docker-build-alpine: Dockerfile
	docker build -f Dockerfile_alpine -t rawterm-alpine .

docker-run-alpine: docker-build-alpine
	docker run --rm -it --net=host --name=rawterm-alpine rawterm-alpine:latest

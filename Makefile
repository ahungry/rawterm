CFLAGS=-Wall -Wextra -pedantic -std=gnu11
LFLAGS=-lm -ldl -pthread

SRC := src
OBJ := obj

SOURCES := $(wildcard $(SRC)/*.c)
OBJECTS := $(patsubst $(SRC)/%.c, $(OBJ)/%.o, $(SOURCES))

rawterm.bin: $(OBJECTS)
	$(CC) $^ -o $@ $(LFLAGS)

$(OBJ)/%.o: $(SRC)/%.c
	$(CC) $(CFLAGS) -I$(SRC) -c $< -o $@

# Runs and sends keypress to itself
run: rawterm.bin
	reset
	./$< 12345 127.0.0.1 12345

docs: docs/diagram.png

docs/diagram.png: docs/diagram.dot
	dot docs/diagram.dot -Tpng -o docs/diagram.png && feh -F docs/diagram.png

docker-build: Dockerfile
	docker build -t rawterm .

docker-run: docker-build
	docker run --rm -it --net=host --name=rawterm rawterm:latest

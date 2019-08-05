# rawterm

A simple CLI utility that will listen on a user specified port (UDP) and
render any bytes it receives over UDP, with a terminal running in raw mode
(think, Emacs/Vi/Roguelikes) that renders it as if it were a view layer.

In addition, it will forward any user keypresses to the outbound
address/port (again, UDP) so that you could set it up in a system as
diagramed below.

# Usage

```sh
  ./rawterm <listen-port> <outbound-address> <outbound-port>
```

# Building

```sh
make
```

# License

GPLv3

# Copyright

Matthew Carter <m@ahungry.com>

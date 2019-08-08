# rawterm

A simple CLI utility that will listen on a user specified port (UDP) and
render any bytes it receives over UDP, with a terminal running in raw mode
(think, Emacs/Vi/Roguelikes) that renders it as if it were a view layer.

In addition, it will forward any user keypresses to the outbound
address/port (again, UDP) so that you could set it up in a system as
diagramed below.

---------------------

![rawterm](https://github.com/ahungry/rawterm/blob/master/docs/diagram.png)

--------------------

# Why?

With this portion done (the terminal based "rendering engine") you
could easily write a vi / emacs-like editor in a language that is much
higher language than C, without having to worry about C-ffi to the
terminal for getting the pre-requisite bindings to switch from cooked
to raw mode.

You could write many things with this as a re-usable / shared front
end:

- A roguelike or other ascii based game for the terminal
- A text editor
- An ncurses like interface (map out term codes to a higher level
  language "sdk" like feature)

![roguelike](https://github.com/ahungry/rawterm/blob/master/render.gif)

# Usage

```sh
  ./rawterm <listen-port> <outbound-address> <outbound-port>
```

Hint: Try running rawterm twice, with the ports flipped - you can see
how they "talk" to each other.

```
  ./rawterm 12345 127.0.0.1 12346 # In one term window

  ./rawterm 12346 127.0.0.1 12345 # In another term window
```

# Building

```sh
make
```

or, if you don't have a C compiler, or are trying this out on
something other than GNU/Linux, you can also just use:

```sh
make docker-build
make docker-run
```

Please note this container will bind to --net=host if used in that manner.

# License

GPLv3

# Copyright

Matthew Carter <m@ahungry.com>

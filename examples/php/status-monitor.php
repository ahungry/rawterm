<?php

if (!extension_loaded('sockets')) {
  die('The sockets extension is not loaded.');
 }

class In extends Thread
{
  function run ()
  {
    inbound ();
  }
}

class Out extends Thread
{
  function run ()
  {
    outbound ();
  }
}

function inbound ()
{
  // create unix udp socket
  $socket = socket_create(AF_UNIX, SOCK_DGRAM, 0);
  if (!$socket)
    die('Unable to create AF_UNIX socket');

  // same socket will be used in recv_from and send_to
  $server_side_sock = dirname(__FILE__)."/server.sock";
  if (!socket_bind($socket, $server_side_sock))
    die("Unable to bind to $server_side_sock");

  while(1) // server never exits
    {
      // receive query
      if (!socket_set_block($socket))
        die('Unable to set blocking mode for socket');
      $buf = '';
      $from = '';
      echo "Ready to receive...\n";
      // will block to wait client query
      $bytes_received = socket_recvfrom($socket, $buf, 65536, 0, $from);
      if ($bytes_received == -1)
        die('An error occured while receiving from the socket');

      echo "Received $buf from $from\n";
    }
}

function outbound ()
{
  $server_ip   = '127.0.0.1';
  $server_port = 12345;
  $beat_period = 5;
  $message     = 'Hello world';
  if ($socket = socket_create (AF_INET, SOCK_DGRAM, SOL_UDP))
    {
      while (1)
        {
          socket_sendto ($socket, $message, strlen ($message), 0, $server_ip, $server_port);
          print "Time: " . date ("%r") . "n";
          sleep ($beat_period);
        }
    }
  else
    {
      print ("can't create socketn");
    }
}

$in = new In();
$out = new Out();

$in->start();
$out->start();

while (1) { sleep (1); }

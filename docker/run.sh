#!/bin/sh

set -e

service nginx restart

tail -f /dev/null


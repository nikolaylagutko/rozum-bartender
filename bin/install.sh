#!/usr/bin/env bash

cd `dirname $0`/..

echo "Prepare directories"

mkdir -p /opt/pulse-desk-bartender
rm -rf node_modules

echo "Copy sources"

cp -rf . /opt/pulse-desk-bartender

echo "Install modules"

cd /opt/pulse-desk-bartender
npm install

echo "Configure & Restart service"

if [ "$(systemctl is-enabled bartender)" != "enabled" ] ; then
    systemctl enable /opt/pulse-desk-bartender/bartender.service
fi

systemctl restart bartender

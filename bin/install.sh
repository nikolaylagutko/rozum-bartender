#!/usr/bin/env bash

cd `dirname $0`/..

echo "Prepare directories"

mkdir -p /opt/pulse-desk-bartender

echo "Install modules"

npm install

echo "Copy sources"

cp -rf . /opt/pulse-desk-bartender

echo "Configure & Restart service"

if [ "$(systemctl is-enabled bartender)" != "enabled" ] ; then
    systemctl enable /opt/pulse-desk-bartender/bartender.service
fi

systemctl daemon-reload
systemctl restart bartender

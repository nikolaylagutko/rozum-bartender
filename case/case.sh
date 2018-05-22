#!/usr/bin/env bash

speed=50
robot="192.168.1.187:8081"
openGripper="http://${robot}/gripper/close"
closeGripper="http://${robot}/gripper/open"
pose="http://${robot}/pose"
position="http://${robot}/position?speed=${speed}"
positions="http://${robot}/positions/run?speed=${speed}"

curl -X PUT ${openGripper}

curl -X PUT ${pose} -d'{"angles": [0, 90, 0, -90, 90, 180]}'
curl -X PUT ${positions} -d'[{"point":{"x":0.04,"y":0.62,"z":0.28},"rotation":{"roll":3.14,"pitch":1.57,"yaw":-1.57}},{"point":{"x":0.04,"y":0.62,"z":0.142},"rotation":{"roll":3.14,"pitch":1.57,"yaw":-1.57}}]'
sleep 10

curl -X PUT ${closeGripper}

curl -X PUT ${positions} -d '[{"point":{"x":0.04,"y":0.62,"z":0.28},"rotation":{"roll":3.14,"pitch":1.57,"yaw":-1.57}}, {"point":{"x":0,"y":0.52,"z":0.28},"rotation":{"roll":3.14,"pitch":1.57,"yaw":0}}, {"point":{"x":-0.4,"y":0.5,"z":0.08},"rotation":{"roll":3.14,"pitch":1.57,"yaw":1.57}}]'
sleep 20

curl -X PUT ${position} -d'{"point":{"x":-0.4,"y":0.5,"z":0.1},"rotation":{"roll":3.14,"pitch":1.57,"yaw":1.57}}'
curl -X PUT ${position} -d'{"point":{"x":-0.4,"y":0.5,"z":0.113},"rotation":{"roll":3.14,"pitch":1.57,"yaw":1.57}}'
curl -X PUT ${position} -d'{"point":{"x":-0.4,"y":0.5,"z":0.08},"rotation":{"roll":3.14,"pitch":1.57,"yaw":1.57}}'

curl -X PUT ${positions} -d'[{"point":{"x":-0.4,"y":0.4,"z":0.12},"rotation":{"roll":3.14,"pitch":1.57,"yaw":1.57}}, {"point":{"x":-0.47,"y":0.3,"z":0.1},"rotation":{"roll":3.14,"pitch":1.57,"yaw":1.57}}]'

curl -X PUT ${openGripper}
#
#curl -X PUT ${position} -d'{"point":{"x":-0.35,"y":0.3,"z":0.005},"rotation":{"roll":3.14,"pitch":1.57,"yaw":1.57}}'
#
#curl -X PUT ${pose} -d'{"angles": [0, 90, 0, -90, 90, 0]}'



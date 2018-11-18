#start-server-inside-docker.sh
npm start &

pidLength=1
while [ $pidLength -le 1 ]
do
  sleep 1
  pidLength=$(head -n1 /code/pid.out | wc -c)
done
#server started may not ready for response
sleep 1

#safer now

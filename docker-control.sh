#docker-control.sh
imageName=restful-backend:latest
containerName=json-api-server

if [ -z DOCKER_IMAGE_NAME_JSON_API_SERVER ]; then
  imageName=${DOCKER_IMAGE_NAME_JSON_API_SERVER}
fi

if [ -z DOCKER_CONTAINER_NAME_JSON_API_SERVER ]; then
  containerName=${DOCKER_CONTAINER_NAME_JSON_API_SERVER}
fi

docker run --name=${containerName} --rm -d ${imageName} 

#copy files 
currentDirectory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

for file in $(< ${currentDirectory}/copyfiles.txt)
do
  docker cp "${currentDirectory}/code/${file}" "${containerName}:/code/${file}"
done

docker exec ${containerName} sh /code/run-in-docker.sh

docker stop ${containerName}
echo "Digite a versão da imagem: "
read VERSION

npm run $script
docker build -t lucaswiix/livehere:$VERSION . --no-cache
docker push lucaswiix/livehere:$VERSION
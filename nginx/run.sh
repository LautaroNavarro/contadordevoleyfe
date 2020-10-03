# We are doing this because Nginx does not support environment variable injection

cat /etc/nginx/conf.d/default.conf | sed 's/PORT/'"$PORT"'/g' > /tmp/nginx-default.conf

mv /tmp/nginx-default.conf /etc/nginx/conf.d/default.conf

echo "[DEBUG] RUNNING NGINX"

cat /etc/nginx/conf.d/default.conf

nginx -g daemon\ off\;

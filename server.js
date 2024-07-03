import http from "http";

const server = http
	.createServer((req, res) => {
		res.end("Hello from the server");
	})
	.listen(4001);

// eslint-disable-next-line no-console
console.log("Server is up and running");

export default server;

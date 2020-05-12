const net = require('net');

class ResponseParser {
	constructor() {
		this.WAITING_STATUS_LINE = 0;
		this.WAITING_STATUS_LINE_END = 1;
		this.WAITING_HEADER_NAME = 2;
		this.WAITING_HEADER_VALUE = 3;
		this.WAITING_HEADER_SPACE = 4;
		this.WAITING_HEADER_VALUE_END = 5;
		this.WAITING_HEADER_BLOCK_END = 6;  // header 和 body 之间的空行
		this.WAITING_BODY = 7;
		
		this.current = this.WAITING_STATUS_LINE;
		this.statusLine = '';
		this.headers = {};
		this.headerName = "";
		this.headerValue = "";
		
	}
	receive(string) {
		for(let i=0; i<string.length; i++) {
			this.receiveChar(string.charAt(i));
		}
		// console.log(this.statusLine)
		// console.log(this.headers)
        // console.log('--------------------')
	}
	receiveChar(char) {
		if(this.current === this.WAITING_STATUS_LINE) {
			if(char === '\r') {
				this.current = this.WAITING_STATUS_LINE_END;
			} else if(char === '\n') {
				this.current = this.WAITING_HEADER_NAME;
			} else {
				this.statusLine += char;
			}
		} else if(this.current === this.WAITING_STATUS_LINE_END) {
			if(char === '\n') {
				this.current = this.WAITING_HEADER_NAME;
			}
		} else if(this.current === this.WAITING_HEADER_NAME) {
			if(char === '\r') {
				this.current = this.WAITING_BODY;
			} else if(char === ':') {
				this.current = this.WAITING_HEADER_SPACE;
			} else {
				this.headerName += char;
			}
		} else if(this.current === this.WAITING_HEADER_SPACE) {
			if(char === ' ') {
				this.current = this.WAITING_HEADER_VALUE
			}
		} else if(this.current === this.WAITING_HEADER_VALUE) {
			if(char === '\r') {
				this.current = this.WAITING_HEADER_VALUE_END;
				this.headers[this.headerName] = this.headerValue;
				this.headerName = '';
				this.headerValue = '';
			} else {
				this.headerValue += char;
			}
		} else if(this.current === this.WAITING_HEADER_VALUE_END) {
			if(char === '\n') {
				this.current = this.WAITING_HEADER_NAME
			}
		}
	}
}

class Request {
    // method,url = host + port + path;
    // headers
    // body: k/v
    constructor(options) {
        this.menthod = options.method || 'GET   ';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        // 设置默认 Content-Type
        if(!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        // 先用下面两种 Content-Type
        if(this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${this.body[key]}`).join('&')
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }

    toString() {
        return `${this.menthod}${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n
${this.bodyText}`
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            if(connection) {
                connection.write(this.toString())
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString())
                })
            }
            connection.on('data', (data) => {
				parser.receive(data.toString());
				console.log(parser.headers)
                // resolve(data.toString());
                connection.end();
                });

            connection.on('error', (data) => {
                reject(data.toString());
                connection.end();
            });
        })
    }

}

// 一、实现 send() 方法之前
/* const client = net.createConnection({host: "127.0.0.1" ,port: 8088 }, () => {
    // 'connect' listener.
    console.log('connected to server!');

    // 请求行
    client.write('POST / HTTP/1.1\r\n');  // 注意要添加后面的 \r\n 换行
    // 请求头
    client.write('Host: 127.0.0.1\r\n');  // 请求头的每一项同样需要 注意要添加后面的 \r\n 换行
    client.write('Content-Length: 20\r\n');   // 当请求体有数据的时候， Content-Length 不能省略，并且字符数要对应请求体的字符数，否则都会 Bad Request。
    client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    // 空行， 这个空行一定不能省略，它是区分请求头和请求体的标志。
    client.write('\r\n');
    // 下面为请求体
    client.write('field1=aaa&code=x%3D') 
    // 上面几行为 实验的一个例子

    let request = new Request({
        menthod: 'POST',
        host: '127.0.0.1',
        port: 8088,
        path: '/',
        headers: {
            'x-foo2': 'haha'
        },
        body: {
            name: 'tiget'
        }
    })

    console.log(request.toString())
    client.write(request.toString())
  });

  client.on('data', (data) => {
    console.log(data.toString());
    client.end();
  });
  client.on('end', () => {
    console.log('disconnected from server');
  }); */

// 二、实现send() 方法后
void async function() {
    let request = new Request({
        menthod: 'POST',
        host: '127.0.0.1',
        port: 8088,
        path: '/',
        headers: {
            'x-foo2': 'haha'
        },
        body: {
            name: 'tiget'
        }
    });
    let response  = await request.send();
    console.log(response)
}()



class Response {

}


class TrunkedBodyParser {
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinished = false;

        this.current = this.WAITING_LENGTH;
    }

    receiveChar(char) {
        if(this.current === this.WAITING_LENGTH) {
            if(char === '\r') {
                if(this.length === 0) {
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length += 10;
                this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
            }
        } else if(this.current === this.WAITING_LENGTH_LINE_END) {
            if(char === '\r') {
                this.current = this.READING_TRUNK;
            }
        } else if(this.current === this.READING_TRUNK) {
            this.current.push(char);
            this.length--;
            if(this.length === 0) {
                this.current = this.WAITING_LENGTH;
            }
        } 
    }
}
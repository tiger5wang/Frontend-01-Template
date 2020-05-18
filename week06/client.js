const net = require('net');
const parse = require('./parser');

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
		this.bodyParser = null;
		
	}
	receive(string) {
		for(let i=0; i<string.length; i++) {
			this.receiveChar(string.charAt(i));
		}
	}
	// 每一行的最后一般都是 \r\n
	receiveChar(char) {
		// 最开始遍历的是状态行
		if(this.current === this.WAITING_STATUS_LINE) {
			if(char === '\r') {
				this.current = this.WAITING_STATUS_LINE_END;
			} else if(char === '\n') {
				this.current = this.WAITING_HEADER_NAME;
			} else {
				this.statusLine += char;
			}
		} else if(this.current === this.WAITING_STATUS_LINE_END) { // 状态行结束后，将当前状态改为 header 的 name
			// 此处的 \n 和上面的 \r 连接，表示要切换到下一行了。
			// 状态行结束 就是 headers 部分
			if(char === '\n') {
				this.current = this.WAITING_HEADER_NAME;
			}
		} else if(this.current === this.WAITING_HEADER_NAME) {  // 当前遍历的是 headers 的键
			if(char === '\r') {   // 此时如果出现了 \r ，说明 headers 部分结束了，到了空行部分
				this.current = this.WAITING_HEADER_BLOCK_END;
				// 接下来根据 Transfer-Encoding 的值，将要解析 body 部分内容
				if(this.headers['Transfer-Encoding'] === 'chunked') {
					this.bodyParser = new TrunkedBodyParser();
				}
			} else if(char === ':') {  // 如果是 ： ，那么接下来的一个字符就是 键值对之间的空格
				this.current = this.WAITING_HEADER_SPACE;
			} else {
				this.headerName += char;
			}
		} else if(this.current === this.WAITING_HEADER_SPACE) {
			if(char === ' ') {  // 空格后就是headers的值部分，切换状态
				this.current = this.WAITING_HEADER_VALUE;
			}
		} else if(this.current === this.WAITING_HEADER_VALUE) {  // 当前遍历的是 headers的 值部分
			if(char === '\r') {  // 此时如果出现 \r， 说明值部分结束了，切换状态，并将这个header记录下来
				this.current = this.WAITING_HEADER_VALUE_END;
				this.headers[this.headerName] = this.headerValue;
				this.headerName = '';
				this.headerValue = '';
			} else {
				this.headerValue += char;
			}
		} else if(this.current === this.WAITING_HEADER_VALUE_END) {
			if(char === '\n') {   // 值部分结束，则重新当作 headers 键来遍历，切换到 header_name 状态
				this.current = this.WAITING_HEADER_NAME;
			}
		} else if(this.current === this.WAITING_HEADER_BLOCK_END) {
			if(char === '\n') {  // 如果是headers 和 body 的中间的空行，则接下来是body 部分。
				this.current = this.WAITING_BODY;
			}
		} else if(this.current === this.WAITING_BODY) {  // 开始解析body 部分
			this.bodyParser.receiveChar(char);
		}
	}
	
	// 判断是否解析完毕
	get isFinished() {
		return this.bodyParser && this.bodyParser.isFinished;
	}
	// 返回数据 response
	get response() {
		this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\S\s]+)/);
		return {
			statusCode: RegExp.$1,
			statusText: RegExp.$2,
			headers: this.headers,
			body: this.bodyParser.content.join('')
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
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                })
            }
            connection.on('data', (data) => {
				parser.receive(data.toString());
				if(parser.isFinished) {
					resolve(parser.response)
				}
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
    // console.log(response)    ;
    let dom = parse.parseHTML(response.body);
}()


class TrunkedBodyParser {
	// 需要注意的是：body 部分不止是需要的内容，而是由内容和字符组成的，
	// 每一行内容的前一行是这行内容的字符数，
	// 所有的内容接收完之后， 最后会有一个 0
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
    	// console.log(char.codePointAt(0), char)
		// 当this.isFinished=true 时，即处理完所有内容后，后面的 \r\n 不在进行处理
		if(this.isFinished) return;
    	// 刚开始的状态为等待处理内容的字符长度
        if(this.current === this.WAITING_LENGTH) {
            if(char === '\r') {  // 碰到 \r 表示字符长度处理完毕，切换状态
				this.current = this.WAITING_LENGTH_LINE_END;
                if(this.length === 0) {  // 此时如果长度数为0，表示后面已没有内容，内容处理完毕
                    this.isFinished = true;
                }
            } else {  // 字符长度值 为 十六进制
                this.length *= 16;
                this.length += parseInt(char, 16);
            }
        } else if(this.current === this.WAITING_LENGTH_LINE_END) {
            if(char === '\n') {  // 与上面的 \r 连接，表示字符长度行的结束，将要进入内容部分
                this.current = this.READING_TRUNK;
            }
        } else if(this.current === this.READING_TRUNK) {  // 遍历内容 trunk 流
        	// 注意：这里不能简单像 Request 里一样使用 \r\n 来判断要不要切换状态
			// 因为内容中可能会包含 \r\n， 所以要使用字符数来判断，字符数为0了，表示内容遍历完毕
            this.content.push(char);
            this.length--;
            if(this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        }
        // 下面这两个条件主要是把 \r\n 给去掉
        else if(this.current === this.WAITING_NEW_LINE) {
    		if(char === '\r') {
    			this.current = this.WAITING_NEW_LINE_END;
			}
		} else if(this.current === this.WAITING_NEW_LINE_END) {
    		if(char === '\n') {
    			this.current = this.WAITING_LENGTH;
			}
		}
    }
}
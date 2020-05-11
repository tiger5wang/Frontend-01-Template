const net = require('net');

const client = net.createConnection({host: "127.0.0.1" ,port: 8088 }, () => {
    // 'connect' listener.
    console.log('connected to server!');
    // client.write('POST / HTTP/1.1\r\n');
    // client.write('Host: 127.0.0.1\r\n');
    // client.write('Content-Length: 20\r\n');
    // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    // client.write('\r\n');
    // client.write('field1=aaa&code=x%3D')

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
  });

void 

class Request {
// method,url = host + port + path;
// body: k/v
// Headers
    constructor(options) {
        this.menthod = options.method || 'GET   ';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if(this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${this.body[key]}`)
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }

    toString() {
        return `${this.menthod} ${this.path} HTTP/1.1\r\n
        ${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`)}
        `
    }

    send(connection) {
        if(connection) {
            connection.write(this.toString())
        } else {
            connection = net.createConnection({
                host: this.host,
                port: this.port
            }, () => {
                connection.write(this.toString())
            })
            connection.on('data', (data) => {
                resolve(data.toString());
                connection.end();
              });

              connection.on('error', (data) => {
            reject(data.toString());
            connection.end();
            });
        }
    }

}

class Response {

}

class ResponseParser {
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_VALUE = 3;
        this.WAITING_HEADER_VALUE_END = 4;
        this.WAITING_HEADER_BLOCK_END = 5;
        this.WAITING_BODY = 6;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = '';
        this.headers = {};
        this.headerName = "";;
        this.headerValue = "";

    }
    receive(string) {
        for(let i=0; i<string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
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
        }
    }
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
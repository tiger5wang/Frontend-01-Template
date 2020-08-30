# 创建 GitHub OAuth 应用
https://developer.github.com/apps/building-oauth-apps/

## 1. Creating an OAuth App

## 2. Creating custom badges for OAuth Apps

## 3.Authorizing OAuth Apps

1. 请求用户的 GitHub 身份 (浏览器/publish-tool)

        GET https://github.com/login/oauth/authorize
    设置指定的登录参数：
    - redirect_uri 回调 url 设置为 http://localhost:8000/，有特殊字符
    - 先将 http://localhost:8000/ 编码：
    

    encodeURIComponent('http://localhost:8000/')
    
    "http%3A%2F%2Flocalhost%3A8000%2F" 
    


- 将各个参数拼接起来成一个完整的 url 地址：

https://github.com/login/oauth/authorize?client_id=Iv1.5dd238130b37f0db&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&scope=read%3Auser&state=abc123

- 接下来 在浏览器中打开 url ，同意授权授权，跳转到 callback url 获得 code 和 state


    //code=8fef15e59356f78253f9&state=abc123
    

code 表示 入场券，用于交换 token， state 就是前面添加的 state 参数 
code 的有效期为 10 分钟

2. 交换 token (服务端/publish-server)

        POST https://github.com/login/oauth/access_token
    
       
    {
        let code = '85d0be46d43d41073201';
        let state = 'abc123';
        let client_secret = '2145fce43a48e148c6893cff6a225e84f405c229'
        let client_id = 'Iv1.5dd238130b37f0db'
        let redirect_uri = encodeURIComponent('http://localhost:8000/');
        
        let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
        
        let xhr = new XMLHttpRequest;
        
        xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true);
        
        xhr.addEventListener('readystatechange ', function (event) {
            if (xhr.readyState === 4) {
                debugger;
                console.log(xhr.responseText)
            }
        });
        xhr.send(null);
    }

- 在 github.com 中打开控制台，执行上面的代码， 获取 token
access_token=d5c0cca859f384470a187d35872c481dbc7f7a14

3. 使用 token 访问 API (服务端/浏览器端  publish-server/publish-tool)

        Authorization: token OAUTH-TOKEN
        GET https://api.github.com/user




    {
        let xhr = new XMLHttpRequest;
        
        xhr.open('GET', `https://api.github.com/user`, true);
        xhr.setRequestHeader("Authorization", "token d5c0cca859f384470a187d35872c481dbc7f7a14");
        
        xhr.addEventListener('readystatechange ', function (event) {
            if (xhr.readyState === 4) {
                debugger;
                console.log(xhr.responseText)
            }
        });
        
        xhr.send(null);
    }
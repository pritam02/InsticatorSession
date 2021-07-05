# InsticatorSession

This application is used to host a server built on top of express JS which serves the following purposes :-
* Serve a client side JavaScript SDK to track sessions.
* Serve an Analytics endpoint to store session data in the form of a cookie.
* Test Pages to test the client side JavaScript SDK and the session analytics endpoint.


### Steps to build the project

Prerequisites - The project assumes that git, node js and npm are installed in the system.

The version of node js should be above 12.0.0.

Alternatively we can use nvm (node version manager) to manage the versions of node running in the system

[node and npm installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

[git installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

[Guide to Node Version Manager](https://www.keycdn.com/blog/node-version-manager)


#### Build Steps
* browse to the directory where the project should be installed

* clone the project

```sh
$ git clone https://github.com/pritam02/InsticatorSession.git
```

* go to the project directory

```sh
$ cd InsticatorSession
```
* make sure the correct version of node is selected before installing the dependencies 

* install dependencies

```sh
$ npm install
```
This step installs all the dependencies that are required for the project

* build the project and start the server

```sh
$ npm run start
```

This command does the following :-

i) builds the bundle for the client side sdk

ii) runs all the unit test cases 

iii) starts an express server in the port 3000

**Note**: lets make sure that no other application is running in port 3000.


### Test the Client Side JavaScript SDK

There are two test pages hosted in the same express server which can be used to test the client side JavaScript SDK.
They are as follows :-

i) http://localhost:3000/test-page/test-session.html?campaign=cars

This particular test page has the default referrer policy. The Referrer url is forwarded to the server 
by the browser in the request headers which be used to track sessions. 

This page loads the client side JavaScript SDK (http://localhost:3000/instag.js). The SDK does not fire the analytics pixel
since the Referrer is available from the request headers.


ii) http://localhost:3000/test-page/test-session-no-referrer.html?campaign=cars

This particular test page has a strict no-referrer policy. The Referrer url is not forwarded to the server 
by the browser in the request headers.This page also loads the client side JavaScript SDK (http://localhost:3000/instag.js). 
The client side SDK fires an analytics pixel (http://localhost:3000/insticator/session?rf=http%3A%2F%2Flocalhost%3A3000%2Ftest-page%2Ftest-session-no-referrer.html&cmp=cars)
which is used to track sessions for the user.

### Notes

For simplicity, the client side JavaScript SDK, the analytics pixel endpoint and the test pages
are all hosted in the same server. The test pages are actually serving as an alternative for publisher pages.

### Debugging

For Debugging, we can build the development version of the client side SDK. To do the same,
we should execute the following command while building the project.

```sh
$ npm run start-dev
```

### Security Considerations

We should Sanitize all the incoming inputs for the analytics pixel since it can be prone to Cross-site Scripting(XSS) attack.


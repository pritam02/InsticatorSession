# InsticatorSession

This application is used to host a server built on top of express JS which serves the following purposes :-
* serve a client side JavaScript SDK to track sessions.
* an endpoint to store session data in the form of a cookie
* Test Pages to test the client side JavaScript SDK and the session endpoint.


#### Steps to build the project

Prerequisites - The project assumes that git, node js and npm are installed in the system.

The version of node js should be above 12.0.0.

Alternatively we can use nvm (node version manager to manage the versions of node running in the system)

##### Build Steps
* create the project directory
```sh
$ mkdir InsticatorSession
```

* go to the project directory


```sh
$ cd InsticatorSession
```

* clone the project

```sh
$ git clone https://github.com/pritam02/InsticatorSession.git
```

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




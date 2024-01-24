# WebRTC TestApp (tryit-jssip)

Sorenson's fork of SignalWire's fork of the [JsSIP](http://jssip.net) demo application with some enhancements that address common problems. 

The app allows you to point to any environment, but you need to pass in the correct credentials. The app accepts standard SIP authentication instead of JWT authentication. 

The default settings of the point to QA Testing (UAT)

You can also use TLS/TCP too with this for Registrar if needed

## Installation

* Fork the project.

* Install dependencies:

```bash
$ npm install
```

* Globally install the NPM `gulp-cli` package:

```bash
$ npm install -g gulp-cli
```

* Build the app (check the [gulpfile](./gulpfile.js) file for details):
  * `gulp prod` generates the app in production/minified mode.
  * `gulp dev` generates the app in development mode.
  * `gulp live` generates the app in development mode, opens the local website and watches for changes in the source code.

* Once built, the `out/` directory is created with all the HTML, CSS and JavaScript files to be deployed in your own server.


## Hardcoded settings

The app allows entering settings via an HTTP form in the Login section. 

Check the commented code in the [index.html](./index.html) and fill it as needed.


## Notes

* If you run this web application into your own domain, you will also need to set your own SIP/WebSocket servers. The SIP servers running at the public demo won't accept connections origins other than `https://tryit.jssip.net`.


## Author

Iñaki Baz Castillo ([@ibc](https://github.com/ibc/) at Github)


## License

[MIT](./LICENSE)

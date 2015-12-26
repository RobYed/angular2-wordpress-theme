# Angular2 Wordpress Theme

Based on [angularjs-demo-theme](https://github.com/1fixdotio/angularjs-demo-theme) by [Yoren Chang](https://1fix.io). Starting with Angular 1, this will be transformed to Angular 2.

## Build

### gulpconfig.json
{
    "paths": {
        "src": "src/",
        "typescript": "src/ts/**/*.ts",
        "js": "src/js/**/*.js",
        "css": "src/css/**/*.css",
        "temp": "src/templates/**/*.html",
        "index": "src/index.html"
    },
    "ftp": {
        "host": "<your ftp server address",
        "user": "<your ftp user name>",
        "password": "<your ftp password>",
        "path": "<path to your wordpress installation>/wp-content/themes/angular2-wordpress-theme-angular2"
    },
    "angularModule": "wpApp"
}


## License, Copyright etc.

Copyright 2015-16 [Robert Dey](https://github.com/RobYed/) Licensed under the terms of the [GNU General Public License version 2](http://www.gnu.org/licenses/gpl-2.0.html) or later. Please share with your neighbor.

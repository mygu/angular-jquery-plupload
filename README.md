# angular-jquery-plupload

AngularJS directive for Plupload

## Getting started

(1) Get angular-plupload via [Bower](http://bower.io/)

```sh
$ bower install angular-jquery-plupload
```
or add bower.json
```sh
$ bower install angular-jquery-plupload --save
```

(2) add javascript and css link to html

```css
...
<link rel="stylesheet" href="bower_components/jquery-ui/themes/base/jquery-ui.min.css" type="text/css" />
<link rel="stylesheet" href="bower_components/plupload/js/jquery.plupload.queue/css/jquery.plupload.queue.css" type="text/css" />
...
```


```html
...
<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
<script src="bower_components/plupload/js/plupload.full.min.js"></script>
<script src="bower_components/plupload/js/jquery.plupload.queue/jquery.plupload.queue.min.js"></script>
<script src="bower_components/angular-jquery-plupload/dist/angular-plupload.min.js"></script>
...
```

(3) add `'angular-jquery-plupload'` to your main module's list of dependencies

```javascript
var myApp = angular.module('myApp', ['angular-jquery-plupload']);
```

(4) enjoy!

## Quick example

### app.js (global plupload setting)

[Plupload setting](http://www.plupload.com/docs/Uploader#Uploader-settings-method)


```javascript
angular.module('myApp', ['angular-jquery-plupload'])
.config(function (pluploadOptionProvider) {
  // global setting
  pluploadOptionProvider.setOptions({
    flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
    silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
    max_file_size: '10mb',
    ...
  });
});
```


### controller

basic

```javascript
$scope.fileUpload = {
  url: '/posts/1/attachments'
}
```

edit setting

```javascript
$scope.fileUpload = {
  url: '/posts/1/attachments',
  options: {
    multi_selection: false,
    max_file_size: '32mb',
    headers: {
      'token': 'xxx token'
    }
  }
}
```

use callback

[Plupload event](http://www.plupload.com/docs/Uploader#events)

```javascript
$scope.fileUpload = {
  url: '/posts/1/attachments',
  callbacks: {
    filesAdded: function(uploader, files) {
      $scope.loading = true;
      $timeout(function() { 
        uploader.start(); 
      }, 1);
    },
    uploadProgress: function(uploader, file) {
      $scope.loading = file.percent/100.0;
    },
    fileUploaded: function(uploader, file, response) {
      $scope.loading = false;
      alert('Upload Complete!');
    },
    error: function(uploader, error) {
      $scope.loading = false;
      alert(error.message);
    }
  }
}
```

### view

basic

```html
<a plupload="fileUpload.url">
  Upload Button
</a>
```

basic (with static value)

```html
<a plupload="'/upload'">
  Upload Button
</a>
```

edit setting

```html
<a plupload="fileUpload.url"
   plupload-options="fileUpload.options">
  Upload Button
</a>
```

use callback

```html
<a plupload="fileUpload.url"
   plupload-callbacks="fileUpload.callbacks">
  Upload Button
</a>
```

edit setting & use callback

```html
<a plupload="fileUpload.url"
   plupload-options="fileUpload.options"
   plupload-callbacks="fileUpload.callbacks">
  Upload Button
</a>
```

## Links

* [Plupload](http://www.plupload.com/)
* [Plupload API](http://www.plupload.com/docs/API)
* [Plupload API#event](http://www.plupload.com/docs/Uploader#events)
* [Plupload API#settings](http://www.plupload.com/docs/Uploader#Uploader-settings-method)

## Contributing

1. Fork it ( https://github.com/mygu/angular-jquery-plupload/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

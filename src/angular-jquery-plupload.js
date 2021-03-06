/**!
 * AngularJS Plupload directive
 * @author Mingyu Gu <mingyugu0410@gmail.com>
 */

/* global plupload */
(function () {
    'use strict';

    angular.module('angular-jquery-plupload', [])
        .provider('pluploadQueueOption', function () {
            var opts = {
                flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
                silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
                runtimes: 'html5, flash, silverlight, html4',
                max_file_size: '10mb',
                filters: [
                    {title: 'Image files', extensions: 'jpg,jpeg,gif,png'}
                ],
                views: {
                    list: true,
                    thumbs: false,
                    active: 'list'
                }
            };
            return {
                setOptions: function (newOpts) {
                    angular.extend(opts, newOpts);
                },
                $get: function () {
                    return opts;
                }
            };
        })
        .provider('pluploadOption', function () {
            var opts = {
                flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
                silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
                runtimes: 'html5, flash, silverlight, html4',
                multi_selection: false,
                filters: {
                    max_file_size: '10mb',
                    mime_types: [
                        {title: "Image files", extensions: "jpg,jpeg,gif,png"}
                    ]
                }
            };
            return {
                setOptions: function (newOpts) {
                    angular.extend(opts, newOpts);
                },
                $get: function () {
                    return opts;
                }
            };
        })
        .directive('pluploadQueue', [
            '$timeout', 'pluploadQueueOption',
            function ($timeout, pluploadQueueOption) {
                function lowercaseFirstLetter(string) {
                    return string.charAt(0).toLowerCase() + string.slice(1);
                }

                return {
                    scope: {
                        url: '=pluploadQueue',
                        options: '=pluploadQueueOptions',
                        callbacks: '=pluploadQueueCallbacks',
                        init: '=pluploadQueueInit'
                    },
                    link: function postLink(scope, element, attrs) {
                        scope.$watch("init", function (newValue, oldValue) {
                            if (newValue) {
                                scope.init = false;
                                var opts = pluploadQueueOption;
                                var $target = $(element[0]);

                                opts.url = scope.url;
                                angular.extend(opts, scope.options);

                                $target.pluploadQueue(opts);
                                var uploader = $target.pluploadQueue();

                                if (scope.callbacks) {
                                    var callbackMethods = ['Init', 'PostInit', 'OptionChanged',
                                        'Refresh', 'StateChanged', 'UploadFile', 'BeforeUpload', 'QueueChanged',
                                        'UploadProgress', 'FilesRemoved', 'FileFiltered', 'FilesAdded',
                                        'FileUploaded', 'ChunkUploaded', 'UploadComplete', 'Error', 'Destroy'];
                                    angular.forEach(callbackMethods, function (method) {
                                        var callback = (scope.callbacks[lowercaseFirstLetter(method)] || angular.noop);
                                        uploader.bind(method, function () {
                                            callback.apply(null, arguments);
                                            if (!scope.$$phase && !scope.$root.$$phase) {
                                                scope.$apply();
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    }
                };
            }
        ])
        .directive('plupload', [
            '$timeout', 'pluploadOption',
            function ($timeout, pluploadOption) {
                function lowercaseFirstLetter(string) {
                    return string.charAt(0).toLowerCase() + string.slice(1);
                }

                return {
                    scope: {
                        url: '=plupload',
                        options: '=pluploadOptions',
                        callbacks: '=pluploadCallbacks'
                    },
                    link: function postLink(scope, element, attrs) {
                        var opts = pluploadOption;

                        opts.url = scope.url;
                        opts.browse_button = element[0];
                        angular.extend(opts, scope.options);

                        var uploader = new plupload.Uploader(opts);

                        if (scope.callbacks) {
                            var callbackMethods = ['Init', 'PostInit', 'OptionChanged',
                                'Refresh', 'StateChanged', 'UploadFile', 'BeforeUpload', 'QueueChanged',
                                'UploadProgress', 'FilesRemoved', 'FileFiltered', 'FilesAdded',
                                'FileUploaded', 'ChunkUploaded', 'UploadComplete', 'Error', 'Destroy'];
                            angular.forEach(callbackMethods, function (method) {
                                var callback = (scope.callbacks[lowercaseFirstLetter(method)] || angular.noop);
                                uploader.bind(method, function () {
                                    callback.apply(null, arguments);
                                    if (!scope.$$phase && !scope.$root.$$phase) {
                                        scope.$apply();
                                    }
                                });
                            });
                        }

                        uploader.init();
                    }
                };
            }
        ]);
})();

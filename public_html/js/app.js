angular.module('serialNumber', [])

        .controller('AppController', function ($scope, $locale) {
            $scope.generate = function () {
                if ($scope.versionNumber === null || $scope.versionNumber === '' || typeof $scope.versionNumber === 'undefined') {
                    $scope.versionNumberReq = true;
                    return false;
                } else {
                    $scope.versionNumberReq = false;
                }
                if ($scope.startAt === null || $scope.startAt === '' || isNaN($scope.startAt)) {
                    $scope.startAtReq = true;
                    return false;
                } else {
                    $scope.startAtReq = false;
                }
                if ($scope.snoWidth === null || $scope.snoWidth === '' || isNaN($scope.snoWidth)) {
                    $scope.snoWidthReq = true;
                    return false;
                } else {
                    $scope.snoWidthReq = false;
                }
                if ($scope.padWith === null || $scope.padWith === '' || isNaN($scope.padWith)) {
                    $scope.padWithReq = true;
                    return false;
                } else {
                    $scope.snoWidthReq = false;
                }
                if ($scope.total === null || $scope.total === '' || isNaN($scope.total)) {
                    $scope.totalReq = true;
                    return false;
                } else {
                    $scope.totalReq = false;
                }
                $scope.displayGenerated = true;
                $scope.finalResult = generateSNO();
                function generateSNO() {
                    $scope.finalResult = null;
                    var finalResultArray = new Array();
                    for (var i = $scope.startAt; i < $scope.startAt + $scope.total; i++) {
                        var tempVal = {prefix: '' + $scope.versionNumber, suffix: i + ''};
                        if (tempVal.prefix.length + tempVal.suffix.length < $scope.snoWidth) {
                            var paddingNeeded = $scope.snoWidth - (tempVal.prefix.length + tempVal.suffix.length);
                            var padding = '';
                            for (var j = 0; j < paddingNeeded; j++) {
                                padding += '' + $scope.padWith;
                            }
                            finalResultArray.push(tempVal.prefix + '' + padding + '' + tempVal.suffix);
                        } else {
                            alert('Please provide a larger width.');
                            $('#snoWidth').focus();
                            return finalResultArray;
                        }
                    }
                    $('html, body').animate({scrollTop: 600}, 800);
                    $scope.finalResult = finalResultArray;
                    $scope.apply();
                    return finalResultArray;
                }
                $scope.printPage = function () {
                    var printContents = document.getElementById("tableSerial").innerHTML;
                    var popupWin = window.open('', '_blank', 'width=800,height=1000');
                    popupWin.document.open()
                    popupWin.document.write('<html><head> <link href="css/bootstrap.min.css" rel="stylesheet"></head><body onload="window.print()">' + printContents + '</html>');
                    popupWin.document.close();
                };
            };
        });
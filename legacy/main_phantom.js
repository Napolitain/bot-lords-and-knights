var fs = require('fs');
var page = require('webpage').create();

// fs.write("LOGS.txt", '', 'w'); // reset
page.onConsoleMessage = function(msg) {
    fs.write("LOGS.txt", new Date().toString() + ' >>> ' + msg + '\n', 'a')
    console.log(new Date().toString() + ' >>> ' + msg); // old was CONSOLE: instead of new Date...
};

preventTime = 0;
config = JSON.parse(fs.read('config_phantom.json'));
page.settings.userAgent = "Mozilla/5.0 (Linux; Android 4.4.4; One Build/KTU84L.H4) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/28.0.0.20.16;]"; //Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0 is mine ; the one used seem to be WebView of FB for android (which supports not WebGL and others, so bypass PhantomJS detection)

function worker() {
    setTimeout(function() {
        page.open('http://lordsandknights.com/game-login', function() {
            setTimeout(function() {
                var fillLogin = page.evaluate(function(preventTime, config) {
                    console.log('1 started');
                    $('#login input').eq(0).val(config['email']);
                    $('#login input').eq(1).val(config['password']);
                    $('#login input').eq(2).val('en');
                    $('#login button').click();
                    console.log('1 finished');
                    return true;
                }, preventTime, config);
                page.render('LK1.png');
            }, 5000);
            setTimeout(function() {
                var submitWorld = page.evaluate(function(preventTime, config) {
                    console.log('2 started');
                    $('#149').click();
                    console.log('2 finished');
                    return true;
                }, preventTime, config);
                page.render('LK2.png');
            }, 15000);
            setTimeout(function() {
                var spawnPanels = page.evaluate(function(preventTime, config) {
                    console.log('3 started');
                    $('.static.topbar.frame-container').children().eq(8).children().eq(1).children().eq(0).click();
                    $('.static.topbar.frame-container').children().eq(8).children().eq(1).children().eq(1).click();
                    console.log('3 finished');
                    return true;
                }, preventTime, config);
                page.render('LK3.png');
            }, 45000);
            setTimeout(function() {
                var execScripts = page.evaluate(function(preventTime, config) {
                    function include(arr,obj) { // those functions are not part of scraping
                        return (arr.indexOf(obj) != -1);
                    }
                    function add(a, b) {
                        return a + b;
                    }
                    Array.min = function(array) {
                        return Math.min.apply(Math, array);
                    };
                    console.log('4 started');
                    var castlesList = []; var buildingsList = []; var bl = 0; var pathsList = []; var capList = [];
                    $('.win.castleList .points').each(function(i) {
                        var points_temp = parseInt($(this).html().match(/\d/g).join(''));
                        var l = config['buildings']['caps'];
                        var closest = l.map(function(num) {
                            return num-points_temp;
                        }).indexOf(Math.min.apply(
                            Math, l.map(function(num) {
                                return num-points_temp;
                            }).filter(function(num) {
                                return num > 0;
                            })
                        ));
                        capList.push([]);
                        castlesList.push($(this).parent().parent().children().eq(0).children().eq(1).html()); // list my castles under closest cap points;
                        if (config['buildings']['active'] === true) {
                            capList[i].push(closest);
                        } else {
                            capList[i].push(-1);
                        }
                        if (config['troops']['active'] === true && points_temp >= config['troops']['starting']) {
                            capList[i].push(true);
                        } else {
                            capList[i].push(false);
                        }
                    });
                    for (var i = 0; i < castlesList.length; i++) { // might be better in next loop for performance
                        buildingsList.push([]);
                    }
                    $('.win.buildingList #globalBuildingList .title').each(function(i) { // buildingsList lists level of each buildings of each buildings: might become mostly useless
                        if (include(castlesList, this.innerHTML)) {
                            pathsList.push($(this).parent().parent().parent().parent().children().eq(1).children().eq(0)); //storing paths
                            for (var j = 0; j <= 12; j++) {
                                buildingsList[i-bl].push(parseInt(pathsList[i-bl].children().eq(j).children().eq(0).children().eq(1).html()));
                            }
                        } else {
                            bl++;
                        }
                    });
                    for (var i = 0; i < castlesList.length; i++) { // each castles to upgrades in buildings, units
                        if (capList[i][0] !== -1) { // buildings part
                            var algorithm = config['buildings']['parts'][capList[i][0]];
                            if (algorithm['fill'] === true) { // fill algorithm
                                pathsList[i].children().each(function() {
                                    if ($(this).children().eq(2)['length'] !== 0) {
                                        if ($(this).children().eq(2)[0].classList.contains('disabled')) {
                                        } else {
                                            $(this).children().eq(2).click();
                                            return false;
                                        }
                                    }
                                });
                            } else { // pseudo random buildings algorithm
                                var r = Math.floor((Math.random() * algorithm['rate_on']) + 1); // only one upgrade at a time, with timeout so it does not fail some castles?
                                if (r < algorithm['dun_rate']) {
                                    pathsList[i].children().eq(0).children().eq(2).click();
                                } else if (r < algorithm['army_rate'] && r >= algorithm['dun_rate']) {
                                    pathsList[i].children().eq(1).children().eq(2).click();
                                } else if (r < algorithm['tav_rate'] && r >= algorithm['army_rate']) {
                                    pathsList[i].children().eq(2).children().eq(2).click();
                                } else if (r < algorithm['lib_rate'] && r >= algorithm['tav_rate']) {
                                    pathsList[i].children().eq(3).children().eq(2).click();
                                } else if (r < algorithm['fort_rate'] && r >= algorithm['lib_rate']) {
                                    pathsList[i].children().eq(4).children().eq(2).click();
                                } else if (r < algorithm['market_rate'] && r >= algorithm['fort_rate']) {
                                    pathsList[i].children().eq(5).children().eq(2).click();
                                } else if (r < algorithm['farms_rate'] && r >= algorithm['market_rate']) {
                                    pathsList[i].children().eq(6).children().eq(2).click();
                                } else if (r < algorithm['ress_rate'] && r >= algorithm['farms_rate']) { //prod and storage
                                    var prod = [buildingsList[i].slice(7)[0], buildingsList[i].slice(7)[2], buildingsList[i].slice(7)[4]];
                                    var store = [buildingsList[i].slice(7)[1], buildingsList[i].slice(7)[3], buildingsList[i].slice(7)[5]];
                                    if (((prod.reduce(add, 0) - store.reduce(add, 0)) < 18) && store.reduce(add, 0) !== 60) {
                                        var k = prod.indexOf(Array.min(prod));
                                        pathsList[i].children().eq(7+2*k).children().eq(2).click(); // $('div[data-habitat='+pathsList[i]+'].building .button .buildbutton').eq(7+2*k).children().eq(2).click(); //commented is modern version
                                    } else {
                                        var k = store.indexOf(Array.min(store));
                                        pathsList[i].children().eq(8+2*k).children().eq(2).click(); // $('div[data-habitat='+pathsList[i]+'].building .button .buildbutton').eq(8+2*k).children().eq(2).click(); //
                                    }
                                }
                            }
                        }
                        if (capList[i][1] !== false) { // troops recruitment part
                            var current = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            $('.win.recruitingList #recruitingList').children().eq(i).find('.affordable').each(function(j) {
                                current[j] += parseInt(this.innerHTML);
                            });
                            if (current[0] < config['troops']['composition']) { // dont forget researchs... and food bypass emergency

                            }
                        }
                    }
                    console.log('4 finished');
                    return true;
                }, preventTime, config);
                page.render('LK4.png');
            }, 47000);
            setTimeout(function() {
                var getTimes = page.evaluate(function(preventTime, config) {
                    if (config['buildings']['active'] !== true) {
                        return 43200000; //12h
                    }
                    function include(arr,obj) { // those functions are not part of scraping
                        return (arr.indexOf(obj) != -1);
                    }
                    function add(a, b) {
                        return a + b;
                    }
                    Array.min = function(array) {
                        return Math.min.apply(Math, array);
                    };
                    console.log('5 started');
                    var next = [];
                    $('.readyTime').each(function() {
                        next.push(this.innerHTML);
                    });
                    for (var i = 0; i < next.length; i++) {
                        next[i] = eval(next[i].replace('&lt;' ,'').replace('m', '*60').replace('h', '*60*60').replace('d', '*60*60*24').replace(' ', '+'));
                    }
                    console.log($('.castleOverview .detail').html()); // points
                    console.log('Next at: ' + new Date(Date.now() + Array.min(next)*1000).toString()) // time for next
                    $('.bottombarImageContainer.Logout').click(); // logout
                    setTimeout(function(){$('.buttons .button:last').click()},500);
                    console.log('5 finished');
                    return Array.min(next)*1000;
                }, preventTime, config);
                preventTime = getTimes;
                if (preventTime === Infinity) {
                    preventTime = 900000 // 15min ... 10800000; // 3h
                } else if (preventTime > 10800000 && config['buildings']['active'] === true) {
                    preventTime = 10800000; // 3h
                }
                if (config['blacklist_hours'].indexOf(new Date(Date.now() + preventTime).getHours()) !== -1) {
                    for (var i = 0; i < config['blacklist_hours'].length; i++) {
                        if (config['blacklist_hours'].indexOf(new Date(Date.now() + preventTime).getHours() + i) === -1) {
                            preventTime = preventTime + (i*1000*60*60);
                            break;
                        }
                    }
                }
                page.render('LK5.png');
                worker();
            }, 50000);
        });
    }, preventTime);
}

worker();

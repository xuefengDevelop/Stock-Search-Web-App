var app = angular.module('firstApplication', ['ngMaterial','ngMessages']);
app.controller('autoCompleteController',function($q, $log,$http,$scope,$compile){
    var self = this;
    var highchartsObject ={};
    var highchartsObjectprice ={};
    var highchartsObjectsma ={};
    var highchartsObjectema ={};
    var highchartsObjectstoch ={};
    var highchartsObjectrsi ={};
    var highchartsObjectadx ={};
    var highchartsObjectcci ={};
    var highchartsObjectbbands ={};
    var highchartsObjectmacd ={};
    var pricestr = "";
    var smastr = "";
    var emastr = "";
    var stochstr = "";
    var rsistr = "";
    var adxstr = "";
    var ccistr = "";
    var bbandsstr = "";
    var macdstr = "";
    $scope.mydisabled=true;
               
    // controller for window size. Content changes by the window size
    $(window).resize(function () {
        if($( window ).width() < 768){
        $("#firstnavgationButton").replaceWith('<li class="active" id="firstnavgationButton"><a data-toggle="pill" href="#home"><i class="glyphicon glyphicon-dashboard"></i>Stock</a></li>');
        $("#secondnavgationButton").replaceWith('<li id="secondnavgationButton"><a data-toggle="pill" href="#menu1"><i class="glyphicon glyphicon-stats"></i>Charts</a></li>');
        $("#thirdnavgationButton").replaceWith('<li id="thirdnavgationButton"><a data-toggle="pill" href="#menu2"><i class="glyphicon glyphicon-link"></i>News</a></li>');
    }else{
        $("#firstnavgationButton").replaceWith('<li class="active" id="firstnavgationButton"><a data-toggle="pill" href="#home"><i class="glyphicon glyphicon-dashboard"></i>Current Stock</a></li>');
        $("#secondnavgationButton").replaceWith('<li id="secondnavgationButton"><a data-toggle="pill" href="#menu1"><i class="glyphicon glyphicon-stats"></i>Historical Charts</a></li>');
        $("#thirdnavgationButton").replaceWith('<li id="thirdnavgationButton"><a data-toggle="pill" href="#menu2"><i class="glyphicon glyphicon-link"></i>News Feeds</a></li>');
        }
    });
    if($( window ).width() < 768){
        $("#firstnavgationButton").replaceWith('<li class="active" id="firstnavgationButton"><a data-toggle="pill" href="#home"><i class="glyphicon glyphicon-dashboard"></i>Stock</a></li>');
        $("#secondnavgationButton").replaceWith('<li id="secondnavgationButton"><a data-toggle="pill" href="#menu1"><i class="glyphicon glyphicon-stats"></i>Charts</a></li>');
        $("#thirdnavgationButton").replaceWith('<li id="thirdnavgationButton"><a data-toggle="pill" href="#menu2"><i class="glyphicon glyphicon-link"></i>News</a></li>');
    }else{
        $("#firstnavgationButton").replaceWith('<li class="active" id="firstnavgationButton"><a data-toggle="pill" href="#home"><i class="glyphicon glyphicon-dashboard"></i>Current Stock</a></li>');
        $("#secondnavgationButton").replaceWith('<li id="secondnavgationButton"><a data-toggle="pill" href="#menu1"><i class="glyphicon glyphicon-stats"></i>Historical Charts</a></li>');
        $("#thirdnavgationButton").replaceWith('<li id="thirdnavgationButton"><a data-toggle="pill" href="#menu2"><i class="glyphicon glyphicon-link"></i>News Feeds</a></li>');
        }
    $scope.myValue = false;
               
    // local storge remove controller
    $('.trashbutton').click(function(e){
            var atr = $(this).attr('id');
            localStorage.removeItem(atr);
            $(this).closest('tr').remove();
        })
    // controll the input graph, on the right bot panel
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        highchartsObject = highchartsObjectprice;
        if(target == '#sma'){
            $("#facebookbutton").prop('disabled', true);
            if(smastr != ""){
                 $("#facebookbutton").prop('disabled', false);
            }
            highchartsObject = highchartsObjectsma;
        }
        else if(target == '#ema'){
            $("#facebookbutton").prop('disabled', true);
            if(emastr != ""){
                 $("#facebookbutton").prop('disabled', false);
            }
            highchartsObject =highchartsObjectema;
        }else if(target == '#stoch'){
                     $("#facebookbutton").prop('disabled', true);
            if(stochstr != ""){
                 $("#facebookbutton").prop('disabled', false);
            }
            highchartsObject =highchartsObjectstoch;
            console.log(emastr);
        }else if(target == '#rsi'){
                     $("#facebookbutton").prop('disabled', true);
            if(rsistr != ""){
                 $("#facebookbutton").prop('disabled', false);
            }
            highchartsObject =highchartsObjectrsi;
            console.log(emastr);
        }else if(target == '#adx'){
                     $("#facebookbutton").prop('disabled', true);
            if(adxstr != ""){
                 $("#facebookbutton").prop('disabled', false);
            }
            highchartsObject =highchartsObjectadx;
            console.log(emastr);
        }else if(target == '#cci'){
                     $("#facebookbutton").prop('disabled', true);
            if(ccistr != ""){
                 $("#facebookbutton").prop('disabled', false);
            }
            highchartsObject =highchartsObjectcci;
            console.log(emastr);
        }else if(target == '#bbands'){
                     $("#facebookbutton").prop('disabled', true);
            if(bbandsstr != ""){
                 $("#facebookbutton").prop('disabled', false);
            }
            highchartsObject =highchartsObjectbbands;
            console.log(emastr);
        }
        else if(target == '#macd'){
                     $("#facebookbutton").prop('disabled', true);
            if(macdstr != ""){
                 $("#facebookbutton").prop('disabled', false);
            }
            highchartsObject =highchartsObjectmacd;
            console.log(emastr);
        } else if(target == '#price'){
                     $("#facebookbutton").prop('disabled', true);
            if(pricestr != ""){
                 $("#facebookbutton").prop('disabled', false);
            }
            highchartsObject = highchartsObjectprice;
            console.log(emastr);
        }
    });
               
    $scope.values = true;
    $("#slideRight").prop('disabled', true);
    $("#facebookbutton").prop('disabled', true);
    $("#faviouriteButton").prop('disabled', true);
    $("#myorders").attr('disabled',true);
    $("#getquotebutton").attr('disabled',true);
    self.getblur = getblur;
    self.getfocus = getfocus;
    self.querySearch   = querySearch;
    self.printTable = printTable;
    self.changetext = changetext;
    $scope.feed = {};
    $scope.configs = [
    { name: 'Default', value: '0' }, 
    { name: 'Symbol', value: '1' }, 
    { name: 'Price', value: '2' },
    { name: 'Change', value: '3' },
    { name: 'Change Percent', value: '4' },
    { name: 'Volume', value: '5' },
    ];
   $scope.feed.config = $scope.configs[0];
    
    $scope.thisorder = {};
    $scope.orders = [
    { name: 'Ascending', value: '0' }, 
    { name: 'Descending', value: '1' }, 
    ];
   $scope.thisorder.ordered = $scope.orders[0];
    
    // autorefresh function implemented
               
    var autofreshcontroller;
    $('#toggle-one').change(function() {
        if($('#toggle-one').prop('checked')){
            autofreshcontroller = setInterval(function(){
                var thistext = Object.keys(localStorage);
        var i;
        for(i=0;i<thistext.length;i++){
            var url1 = "http://stockmarket.us-east-2.elasticbeanstalk.com/pricetable/"+thistext[i];
            var messageContent = thistext[i];
            var request = {
                method:'GET',
                url:url1,
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Credentials':'true'
                },
            } 
            $http(request).then(function success(response){
                var myarr = [];
                var json = response.data;
                text = json['Time Series (Daily)'];
                info = json['Meta Data']['2. Symbol'];
                var currentDay = Object.keys(text)[0];
                var preDay = Object.keys(text)[1];
                currentVolume = (Math.abs(text[currentDay]['5. volume']));
                currentPrice = parseFloat(text[currentDay]['4. close']).toFixed(2);
                open = parseFloat(text[currentDay]['1. open']);
                high = parseFloat(text[currentDay]['2. high']);
                low = parseFloat(text[currentDay]['3. low']);
                perClose = parseFloat(text[preDay]['4. close']);
                var change = (currentPrice-perClose).toFixed(2);
                var changePerc = (((currentPrice-perClose)/perClose)*100).toFixed(2);
                myarr.push(info);
                myarr.push(currentPrice);
                myarr.push(change);
                myarr.push(changePerc);
                myarr.push(currentVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                localStorage.removeItem(info);
                localStorage.setItem(info,JSON.stringify(myarr));
                $("#"+info+"1mytableinfo .priceinfomation").html(currentPrice);
                $("#"+info+"1mytableinfo .volumetab").html(currentVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                if(change>0){
                    $("#"+info+"1mytableinfo .changetab").replaceWith('<td style="color:green" class="changetab">'+change+'('+changePerc+'%)<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Up.png" class="myimg"></td>');}
                else{
                    $("#"+info+"1mytableinfo .changetab").replaceWith('<td style="color:red" class="changetab">'+change+'('+changePerc+'%)<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Down.png" class="myimg"></td>');}
                },function errormessage(response){})
            }
         $('.trashbutton').click(function(e){
        var atr = $(this).attr('id');
        localStorage.removeItem(atr);
        $(this).closest('tr').remove();
    })
            },5000);
        } else if(!$('#refershButton').prop('checked')){
            clearInterval(autofreshcontroller);
        }
    })
    var text = {};
    var favArr;
    printTable();
    // sort talbe base on what user clicked
    $scope.sortTable = function(value){
        var index = $scope.feed.config.value;
        var myindex = $scope.thisorder.ordered.value;
        if(index != 0){
            $("#myorders").attr('disabled',false);
            $('.selectpicker').selectpicker('refresh');
            sortArrayby(index,myindex);
        }else{
            $("#myorders").attr('disabled',true);
            $('.selectpicker').selectpicker('refresh');
        }
    }
    // help function for sort
    function sortArrayby(index1,index2){
        var arrs = [];
        keys = Object.keys(localStorage);
            for(i=0;i<keys.length;i++){
                var arr = JSON.parse(localStorage.getItem(keys[i]));
                arrs.push(arr);
            }
        arrs.sort(function (element_a, element_b) {
            return element_a[index1-1] - element_b[index1-1];
        });
    if(index1-1 == 4){
        arrs.sort(function (element_a, element_b) {
        return parseInt(element_a[index1-1].replace(/,/g,'')) - parseInt(element_b[index1-1].replace(/,/g,''));
    });
    }
        var i;
        var text = "";
         text += ('<table class="table table-striped" id="table-section" style="width:90%"><tr><th>Symbol</th><th>Stock Price</th><th>Change(Change Percent)</th><th>Volume</th><th></th></tr>');
        if(index2 == 0){
        // change content infromation on the left bot panel based on what use inputs
        for(i=0;i<arrs.length;i++){
            localStorage.removeItem(arrs[i][0]);
            localStorage.setItem(arrs[i][0],JSON.stringify(arrs[i]));
            text +=('<tr id="'+arrs[i][0]+'1mytableinfo"><td style="color:blue">'+arrs[i][0]+'</td><td class="priceinfomation">'+arrs[i][1]+'</td>');
            if(arrs[i][2]>0){
                text +=('<td style="color:green" class="changetab">'+arrs[i][2]+'('+arrs[i][3]+'%)'+'<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Up.png" class="myimg"></td>');
            }else{
                text +=('<td style="color:red" class="changetab">'+arrs[i][2]+'('+arrs[i][3]+'%)'+'<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Down.png" class="myimg"></td>');
            }
            text +=('<td class="volumetab">'+arrs[i][4]+'</td>'+'<td><button class="trashbutton" id="'+arrs[i][0]+'" ng-click="myFunction()"><i class ="glyphicon glyphicon-trash"></i></button></td></tr>');
        }}else{
             for(i=arrs.length-1;i>=0;i--){
            text +=('<tr id="'+arrs[i][0]+'"><td style="color:blue">'+arrs[i][0]+'</td><td>'+arrs[i][1]+'</td>');
            if(arrs[i][2]>0){
                text +=('<td style="color:green" class="changetab">'+arrs[i][2]+'('+arrs[i][3]+'%)'+'<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Up.png" class="myimg"></td>');
            }else{
                text +=('<td style="color:red" class="changetab">'+arrs[i][2]+'('+arrs[i][3]+'%)'+'<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Down.png" class="myimg"></td>');
            }
            text +=('<td class="volumeTab">'+arrs[i][4]+'</td>'+'<td><button class="trashbutton" id="'+arrs[i][0]+'" ng-click="myFunction()"><i class ="glyphicon glyphicon-trash"></i></button></td></tr>');
        }}
        text +='</table>';
        printTable();
        $("#table-section").replaceWith(text);
    }
    // check if it is trading hours, if it is not, autofresh will not request infromation continously
               
    function isTradingHour(now){
	   return now.getDay()!=0 && now.getDay()!=6 &&now.getDate() != 23 &&((now.getHours()>=8 && now.getHours()<14)||(now.getHours() == 7 && now.getMinutes()>29))
    }
    // bond with Facebook API to upload information
    window.fbAsyncInit = function() {     
        FB.init({
            appId      : '169361180320894',
            status     : true,
            xfbml      : true,
            cookie     : true, 
            version    : 'v2.9'
        });
    };
    
    
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "http://connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
    
    
    $scope.FBController = function() {
        var optionsStr = JSON.stringify(highchartsObject),
        dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
            var exportUrl = 'http://export.highcharts.com/';
            $.ajax({
                type: 'POST',
                data: dataString,
                url: exportUrl,
                success: function (data) {
                    exportUrl= exportUrl+data;
                    FB.ui({
                        app_id: '169361180320894', 
                        method: 'feed',
                        picture: exportUrl
                    }, (response) => {
                    if (response && !response.error_message) {
                    } else { }
            });
                },
                error: function (err) {
                    debugger;
                }
            });
    }
    
    // controller for refresh button
    $('#refreshbutton').click(function(){
        var thistext = Object.keys(localStorage);
        var i;
        for(i=0;i<thistext.length;i++){
            var url1 = "http://stockmarket.us-east-2.elasticbeanstalk.com/pricetable/"+thistext[i];
            var messageContent = thistext[i];
            var request = {
                method:'GET',
                url:url1,
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Credentials':'true'
                },
            } 
            $http(request).then(function success(response){
                var myarr = [];
                var json = response.data;
                text = json['Time Series (Daily)'];
                info = json['Meta Data']['2. Symbol'];
                var currentDay = Object.keys(text)[0];
                var preDay = Object.keys(text)[1];
                currentVolume = (Math.abs(text[currentDay]['5. volume']));
                currentPrice = parseFloat(text[currentDay]['4. close']).toFixed(2);
                open = parseFloat(text[currentDay]['1. open']);
                high = parseFloat(text[currentDay]['2. high']);
                low = parseFloat(text[currentDay]['3. low']);
                perClose = parseFloat(text[preDay]['4. close']);
                var change = (currentPrice-perClose).toFixed(2);
                var changePerc = (((currentPrice-perClose)/perClose)*100).toFixed(2);
                myarr.push(info);
                myarr.push(currentPrice);
                myarr.push(change);
                myarr.push(changePerc);
                myarr.push(currentVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                localStorage.removeItem(info);
                localStorage.setItem(info,JSON.stringify(myarr));
                $("#"+info+"1mytableinfo .priceinfomation").html(currentPrice);
                $("#"+info+"1mytableinfo .volumetab").html(currentVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                if(change>0)
                    $("#"+info+"1mytableinfo .changetab").replaceWith('<td style="color:green" class="changetab">'+change+'('+changePerc+'%)<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Up.png" class="myimg"></td>');
                else
                    $("#"+info+"1mytableinfo .changetab").replaceWith('<td style="color:red" class="changetab">'+change+'('+changePerc+'%)<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Down.png" class="myimg"></td>');
                },function errormessage(response){})
            }
         $('.trashbutton').click(function(e){
        var atr = $(this).attr('id');
        localStorage.removeItem(atr);
        $(this).closest('tr').remove();
    })
    })
    $('.trashbutton').click(function(e){
        var atr = $(this).attr('id');
        localStorage.removeItem(atr);
        $(this).closest('tr').remove();
    })
    // favourite star controller, add stock information to the home page
    $scope.getQuote = function(name) {
        name = name.toUpperCase();
        if(localStorage[name] !=  null){
            $('.glyphicon-star-empty').toggleClass('glyphicon-star-empty glyphicon-star');
            $("#mybutton").css("color","yellow");
        }else{
            $('.glyphicon-star').toggleClass('glyphicon-star glyphicon-star-empty');
            $("#mybutton").css("background-color","white");
            $("#mybutton").css("color","");
        }
        printLoadingBar();
        $scope.myValue = true;
        $scope.values = false;
        var price = [];
        var volume = [];
        var date = [];
        var currentVolume;
        var currentPrice;
        var currentTime;
        var open;
        var high;
        var low;
        var perClose;
        favArr = [];
        $("#slideRight").prop('disabled', false);
        $("#facebookbutton").prop('disabled', true);
        $("#faviouriteButton").prop('disabled', true);
        var url1 = "http://stockmarket.us-east-2.elasticbeanstalk.com/pricetable/"+name;
        // add CROS title
        var request = {
            method:'GET',
            url:url1,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
        
        //http request for table section and fav table, plot table and transfer data from array to localStorage
        $http(request).then(function success(response){
                try{
                var text = response.data;
                text = text['Time Series (Daily)'];
                var currentDay = Object.keys(text)[0];
                var preDay = Object.keys(text)[1];
                currentVolume = (Math.abs(text[currentDay]['5. volume']));
                currentPrice = parseFloat(text[currentDay]['4. close']);
                open = parseFloat(text[currentDay]['1. open']);
                high = parseFloat(text[currentDay]['2. high']);
                low = parseFloat(text[currentDay]['3. low']);
                perClose = parseFloat(text[preDay]['4. close']);
                var change = (currentPrice-perClose).toFixed(2);
                var changePerc = (((currentPrice-perClose)/perClose)*100).toFixed(2);
                favArr.push(name.toUpperCase());
                favArr.push(currentPrice.toFixed(2));
                favArr.push(change);
                favArr.push(changePerc);
                favArr.push(currentVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                var table = '<table class="table table-striped" id="stocktableTab">';
                table += ('<tr><td><b>Stock Ticker Symbol</b></td> <td>' + name + '</td></tr>');
                table += ('<tr><td><b>Last Price</b></td> <td>' + currentPrice.toFixed(2) + '</td></tr>');
                if(perClose >currentPrice){
                    table += ('<tr><td><b>Change(Change Percent)</b></td> <td style="color:red">'+(currentPrice-perClose).toFixed(2)+'('+((currentPrice-perClose)/currentPrice*100).toFixed(2)+'%)<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Down.png" class="myimg"></td></tr>');
                }else {
                    table += ('<tr><td><b>Change(Change PerCent)</b></td> <td style="color:green">'+(currentPrice-perClose).toFixed(2)+'&nbsp('+((currentPrice-perClose)/currentPrice*100).toFixed(2)+'%)<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Up.png" class="myimg"></td></tr>');
                }
                var timeStamp =new Date();
                if(isTradingHour(timeStamp)){
                    table += ('<tr><td><b>Timestamp</b></td> <td>' + moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss z') + '</td></tr>');}
                else{
                    table += ('<tr><td><b>Timestamp</b></td> <td>' + new Date(Date.parse(currentDay.toString())).toISOString().substr(0,10)+' 16:00:00 EST' + '</td></tr>');
                }
                table += ('<tr><td><b>Open</b></td> <td>' + open.toFixed(2) + '</td></tr>');
                table += ('<tr><td><b>Close</b></td> <td>' + perClose.toFixed(2) + '</td></tr>');
                table += ('<tr><td><b>Day\'s Range</b></td> <td>' + low.toFixed(2)+' - '+high.toFixed(2) + '</td></tr>');
                table += ('<tr><td><b>Volume</b></td> <td>' + currentVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td></tr>');
                table += '</table>';
                $('#stocktableTab').html('');
                $("#stocktableTab").replaceWith(table);
                $("#faviouriteButton").prop('disabled', false);}
                catch(err){ 
                    var text = '<div style="color:#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid #e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="stocktableTab"> Error! Failed to get current stock data.</div>';
                    $('#stocktableTab').replaceWith(text);
                }
                },function errormessage(response){
             var text = '<div style="color:#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="stocktableTab"> Error! Failed to get current stock data.</div>';
                    $('#stocktableTab').replaceWith(text);
        });
        
        // request for price section, plot Price on graph
        var urlx = "http://stockmarket.us-east-2.elasticbeanstalk.com/price/"+name;
        
        var request = {
            method:'GET',
            url:urlx,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
        $http(request).then(function success(response){
                try{
                var text = response.data;
                text = text['Time Series (Daily)'];
                for(var i=130;i>=0;i--){
                    price.push(parseFloat(text[Object.keys(text)[i]]['4. close']));
                    var newDate = Object.keys(text)[i];
                    date.push(newDate.substring(5,7)+"/"+newDate.substring(8,10));
                    volume.push(parseFloat(text[Object.keys(text)[i]]['5. volume']));
                }
                    highchartsObjectprice ={
                    chart: {
                        zoomType: 'xy',
                        },
                    title: {
                        text: name + ' Stock Price and Volume'
                    },
                    subtitle: {
                    useHTML: true,
                    text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                    },
                    xAxis: [{
                        categories:date,
                        tickInterval:5
                    }],
                    yAxis: [{
                        title: {
                            text: 'Stock Price'
                        },
                        min:0
                    },
                    {
                        title: {
                        text: 'Volume',
                        },
                        maxPadding: 1.2,
                        opposite:true
                    }
                    ],
                    plotOptions: {
                        area: {
                        marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                        hover: {
                            enabled: true
                        }
                        }
                        }
                    }
                    },
                    legend: {
                        enabled: true,
                        floating: true,
                        verticalAlign: 'bottom',
                        align:'center',
                        y:20
                    },
                series: [{
                    name: name,
                    type: 'area',
                    yAxis: 0,
                    fillColor: '#E6E6FE',
                    lineColor:'#1A24C1',
                    color:'#1A24C1',
                    lineWidth: 1,
                    threshold: null,
                    data: price,
                }, {
                name: name+' Volume',
                type: 'column',
                yAxis: 1,
                color:'#D62426',
                data: volume
                }]
            };
                highchartsObject = highchartsObjectprice;
                Highcharts.chart('price', highchartsObjectprice);
                $("#facebookbutton").prop('disabled', false);
                pricestr+='1';
            }
            catch(err){
                var text = '<div style="color:#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="price-tab"> Error! Failed to get current stock data.</div>';
                $("#price-tab").replaceWith(text);
            }
                },function errormessage(response){
            var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid red;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="price-tab"> Error! Failed to get current stock data.</div>';
            $("#price-tab").replaceWith(text);
        });
        
        // http request for historical chart  and plot chart on graph
        var urlx1 = "http://stockmarket.us-east-2.elasticbeanstalk.com/historprice/"+name;
        
        var request = {
            method:'GET',
            url:urlx1,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
        // draw graph for right bot section and second controll page
        $http(request).then(function success(response){
            try{
                var arr = [];
                var i;
                var jsonData = response.data['Time Series (Daily)'];
                for(i=1000;i>=0;i--){
                    var array = [];
                    var datum = Date.parse(Object.keys(jsonData)[i]);
                    array.push(datum);
                    array.push(parseFloat(jsonData[Object.keys(jsonData)[i]]['4. close']));
                    arr.push(array);
                }
                Highcharts.stockChart('menu1', {
                    subtitle: {
                            useHTML: true,
                            text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                        },
                    rangeSelector: {
                        selected: 0,
                        buttons: [{
    			             type: 'week',
    			             count: 1,
    			             text: '1w'
				            },{
                            type: 'month',
                            count: 1,
                            text: '1m'
                            }, {
                            type: 'month',
                            count: 3,   
                            text: '3m'
                            }, {
                            type: 'month',
                            count: 6,
                            text: '6m'
                            }, {
                            type: 'ytd',
                            text: 'YTD'
                            }, {
                            type: 'year',
                            count: 1,
                            text: '1y'
                            }, {
                            type: 'all',
                            text: 'All'
                            }]},
                    tooltip: {
                        useHTML: true,
                        formatter: function () {
                            var time = new Date(this.x);
                            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            var s = time.toLocaleString('en-US', options) + '';
                            $.each(this.points, function () {
                                s += '<br/><span style="color:' +this.series.color+ ';font-size:150%">&bull;&nbsp;</span>' + this.series.name + ': ' +
                                this.y;
                            });
                            return s;
                    },
                        valueDecimals: 2
                    },
                    title: {
                        text: name+' Stock Value'
                    },
                    series: [{
                        fillColor: '#95C2EC',
                        type: 'area',
                        name: name,
                        data: arr,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });}
                catch(err){
                    var text = '<div style="color:#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="menu1-tab"> Error! Failed to get current stock data.</div>';
                    $('#menu1-tab').replaceWith(text);
                }
                },function errormessage(response){
            var text = '<div style="color:#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="menu1-tab"> Error! Failed to get current stock data.</div>';
                $('#menu1-tab').replaceWith(text);
        });
        
        
            var url2 = "http://stockmarket.us-east-2.elasticbeanstalk.com/sma/"+name;
            var request = {
            method:'GET',
            url:url2,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
            $http(request).then(function success(response){
                try{
                    text = response.data;
                    var parent = text['Technical Analysis: SMA'];
                    var smaDates = [];
                    var smaValues = [];
                    for(var i = 130;i>=0;i--){
                        var newDate = Object.keys(parent)[i];
                        smaDates.push(newDate.substring(5,7)+"/"+newDate.substring(8,10));
                        smaValues.push(parseFloat(parent[newDate]['SMA']));
                    }
                    highchartsObjectsma ={
                        chart: {
                            zoomType: 'xy',
                        },
                        title: {
                            text: 'Simple Moving Average(SMA)'
                            },
                        subtitle: {
                            useHTML: true,
                            text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                        },
                        yAxis: {
                            title: {
                                text: 'SMA'
                            },
                        },
                        xAxis: {
                            categories:smaDates,
                            tickInterval: 5
                        },
                        legend: {
                            enabled: true,
                            floating: true,
                            verticalAlign: 'bottom',
                            align:'center',
                            y:20
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                marker: {
                                    enabled: true,
                                    radius: 2,
                                    symbol: 'square'
                                }
                            }
                        },

                        series: [{
                            name: name,
                            data: smaValues
                        }],
                        responsive: {
                            rules: [{
                            condition: {
                            maxWidth: 500
                            },
                        chartOptions: {
                            legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                            }
                        }
                        }]
                        }
                    };
                    Highcharts.chart('sma', highchartsObjectsma);
                    smastr+='1';
                }
                catch(err){
                    var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="sma-tab"> Error! Failed to get current stock data.</div>';
                    $('#sma-tab').replaceWith(text);
                }
                },function errormessage(response){
                var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="sma-tab"> Error! Failed to get current stock data.</div>';
                $('#sma-tab').replaceWith(text);
            });
        
        

            var url3 = "http://stockmarket.us-east-2.elasticbeanstalk.com/ema/"+name;
            var request = {
            method:'GET',
            url:url3,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
            $http(request).then(function success(response){
                try{
                    text = response.data;
                    var parent = text['Technical Analysis: EMA'];
                    var emaDates = [];
                    var emaValues = [];
                    for(var i = 130;i>=0;i--){
                        var emaDate = Object.keys(parent)[i];
                        emaDates.push(emaDate.substring(5,7)+"/"+emaDate.substring(8,10));
                        emaValues.push(parseFloat(parent[emaDate]['EMA']));
                    }
                    highchartsObjectema = {
                        chart: {
                            zoomType: 'xy',
                        },
                        title: {
                            text: 'Exponential Moving Average (EMA)'
                        },
                        subtitle: {
                            useHTML: true,
                            text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                        },
                        yAxis: {
                            title: {
                            text: 'EMA'
                            },
                        },
                        xAxis: {
                            categories:emaDates,
                            tickInterval:5
                        },
                        legend: {
                            enabled: true,
                            floating: true,
                            verticalAlign: 'bottom',
                            align:'center',
                            y:20
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                marker: {
                                    enabled: true,
                                    radius: 2,
                                    symbol: 'square'
                            }
                            }
                        },
                        series: [{
                            name: name,
                            data: emaValues
                        }],
                        responsive: {
                            rules: [{
                            condition: {
                            maxWidth: 500
                            },
                        chartOptions: {
                            legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                            }
                        }
                        }]
                        }
                };
                    Highcharts.chart('ema',highchartsObjectema);
                    emastr+='1';
                }
                catch(err){
                    var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="ema-tab"> Error! Failed to get current stock data.</div>';
                   $('#ema-tab').replaceWith(text);
                }
                },function errormessage(response){
                    var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="ema-tab"> Error! Failed to get current stock data.</div>';
                    $('#ema-tab').replaceWith(text);
            });

        
            var url4 = "http://stockmarket.us-east-2.elasticbeanstalk.com/stoch/"+name;
            var request = {
            method:'GET',
            url:url4,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
            $http(request).then(function success(response){
                try{
                    text = response.data;
                    var parent = text['Technical Analysis: STOCH'];
                    var smaDates = [];
                    var smaValues = [];
                    var stochValues = [];
                    for(var i = 130;i>=0;i--){
                        var stochDate = Object.keys(parent)[i];
                        smaDates.push(stochDate.substring(5,7)+"/"+stochDate.substring(8,10));
                        stochValues.push(parseFloat(parent[stochDate]['SlowD']));
                        smaValues.push(parseFloat(parent[stochDate]['SlowK']));
                    }
                    highchartsObjectstoch = {
                        chart: {
                            zoomType: 'xy',
                        },
                        title: {
                            text: 'Stochastic Oscillator(STOCH)'
                        },
                        subtitle: {
                            useHTML: true,
                            text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                        },
                        yAxis: {
                            title: {
                            text: 'STOCH'
                            },
                        },
                        xAxis: {
                            categories:smaDates,
                            tickInterval:5
                        },
                        legend: {
                            enabled: true,
                            floating: true,
                            verticalAlign: 'bottom',
                            align:'center',
                            y:20
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                marker: {
                                    enabled: true,
                                    radius: 2,
                                    symbol: 'square'
                                }
                            }
                        },
                        series: [{
                            name: name+' SlowK',
                            data: smaValues
                            },
                            {
                            name: name+' SlowD',
                            data: stochValues
                            }
                        ],
                        responsive: {
                            rules: [{
                                condition: {
                                maxWidth: 500
                                },
                                chartOptions: {
                                    legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                    }
                                }
                            }]
                        }
                };
                    Highcharts.chart('stoch', highchartsObjectstoch);
                    stochstr+='1';
                }
                catch(err){
                    var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="stoch-tab"> Error! Failed to get current stock data.</div>';
                    $('#stoch-tab').replaceWith(text);
                }
                },function errormessage(response){
                    var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="stoch-tab"> Error! Failed to get current stock data.</div>';
                    $('#stoch-tab').replaceWith(text);
            });

        
        
            var url5 = "http://stockmarket.us-east-2.elasticbeanstalk.com/rsi/"+name;
            var request = {
            method:'GET',
            url:url5,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
            $http(request).then(function success(response){
                try{
                    text = response.data;
                    var parent = text['Technical Analysis: RSI'];
                    var smaDates = [];
                    var smaValues = [];
                    for(var i = 130;i>=0;i--){
                        var rsiDate = Object.keys(parent)[i];
                        smaDates.push(rsiDate.substring(5,7)+"/"+rsiDate.substring(8,10));
                        smaValues.push(parseFloat(parent[rsiDate]['RSI']));
                    }
                    highchartsObjectrsi = {
                        chart: {
                            zoomType: 'xy',
                        },
                        title: {
                            text: 'Relative Strength Index (RSI)'
                        },
                        subtitle: {
                            useHTML: true,
                            text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                        },
                        yAxis: {
                            title: {
                            text: 'RSI'
                            },
                        },
                        xAxis: {
                            categories:smaDates,
                            tickInterval:5
                        },
                        legend: {
                            enabled: true,
                            floating: true,
                            verticalAlign: 'bottom',
                            align:'center',
                            y:20
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                marker: {
                                    enabled: true,
                                    radius: 2,
                                    symbol: 'square'
                                }
                            }
                        },
                        series: [{
                            name: name,
                            data: smaValues
                        }],
                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                },
                                chartOptions: {
                                    legend: {
                                        layout: 'horizontal',
                                        align: 'center',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            }]
                        }
                    };
                    Highcharts.chart('rsi', highchartsObjectrsi);
                    rsistr+='1';
                }
                catch(err){
                     var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="rsi-tab"> Error! Failed to get current stock data.</div>';
                     $('#rsi-tab').replaceWith(text);
                }
                },function errormessage(response){
                var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="rsi-tab"> Error! Failed to get current stock data.</div>';
                $('#rsi-tab').replaceWith(text);
            });
        
        

            var url6 = "http://stockmarket.us-east-2.elasticbeanstalk.com/adx/"+name;
            var request = {
            method:'GET',
            url:url6,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
            $http(request).then(function success(response){
                try{
                    text = response.data;
                    var parent = text['Technical Analysis: ADX'];
                    var smaDates = [];
                    var smaValues = [];
                    for(var i = 130;i>=0;i--){
                        var adxDate = Object.keys(parent)[i];
                        smaDates.push(adxDate.substring(5,7)+"/"+adxDate.substring(8,10));
                        smaValues.push(parseFloat(parent[adxDate]['ADX']));
                    }
                    highchartsObjectadx ={
                        chart: {
                            zoomType: 'xy',
                        },
                        title: {
                            text: 'Average Directional Movement Index (ADX)'
                        },
                        subtitle: {
                            useHTML: true,
                            text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                        },
                        yAxis: {
                            title: {
                            text: 'ADX'
                            },
                        },
                        xAxis: {
                            categories:smaDates,
                            tickInterval:5
                        },
                        legend: {
                            enabled: true,
                            floating: true,
                            verticalAlign: 'bottom',
                            align:'center',
                            y:20
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                marker: {
                                    enabled: true,
                                    radius: 2,
                                    symbol: 'square'
                                }
                            }
                        },
                        series: [{
                            name: name,
                            data: smaValues
                        }],
                        responsive: {
                            rules: [{
                                condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                            }]
                        }
                    }
                    Highcharts.chart('adx', highchartsObjectadx);
                    adxstr+='1';
                }
                catch(err){
                    var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="adx-tab"> Error! Failed to get current stock data.</div>';
                    $('#adx-tab').replaceWith(text);
                }
                },function errormessage(response){
                var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="adx-tab"> Error! Failed to get current stock data.</div>';
                $('#adx-tab').replaceWith(text);
            });
        
        
        

            var url7 = "http://stockmarket.us-east-2.elasticbeanstalk.com/cci/"+name;
            var request = {
            method:'GET',
            url:url7,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
        $http(request).then(function success(response){
            try{
                    text = response.data;
                    var parent = text['Technical Analysis: CCI'];
                    var smaDates = [];
                    var smaValues = [];
                    for(var i = 130;i>=0;i--){
                        var cciDate = Object.keys(parent)[i];
                        smaDates.push(cciDate.substring(5,7)+"/"+cciDate.substring(8,10));
                        smaValues.push(parseFloat(parent[cciDate]['CCI']));
                    }
                highchartsObjectcci = {
                        chart: {
                            zoomType: 'xy',
                        },
                        title: {
                            text: 'Commodity Channel Index (CCI)'
                        },
                        subtitle: {
                            useHTML: true,
                            text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                        },
                        yAxis: {
                            title: {
                                text: 'SMA'
                            },
                        },
                        xAxis: {
                            categories:smaDates,
                            tickInterval:5
                        },
                        legend: {
                            enabled: true,
                            floating: true,
                            verticalAlign: 'bottom',
                            align:'center',
                            y:20
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                marker: {
                                    enabled: true,
                                    radius: 2,
                                    symbol: 'square'
                                }
                            }
                        },
                        series: [{
                            name: name,
                            data: smaValues
                        }],
                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                },
                                chartOptions: {
                                    legend: {
                                        layout: 'horizontal',
                                        align: 'center',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            }]
                        }
                };
                    Highcharts.chart('cci', highchartsObjectcci);
                ccistr+='1';
            }
            catch(err){
                var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="cci-tab"> Error! Failed to get current stock data.</div>';
                $('#cci-tab').replaceWith(text);
            }
                },function errormessage(response){
            var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="cci-tab"> Error! Failed to get current stock data.</div>';
            $('#cci-tab').replaceWith(text);
        });

        
        
            var url8 = "http://stockmarket.us-east-2.elasticbeanstalk.com/bbands/"+name;
            var request = {
            method:'GET',
            url:url8,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
            $http(request).then(function success(response){
                try{
                    text = response.data;
                    var parent = text['Technical Analysis: BBANDS'];
                    var smaDates = [];
                    var upValue = [];
                    var midValue = [];
                    var downValue = [];
            
                    for(var i = 130;i>=0;i--){
                        var bbandsDate = Object.keys(parent)[i];
                        smaDates.push(bbandsDate.substring(5,7)+"/"+bbandsDate.substring(8,10));
                        upValue.push(parseFloat(parent[bbandsDate]['Real Upper Band']));
                        midValue.push(parseFloat(parent[bbandsDate]['Real Middle Band']));
                        downValue.push(parseFloat(parent[bbandsDate]['Real Lower Band']));
                    }
                     highchartsObjectbbands = {
                        chart: {
                            zoomType: 'xy',
                        },
                        title: {
                            text: 'Bollinger Bands (BBANDS)'
                        },
                        subtitle: {
                            useHTML: true,
                            text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                        },
                        yAxis: {
                            title: {
                            text: 'BBANDS'
                            },
                        },
                        xAxis: {
                            categories:smaDates,
                            tickInterval:5
                        },
                        legend: {
                            enabled: true,
                            floating: true,
                            verticalAlign: 'bottom',
                            align:'center',
                            y:40
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                marker: {
                                    enabled: true,
                                    radius: 2,
                                    symbol: 'square'
                                }
                            }
                        },
                        series: [
                        {
                            name: name+' Real Middle Band',
                            data: midValue
                        },
                        {
                            name: name+' Real Upper Band',
                            data: upValue
                        },
                        {
                            name: name+' Real Lower Band',
                            data: downValue
                        }],
                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                },
                                chartOptions: {
                                    legend: {
                                        layout: 'horizontal',
                                        align: 'center',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            }]
                        }
                };
                    Highcharts.chart('bbands', highchartsObjectbbands);
                    bbandsstr+='1';
                }
                catch(err){
                     var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="bbands-tab"> Error! Failed to get current stock data.</div>';
                    $('#bbands-tab').replaceWith(text);
                }
                },function errormessage(response){
                var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="bbands-tab"> Error! Failed to get current stock data.</div>';
                    $('#bbands-tab').replaceWith(text);
            });

        
        
            var url9 = "http://stockmarket.us-east-2.elasticbeanstalk.com/macd/"+name;
            var request = {
            method:'GET',
            url:url9,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
            $http(request).then(function success(response){
                try{
                    text = response.data;
                    var parent = text['Technical Analysis: MACD'];
                    var smaDates = [];
                    var upValue = [];
                    var midValue = [];
                    var downValue = [];
            
                    for(var i = 130;i>=0;i--){
                        var macdDate = Object.keys(parent)[i];
                        smaDates.push(macdDate.substring(5,7)+"/"+macdDate.substring(8,10));
                        upValue.push(parseFloat(parent[macdDate]['MACD_Hist']));
                        midValue.push(parseFloat(parent[macdDate]['MACD']));
                        downValue.push(parseFloat(parent[macdDate]['MACD_Signal']));
                    }
                 highchartsObjectmacd = {
                        chart: {
                            zoomType: 'xy',
                        },
                        title: {
                            text: 'Moving Average Convergence/Divergence (MACD)'
                        },
                        subtitle: {
                            useHTML: true,
                            text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                        },
                        yAxis: {
                            title: {
                            text: 'MACD'
                            },
                        },
                        xAxis: {
                            categories:smaDates,
                            tickInterval:5
                        },
                        legend: {
                            enabled: true,
                            floating: true,
                            verticalAlign: 'bottom',
                            align:'center',
                            y:20
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                marker: {
                                    enabled: true,
                                    radius:2,
                                    symbol: 'square'
                                }   
                            }
                        },

                    series: [
                        {
                            name: name+' MACD',
                            data: midValue
                        },
                        {
                            name: name + ' MACD_Hist',
                            data: upValue
                        },
                        {
                            name: name + ' MACD_Signal',
                            data: downValue
                        }],
                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                },
                                chartOptions: {
                                    legend: {
                                        layout: 'horizontal',
                                        align: 'center',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            }]
                        }
                };
                    Highcharts.chart('macd',highchartsObjectmacd );
                    macdstr+='1';
                }
                catch(err){
                      var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="macd-tab"> Error! Failed to get current stock data.</div>';
                        $('#macd-tab').replaceWith(text);
                }
                },function errormessage(response){
                var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="macd-tab"> Error! Failed to get current stock data.</div>';
                    $('#macd-tab').replaceWith(text);
            });

        
        
            var url10 = "http://stockmarket.us-east-2.elasticbeanstalk.com/news/"+name;
            var request = {
            method:'GET',
            url:url10,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Credentials':'true'
                },
            }
            $http(request).then(function success(response){
                try{
                    var json = response.data;
                    json = json['rss']['channel'][0].item;
                    var i;
                    var j = 0;
                    for(i=0;i<json.length;i++){
                        if (j==5) {
                            break;
                        }
                        if(json[i].link[0].includes("article")){
                            if(j==0){
                            jQuery('#menu2').html('');}
                            var text = "";
                            text = ('<div class ="well" style="background-color: #F0F0F0;width:90%;margin-top:2%;margin-left:2%">');
                            text +="<a target='_blank' href='"+json[i].link[0]+"'>" + json[i].title +"</a><br><br><br>";
                            text +="<span><b>Author: "+ json[i]['sa:author_name'][0] +"</span></b><br><br>";
                            var dt = new Date(json[i]['pubDate'][0]);
                            text +="<span><b>Date: "+ moment(dt).tz('America/New_York').format('ddd,DD MMM YYYY HH:mm:ss z') +"</span></b>";
                            text +="</div>";
                            $("#menu2").append(text);
                            j++;
                        }
                    }}
                catch(err){
                       var textmassage = '<div style="color:#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="menu2-tab"> Error! Failed to get current stock data.</div>';
                    $('#menu2-tab').replaceWith(textmassage);
                }
                },function errormessage(response){
                var text = '<div style="color:	#e60000;background-color: #ECD2D3;border-radius: 4px;border: 0.5px solid 	#e60000;padding: 10px 40px;margin-top:40px;margin-left:20px;margin-right:20px" id="menu2-tab"> Error! Failed to get current stock data.</div>';
                $('#menu2-tab').replaceWith(text);
            });
        }
    $scope.favlist = function(){
            if(localStorage[favArr[0]] ==  null){
                localStorage.setItem(favArr[0], JSON.stringify(favArr));
                $('.glyphicon-star-empty').toggleClass('glyphicon-star-empty glyphicon-star');
                $("#mybutton").css("color", "yellow");
            }else{
                localStorage.removeItem(favArr[0]);
                $('.glyphicon-star').toggleClass('glyphicon-star glyphicon-star-empty');
                $("#mybutton").css("color", "black");
            }
            printTable();
        $('.trashbutton').click(function(e){
            var atr = $(this).attr('id');
            localStorage.removeItem(atr);
            $(this).closest('tr').remove();
        })
        
    }
    // clear all result, and clear input box
    $scope.myClearFunc = function(){
        printLoadingBar();
        $("#errorhandle").css("visibility", "hidden");
        $("#slideRight").prop('disabled', true);
        $("md-autocomplete").css("border","");
        self.searchText ="";
        $scope.myValue=false;
        $scope.values=true;
        text1 = ' <div id="stocktableTab" class="tab-pane fade in active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div>'
        $('#stocktableTab').html('');
        $("#stocktableTab").replaceWith(text1);
        $('.trashbutton').click(function(e){
            var atr = $(this).attr('id');
            localStorage.removeItem(atr);
            $(this).closest('tr').remove();
        })
        window.location.reload();
    }
    // print table content
    function printTable(){
        var i=0;
        var text = "";
        keys = Object.keys(localStorage);
        text += ('<table class="table table-striped" id="table-section" style="width:90%"><tr><th>Symbol</th><th>Stock Price</th><th>Change(Change Percent)</th><th>Volume</th><th></th></tr>');
        for(i=0;i<keys.length;i++){
            var arr = JSON.parse(localStorage.getItem(keys[i]));
            text +=('<tr id="'+arr[0]+'1mytableinfo"><td>'+'<a href="" ng-click="getQuote(\''+arr[0]+'\')">'+arr[0]+'</a></td><td class="priceinfomation" >'+arr[1]+'</td>');
            if(arr[2]>0){
                text +=('<td style="color:green" class="changetab">'+arr[2]+'('+arr[3]+'%)'+'<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Up.png" class="myimg"></td>');
            }else{
                text +=('<td style="color:red" class="changetab">'+arr[2]+'('+arr[3]+'%)'+'<img src="http://cs-server.usc.edu:45678/hw/hw8/images/Down.png" class="myimg"></td>');
            }
            text +=('<td class="volumetab">'+arr[4]+'</td>'+'<td><button class="trashbutton" id="'+arr[0]+'" ng-click="myFunction()"><i class ="glyphicon glyphicon-trash"></i></button></td></tr>');
        }
        text +='</table>';
        $('#table-section').replaceWith($compile(text)($scope));
    }
    // take the input infromation
    function querySearch(query) {
        var text ={};
        if (!query.replace(/\s/g, '').length) {
            $("#errorhandle").css("visibility", "visible");
            $("md-autocomplete").css("border","1px solid red");
            $scope.mydisabled= true;
        }
        else{
            $("#errorhandle").css("visibility", "hidden");
            $("md-autocomplete").css("border","1px solid blue");
            $scope.mydisabled= false;
                var url = "http://stockmarket.us-east-2.elasticbeanstalk.com/auto/";
                url +=query;
                var request = {
                    method:'GET',
                    url:url,
                    headers:{
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Credentials':'true'
                    },
                }
                var text = $http(request).then(function success(response){
                    text = response.data;
                    return text;
                },function errormessage(response){});
                }
        return text;
    }
    // controller for input bar
    function getfocus(text){
        if (!text.replace(/\s/g, '').length && (text.length==0)) {
            $("md-autocomplete").css("border","1px solid blue");
            $("#errorhandle").css("visibility", "hidden");
            $scope.mydisabled= true;
        }
    }
    function changetext(text){
        if (!text.replace(/\s/g, '').length&& text.length>0) {
            $("#errorhandle").css("visibility", "visible");
            $("md-autocomplete").css("border","1px solid red");
            $scope.mydisabled= true;
        } else if(text.length=0){
            $scope.mydisabled= false;
        }
        else{
            $("#errorhandle").css("visibility", "hidden");
            $("md-autocomplete").css("border","1px solid blue");
            $scope.mydisabled= false;}
    }
    function getblur(text){
        if(!text.replace(/\s/g, '').length) {
            $("md-autocomplete").css("border","1px solid red");
            $("#errorhandle").css("visibility", "visible");
            $scope.mydisabled= true;
        }else{
            $("md-autocomplete").css("border","");
        }}
    // when information was not there, loading the load bar and show user information is processing
    function printLoadingBar(){
    text1 ='<div id="stocktableTab" class="tab-pane fade in active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text2='<div id="price" class="tab-pane fade in active"><div id="price-tab" class="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div>';
    text3='<div id="sma" class="tab-pane fade"><div id="sma-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text4 ='<div id="ema" class="tab-pane fade"><div id="ema-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text5='<div id="stoch" class="tab-pane fade"><div id="stoch-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text6='<div id="rsi" class="tab-pane fade"><div id="rsi-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text7 ='<div id="adx" class="tab-pane fade"><div id="adx-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text8='<div id="cci" class="tab-pane fade"><div id="cci-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text9='<div id="bbands" class="tab-pane fade"><div id="bbands-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text10 ='<div id="macd" class="tab-pane fade"><div id="macd-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text11='<div id="menu1" class="tab-pane fade"><div id="menu1-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    text12='<div id="menu2" class="tab-pane fade"><div id="menu2-tab" class ="active progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width:40%"></div></div></div>';
    $('#stocktableTab').replaceWith(text1);
    $("#price").replaceWith(text2);
    $('#sma').replaceWith(text3);
    $('#ema').replaceWith(text4);
    $('#stoch').replaceWith(text5);
    $('#rsi').replaceWith(text6);
    $('#adx').replaceWith(text7);
    $('#cci').replaceWith(text8);
    $('#bbands').replaceWith(text9);
    $('#macd').replaceWith(text10);
    $('#menu1').replaceWith(text11);
    $('#menu2').replaceWith(text12);
}
        });

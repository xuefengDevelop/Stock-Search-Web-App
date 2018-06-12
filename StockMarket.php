<HTML>
    <HEAD>
        <style>
            #first_section {
                background-color: #F5F5F5;
                width: 400px;
                height:170px;
                border: 2px solid #E4E4E4;
                margin:0 auto;
                text-align: center;
            }
            .clear{
                clear:both
            }
            #searchLabel {
                font-family: "Times New Roman", Times, serif;
                font-size: 30px;
            }
            #fs {
                margin-top: 15px;
                text-align: left;
            }
            #left {
                float: left;
                text-align:right;
                font-size: 17px;
            }
            #right {
                float: left;
                text-align: left;
            }
            hr{
                border-top: 1px solid #ccc;
                margin-right: 2%;
                margin-left: 2%;
            }
            #tableInfo {
                margin-top:10px;
                margin-right: 15%;
                margin-left: 15%;
            }
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
                }

            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            td:nth-child(odd) {
                background-color: #F5F5F5;
                border: 1px solid #dddddd;
                width:40%;
                font-size: 12px;
            }
            a, u {
                text-decoration: none;
            }
            td:nth-child(even) {
                text-align: center;
                font-size: 12px;
            }
            #img1,#img2 {
                width:10px;
                height:10px;
            }
            #img3,#img4{
                width:40px;
                height:20px;
            }
            #container {
	           margin-top:10px;
               margin-right: 15%;
               margin-left: 15%;
               border: 1px solid #dddddd;
            }
            #footerTop {
                margin: 0 auto;
                text-align: center;
            }
            #search{
                border: 1px solid #ccc;
                border-radius: 6px;
                background-color:white;
                margin-top: 4px;
                height:20px;width:50px;
                outline:none;
            }
            #clear {
                border: 1px solid #ccc;
                border-radius: 6px;
                background-color:white;
                margin-top: 4px;
                margin-left:2px;
                height:20px;width:50px;
                outline:none;
            }
            #textSection {
                font-family: "Times New Roman", Times, serif;
                font-size: 17px;
            }
            #errMessageLog {
                margin-right: 15%;
                margin-left: 15%;
                margin-top:10px;
            }
            a:hover {
                color: black;
            }
            #footerTop {
                margin-right: 15%;
                margin-left: 15%;
            }
            .imagetext1 {
                color: #BFBFBF;
            }
            #arrow {
                margin-top:10px;
            }
            #newsDiv{
                margin-top:10px;
            }
        </style>
    </HEAD>
    <BODY>
        <div id = "first_section">
            <span id ="searchLabel"><i><b>Stock Search</b></i></span>
                <hr id="line">
                    <div id = "fs">
                    <FORM ACTION=""  METHOD=POST id ="myForm">
                        <div id = 'left'> &nbsp Enter Stock Ticker Symbol:*</div> <div id ='right'><INPUT id='input' NAME=input value="<?php echo isset($_POST['input']) ? $_POST['input'] : '' ?>"><BR>
                        <INPUT TYPE=submit name="Search" value="Search" id ="search">
                        <INPUT TYPE=button name="Clear" value="Clear" id ="clear" onclick='clear_div()'>
                        </div>
                        <br><br>    
                    </FORM>
                        <div id= 'textSection'>
                        <i>&nbsp * - Mandatory fields.</i></div>
                 </div>
        </div>
        <?php $nameErr = $response = "";
            if(isset($_POST["Search"])):
                if (empty($_POST["input"])) {
                    $nameErr = "Please enter a symbol";
                    echo "<script type='text/javascript'>";
                        echo "alert('Name is required')";
                    echo "</script>";
                    } 
                else { ?>
        <div id = "second_section">
            <?php
                    $response = $_POST["input"] ;
                    $url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$response."&outputsize=full&apikey=OBP218MBW0GD75W2";
                    error_reporting(0);
                    $content = file_get_contents($url,true);
                    $jsonData = json_decode($content,true);
                    if($content === FALSE || strcmp(array_keys($jsonData)[0],"Error Message")===0){
                       echo "<div id='errMessageLog'><table>
                            <tr>
                            <td>Error</td>
                            <td>Error: NO record has been found, please enter a valid symbol</td>
                            </tr></table></div>";
                    } else {
                        $jsonData = json_decode($content,true);
                        $jsonData = json_decode(file_get_contents($url),true);
                        date_default_timezone_set('US/Eastern');
                        $keys = array_keys($jsonData['Time Series (Daily)']);  
                        $curDate = $keys[0];
                        $preDate = $keys[1];
                        $open = $jsonData['Time Series (Daily)'][$curDate]['1. open'];
                        $high = $jsonData['Time Series (Daily)'][$curDate]['2. high'];
                        $low = $jsonData['Time Series (Daily)'][$curDate]['3. low'];
                        $close = $jsonData['Time Series (Daily)'][$curDate]['4. close'];
                        $volume = $jsonData['Time Series (Daily)'][$curDate]['5. volume'];
                        $volume = number_format($volume);
                        $perClose =  $jsonData['Time Series (Daily)'][$preDate]['4. close'];
                        $change =number_format( $close - $perClose, 2, '.', '');
                        if($change>0) {
                            $image = "<image src='http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png' id='img1'>";
                        } else if($change == 0) {
                            $image ="";
                        } else {
                            $image = "<image src='http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png' id='img2'>";
                        }
                        $changePercent = number_format($change/$perClose * 100, 2, '.', '') . '%';
                        $dayRange = $high."-".$low;
                        $prices = array();
                        $maxValue = 0;
                    for($x = 130; $x >=0; $x--){
                        $prices[$x] = $jsonData['Time Series (Daily)'][$keys[$x]]['4. close'];
                        $dates[$x] = substr($keys[$x],5,2).'/'.substr($keys[$x],8,2);
                        $volumns[$x] = $jsonData['Time Series (Daily)'][$keys[$x]]['5. volume'];
                    }
                    echo "<div id = 'tableInfo'><table>
                            <tr>
                                <td><b>Stock Ticker Symbol</b></td>
                                <td>".$response."</td>
                            </tr>
                            <tr>
                                <td><b>Close</b></td>
                                <td>".$close."</td>
                            </tr>
                            <tr>
                                <td><b>Open</b></td>
                                <td>".$open."</td>
                            </tr>
                            <tr>
                                <td><b>Pervious Close</b></td>
                                <td>".$perClose."</td>
                            </tr>
                            <tr>
                                <td><b>Change</b></td>
                                <td>".$change." ".$image."</td>
                            </tr>
                            <tr>
                                <td><b>Change Percent</b></td>
                                <td>".$changePercent." ".$image."</td>
                            </tr>
                            <tr>
                                <td><b>Day's Range</b></td>
                                <td>".$dayRange."</td>
                            </tr>
                            <tr>
                                <td><b>Volume</b></td>
                                <td>".$volume."</td>
                            </tr>
                            <tr>
                                <td><b>Timestamp</b></td>
                                <td>".$curDate."</td>
                            </tr>
                            <tr>
                                <td><b>Indicators</b></td>
                                <td><a href='javascript:priceButton();'>Price &nbsp</a> <a href='javascript:smaButton();'>SMA &nbsp  </a> <a href='javascript:emaButton();'>EMA &nbsp </a> <a href='javascript:stochButton();'>STOCH &nbsp </a> <a href='javascript:rsiButton();'>RSI &nbsp </a> <a href='javascript:adxButton();'>ADX &nbsp </a> <a href='javascript:cciButton();'>CCI &nbsp </a> <a href='javascript:bbandsButton();'>BBANDS &nbsp </a> <a href='javascript:macdButton();'>MACD &nbsp</a></td>
                            </tr>
                        </table></div>";
        ?>
            <div id="container"></div>
            <div id ="footerTop">
                <span><p onclick="footerFunction(1)" class = "imagetext1"> click to show stock news</p><span>
                <div id = "arrow">
                    <img src = "http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png" id="img3" onclick="javascript:footerFunction(1)">
                </div>
            </div>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <?php 
            $newsurl = "https://seekingalpha.com/api/sa/combined/".$response.".xml";
            $newsXml = file_get_contents($newsurl);
            $newsXml = simplexml_load_string($newsXml);
            $json = json_encode($newsXml);
            $newsArray = json_decode($json,TRUE);
            $newsArr = $newsArray[channel][item];
            $arrLength = count($newsArr);
            $newsCount = 0;
            for($x = 0; $x <$arrLength; $x++){
                $a = $newsArr[$x];
                if (strpos($a[link], 'article') !== false) {
                    $links[$newsCount] = (string)$a[link];
                    $titles[$newsCount] = (string)$a[title];
                    $pubDates[$newsCount] = date("D,j M Y G:i:s",strtotime((string)$a[pubDate]));
                    $newsCount++;
                    if($newsCount == 5){
                        break;}
                }
                json_encode($links);
                json_encode($titles);
                json_encode($pubDates);
            }?>
        <script>
            function clear_div() {
                document.getElementById("second_section").innerHTML = "";
                document.getElementById("input").value ="";
            }
                var imageText = "<span><p onclick='footerFunction(2)' class = 'imagetext1'> click to hide stock news</p></span><div id = 'arrow'><img src = 'http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Up.png' onclick='javascript:footerFunction(2)' id ='img4'>";
                var jsLinks = <?php echo json_encode($links );?>;
                var jsTitles =<?php echo json_encode($titles );?>;
                var jsPubDates=<?php echo json_encode($pubDates );?>;
                imageText+="<div id ='newsDiv'><table>"
                for(var i=0;i<jsLinks.length;i++){
                     imageText+=  "<tr><td><a target='_blank' href='"+jsLinks[i]+"'>"+jsTitles[i]+"</a> &nbsp &nbsp &nbsp Publicated Time:"+jsPubDates[i]+"</td></tr>";
                };
                imageText+="</table></div></div>"
            
                function footerFunction(num){
                    if(num == 1){
                        document.getElementById("footerTop").innerHTML = imageText;
                    }
                    if(num ==2) {
                        document.getElementById("footerTop").innerHTML = "<span><p onclick='footerFunction(1)' class = 'imagetext1'> click to show stock news</p></span><div id = 'arrow'><img src = 'http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png' onclick='javascript:footerFunction(1)' id ='img3'></div>";}
                    }
            Highcharts.chart('container', {
                chart: {
                    zoomType: 'xy',
                },
                title: {
                    text: 'Stock Price(<?php echo substr($curDate,5,2)."/".substr($curDate,8,2)."/".substr($curDate,0,4) ?>)'
                },
                subtitle: {
                    useHTML: true,
                    text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                },
                xAxis: [{
                    categories:[<?php for($i = count($dates)-1; $i >= 0; $i--){ echo "'".$dates[$i]."'"; echo ",";} ?>],
                    tickInterval:5
                }],
                yAxis: [{
                    title: {
                        text: '<?php echo "Stock Price"?>'
                    }
                },
                {
                title: {
                    text: '<?php echo " Volume" ?>',
                },
                tickInterval: 80000000,
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
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [{
            name: '<?php echo $response ?>',
            type: 'area',
            yAxis: 0,
            fillColor: '#F09292',
            lineColor:'#ff4d4d',
            color:'#ff4d4d',
            lineWidth: 1,
            threshold: null,
            data: [<?php echo join($prices, ',')?>],
            }, {
            name: '<?php echo $response." Volume" ?>',
            type: 'column',
            yAxis: 1,
            color:'	White',
            data: [<?php echo join($volumns, ',')?>]
        }]
    });
    function priceButton(){
        Highcharts.chart('container', {
                chart: {
                    zoomType: 'xy',
                },
                title: {
                    text: 'Stock Price(<?php echo substr($curDate,5,2)."/".substr($curDate,8,2)."/".substr($curDate,0,4) ?>)'
                },
                subtitle: {
                    useHTML: true,
                    text: '<a target="_blank" href="https://www.alphavantage.co/" style="color:#0000EE;">Source: Alpha Vantage</a>'
                },
                xAxis: [{
                    categories:[<?php for($i = count($dates)-1; $i >= 0; $i--){ echo "'".$dates[$i]."'"; echo ",";} ?>],
                    tickInterval:5
                }],
                yAxis: [{
                    title: {
                        text: '<?php echo "Stock Price"?>'
                    }
                },
                {
                title: {
                    text: '<?php echo " Volume" ?>',
                },
                tickInterval: 80000000,
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
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [{
            name: '<?php echo $response ?>',
            type: 'area',
            yAxis: 0,
            fillColor: '#F09292',
            lineColor:'#ff4d4d',
            color:'#ff4d4d',
            lineWidth: 1,
            threshold: null,
            data: [<?php echo join($prices, ',')?>],
            }, {
            name: '<?php echo $response." Volume" ?>',
            type: 'column',
            yAxis: 1,
            color:'	White',
            data: [<?php echo join($volumns, ',')?>]
        }]
    });
    }
    function smaButton(){
        var url = "https://www.alphavantage.co/query?function=SMA&symbol="+ '<?php echo $response ?>'+ "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2";
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url,true);
        oReq.send();
        text ="";
        function reqListener(){
            text = JSON.parse(this.responseText);
            var parent = text['Technical Analysis: SMA'];
            var smaDates = [];
            var smaValues = [];
            for(var i = 130;i>=0;i--){
                var smaDate = Object.keys(parent)[i];
                smaDates.push(smaDate.substring(5,7)+"/"+smaDate.substring(8,10));
                smaValues.push(parseFloat(parent[smaDate]['SMA']));
            }
            Highcharts.chart('container', {
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
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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
                name: '<?php echo $response ?>',
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
        });
        }
    }
    function emaButton(){
        var url = "https://www.alphavantage.co/query?function=EMA&symbol="+ '<?php echo $response ?>'+ "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2";
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url,true);
        oReq.send();
        text ="";
        function reqListener(){
            text = JSON.parse(this.responseText);
            var parent = text['Technical Analysis: EMA'];
            var smaDates = [];
            var smaValues = [];
            for(var i = 130;i>=0;i--){
                var smaDate = Object.keys(parent)[i];
                smaDates.push(smaDate.substring(5,7)+"/"+smaDate.substring(8,10));
                smaValues.push(parseFloat(parent[smaDate]['EMA']));
            }
            Highcharts.chart('container', {
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
                categories:smaDates,
                tickInterval:5
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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
                name: '<?php echo $response ?>',
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
        });
        }
    }
    function stochButton(){
        var url = "https://www.alphavantage.co/query?function=STOCH&symbol="+ '<?php echo $response ?>'+ "&interval=daily&slowkmatype=1&slowdmatype=1&apikey=OBP218MBW0GD75W2";
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url,true);
        oReq.send();
        text ="";
        function reqListener(){
            text = JSON.parse(this.responseText);
            var parent = text['Technical Analysis: STOCH'];
            var smaDates = [];
            var smaValues = [];
            var stochValues = [];
            for(var i = 130;i>=0;i--){
                var smaDate = Object.keys(parent)[i];
                smaDates.push(smaDate.substring(5,7)+"/"+smaDate.substring(8,10));
                stochValues.push(parseFloat(parent[smaDate]['SlowD']));
                smaValues.push(parseFloat(parent[smaDate]['SlowK']));
            }
            Highcharts.chart('container', {
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
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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
                name: '<?php echo $response.' SlowK' ?>',
                data: smaValues
            },
            {
                name: '<?php echo $response.' SlowD' ?>',
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
        });
        }
    }
    function rsiButton(){
                var url = "https://www.alphavantage.co/query?function=RSI&symbol="+ '<?php echo $response ?>'+ "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2";
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url,true);
        oReq.send();
        text ="";
        function reqListener(){
            text = JSON.parse(this.responseText);
            var parent = text['Technical Analysis: RSI'];
            var smaDates = [];
            var smaValues = [];
            for(var i = 130;i>=0;i--){
                var smaDate = Object.keys(parent)[i];
                smaDates.push(smaDate.substring(5,7)+"/"+smaDate.substring(8,10));
                smaValues.push(parseFloat(parent[smaDate]['RSI']));
            }
            Highcharts.chart('container', {
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
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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
                name: '<?php echo $response ?>',
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
        });
        }
    }
    function adxButton(){
        var url = "https://www.alphavantage.co/query?function=ADX&symbol="+ '<?php echo $response ?>'+ "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2";
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url,true);
        oReq.send();
        text ="";
        function reqListener(){
            text = JSON.parse(this.responseText);
            var parent = text['Technical Analysis: ADX'];
            var smaDates = [];
            var smaValues = [];
            for(var i = 130;i>=0;i--){
                var smaDate = Object.keys(parent)[i];
                smaDates.push(smaDate.substring(5,7)+"/"+smaDate.substring(8,10));
                smaValues.push(parseFloat(parent[smaDate]['ADX']));
            }
            Highcharts.chart('container', {
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
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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
                name: '<?php echo $response ?>',
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
        });
        }
    }
    function cciButton(){
        var url = "https://www.alphavantage.co/query?function=CCI&symbol="+ '<?php echo $response ?>'+ "&interval=daily&time_period=10&apikey=OBP218MBW0GD75W2";
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url,true);
        oReq.send();
        text ="";
        function reqListener(){
            text = JSON.parse(this.responseText);
            var parent = text['Technical Analysis: CCI'];
            var smaDates = [];
            var smaValues = [];
            for(var i = 130;i>=0;i--){
                var smaDate = Object.keys(parent)[i];
                smaDates.push(smaDate.substring(5,7)+"/"+smaDate.substring(8,10));
                smaValues.push(parseFloat(parent[smaDate]['CCI']));
            }
            Highcharts.chart('container', {
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
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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
                name: '<?php echo $response ?>',
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
        });
        }
    }
    function bbandsButton(){
       var url = "https://www.alphavantage.co/query?function=BBANDS&symbol="+ '<?php echo $response ?>'+ "&interval=daily&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=OBP218MBW0GD75W2";
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url,true);
        oReq.send();
        text ="";
        function reqListener(){
            text = JSON.parse(this.responseText);
            var parent = text['Technical Analysis: BBANDS'];
            var smaDates = [];
            var upValue = [];
            var midValue = [];
            var downValue = [];
            
            for(var i = 130;i>=0;i--){
                var smaDate = Object.keys(parent)[i];
                smaDates.push(smaDate.substring(5,7)+"/"+smaDate.substring(8,10));
                upValue.push(parseFloat(parent[smaDate]['Real Upper Band']));
                midValue.push(parseFloat(parent[smaDate]['Real Middle Band']));
                downValue.push(parseFloat(parent[smaDate]['Real Lower Band']));
            }
            Highcharts.chart('container', {
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
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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
                name: '<?php echo $response.' Real Middle Band' ?>',
                data: midValue
            },
            {
                name: '<?php echo $response.' Real Upper Band' ?>',
                data: upValue
            },
            {
                name: '<?php echo $response.' Real Lower Band' ?>',
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
        });
        }
    }
    function macdButton(){
              var url = "https://www.alphavantage.co/query?function=MACD&symbol="+ '<?php echo $response ?>'+ "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2";
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url,true);
        oReq.send();
        text ="";
        function reqListener(){
            text = JSON.parse(this.responseText);
            var parent = text['Technical Analysis: MACD'];
            var smaDates = [];
            var upValue = [];
            var midValue = [];
            var downValue = [];
            
            for(var i = 130;i>=0;i--){
                var smaDate = Object.keys(parent)[i];
                smaDates.push(smaDate.substring(5,7)+"/"+smaDate.substring(8,10));
                upValue.push(parseFloat(parent[smaDate]['MACD_Hist']));
                midValue.push(parseFloat(parent[smaDate]['MACD']));
                downValue.push(parseFloat(parent[smaDate]['MACD_Signal']));
            }
            Highcharts.chart('container', {
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
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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
                name: '<?php echo $response.' MACD' ?>',
                data: midValue
            },
            {
                name: '<?php echo $response.' MACD_Hist' ?>',
                data: upValue
            },
            {
                name: '<?php echo $response.' MACD_Signal' ?>',
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
        });
        }  
    }
    <?php }} endif; ?>
    </script>
</BODY>
</HTML>
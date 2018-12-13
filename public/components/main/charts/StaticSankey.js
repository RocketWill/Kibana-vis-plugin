import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';  
import echarts from 'echarts/lib/echarts';
import 'echarts';
export default class StaticSankey {
    static create() {
        var elasticsearch = require('elasticsearch-browser/elasticsearch.js');
        var client2 = new elasticsearch.Client({
            host: 'localhost:9200'
          });
          var res = client2.search({
            index: 'sankeytest6',
              size: 1000,
              body: {
                //聚合
                "aggs" : {
                  "table": {
                    "composite" : {
                      "size": 1000,
                      "sources": [
                        {"stk1": {"terms": {"field": "src.keyword"}}},
                        {"stk2": {"terms": {"field": "mid.keyword"}}},
                        {"stk3": {"terms": {"field": "des.keyword"}}}
                      ]
                    }
                  } 
                }
              }
          }).then(function (body) {
            var sankey = body.aggregations.table.buckets;
            console.log(sankey);
            //創建繪製的json格式
            var sankeyJson = {nodes:[],links:[]};

            
            
            var item;

            var compute = []
            for(item in sankey){
              var temp=[];
              temp.push(sankey[item]["key"]["stk1"]);
              temp.push(sankey[item]["key"]["stk2"]);
              temp.push(sankey[item]["key"]["stk3"]);
              temp.push(sankey[item]["doc_count"]);
              compute.push(temp);
            }


            var stk1tostk2 = [];
            var tempStore1to2 = [];
            for(var i=0;i<compute.length;i++){
              var tempStr1=compute[i][0];
              var tempStr2 = compute[i][1];
              var tempStr = tempStr1+tempStr2
              //console.log(tempStr1);
              if (tempStore1to2.includes(tempStr) == false){
                tempStore1to2.push(tempStr);
                var tempArr = [];
                var value = compute[i][3];
                tempArr.push(compute[i][0]);
                tempArr.push(compute[i][1]);
                //tempArr.push(compute[item][3]);
                
                if (i != compute.length-1){
                  for (var j=i+1;j<=compute.length-1;j++){
                    //var tempSecondStr = compute[i][0]+compute[i][1];
                    var tempSecondStr = compute[j][0]+compute[j][1];
                    
                    //console.log(tempSecondStr);
                    if (tempStr == tempSecondStr){
                      value = value+compute[j][3];
                      //console.log(value);
                    }
                    
                  }
                }
                tempArr.push(value);
                stk1tostk2.push(tempArr);
              }
            }

            console.log(stk1tostk2);
            
            var stk2tostk3 = [];
            var tempStore1to3 = [];
            for(var i=0;i<compute.length;i++){
              var tempStr1=compute[i][1];
              var tempStr2 = compute[i][2];
              var tempStr = tempStr1+tempStr2
              //console.log(tempStr1);
              if (tempStore1to3.includes(tempStr) == false){
                tempStore1to3.push(tempStr);
                var tempArr = [];
                var value = compute[i][3];
                tempArr.push(compute[i][1]);
                tempArr.push(compute[i][2]);
                //tempArr.push(compute[item][3]);
                
                if (i != compute.length-1){
                  for (var j=i+1;j<=compute.length-1;j++){
                    //var tempSecondStr = compute[i][0]+compute[i][1];
                    var tempSecondStr = compute[j][1]+compute[j][2];
                    
                    //console.log(tempSecondStr);
                    if (tempStr == tempSecondStr){
                      value = value+compute[j][3];
                      //console.log(value);
                    }
                    
                  }
                }
                tempArr.push(value);
                stk2tostk3.push(tempArr);
              }
            }

            //console.log(stk2tostk3);

            
            var nameArr = [];
            for(item in sankey){
              
              if (nameArr.includes(sankey[item]["key"]["stk1"]) == false){
                nameArr.push(sankey[item]["key"]["stk1"]);
              }
              if (nameArr.includes(sankey[item]["key"]["stk2"]) == false){
                nameArr.push(sankey[item]["key"]["stk2"]);
              }
              if (nameArr.includes(sankey[item]["key"]["stk3"]) == false){
                nameArr.push(sankey[item]["key"]["stk3"]);
              }
            }
        
            var itemNode;
            for(itemNode in nameArr){
              sankeyJson.nodes.push({"name":nameArr[itemNode]})
            }
        
            var linkSrcArr = [];
            var linkMidArr = [];
            var linkDesArr = [];
            var linkValueArr = [];
            
            for(itemNode in sankey){
              linkSrcArr.push(sankey[itemNode]["key"]["stk1"]);
              linkMidArr.push(sankey[itemNode]["key"]["stk2"]);
              linkDesArr.push(sankey[itemNode]["key"]["stk3"]);
              linkValueArr.push(sankey[itemNode]["doc_count"])
            }
        
            for(itemNode in stk1tostk2){
              sankeyJson.links.push({"source":stk1tostk2[itemNode][0],"target":stk1tostk2[itemNode][1],"value":stk1tostk2[itemNode][2]});
            }
            
            for(itemNode in stk2tostk3){
              sankeyJson.links.push({"source":stk2tostk3[itemNode][0],"target":stk2tostk3[itemNode][1],"value":stk2tostk3[itemNode][2]});
            }

            //console.log(sankeyJson);

            var mySankey = echarts.init(document.getElementById('sankey'));
            
            //數據總量
            var totalDataNumber = 0;
            for(item in stk1tostk2){
              totalDataNumber = totalDataNumber+stk1tostk2[item][2];
            }

            //個節點總數
            var totalNodeNumber = {};
            var tempNodeNumber = [];
            for (var i=0; i<stk1tostk2.length; i++){
              if(tempNodeNumber.includes(stk1tostk2[i][0]) == false){
                tempNodeNumber.push(stk1tostk2[i][0]);
                var singleNodeNumber = stk1tostk2[i][2];

                if (i != stk1tostk2.length-1){
                  for(var j=i+1; j<stk1tostk2.length; j++){
                    if (stk1tostk2[i][0] == stk1tostk2[j][0]){
                      singleNodeNumber = singleNodeNumber + stk1tostk2[j][2];
                      console.log(stk1tostk2[j][0]+" "+stk1tostk2[j][2]);
                    }
                  }
                }
                
              }
              totalNodeNumber[stk1tostk2[i][0]]=singleNodeNumber;
            }

            for (var i=0; i<stk2tostk3.length; i++){
              if(tempNodeNumber.includes(stk2tostk3[i][0]) == false){
                tempNodeNumber.push(stk2tostk3[i][0]);
                var singleNodeNumber = stk2tostk3[i][2];
                console.log(stk2tostk3[i][0]+" "+singleNodeNumber);

                if (i != stk2tostk3.length-1){
                  for(var j=i+1; j<stk2tostk3.length; j++){
                    if (stk2tostk3[i][0] == stk2tostk3[j][0]){
                      singleNodeNumber = singleNodeNumber + stk2tostk3[j][2];
                      console.log(stk2tostk3[j][0]+" "+stk2tostk3[j][2]);
                    }
                  }
                  totalNodeNumber[stk2tostk3[i][0]]=singleNodeNumber;
                  console.log("singleNodeNumber: "+singleNodeNumber);
                }
                
              }
              
            }

            for (var i=0; i<stk2tostk3.length; i++){
              if(tempNodeNumber.includes(stk2tostk3[i][1]) == false){
                tempNodeNumber.push(stk2tostk3[i][1]);
                var singleNodeNumber = stk2tostk3[i][2];

                if (i != stk2tostk3.length-1){
                  for(var j=i+1; j<stk2tostk3.length; j++){
                    if (stk2tostk3[i][1] == stk2tostk3[j][1]){
                      singleNodeNumber = singleNodeNumber + stk2tostk3[j][2];
                      console.log(stk2tostk3[j][1]+" "+stk2tostk3[j][2]);
                    }
                  }
                }
                
              }
              totalNodeNumber[stk2tostk3[i][1]]=singleNodeNumber;
            }

            console.log(totalNodeNumber);

            //開始繪製桑基圖
            mySankey.setOption({
              color: ['#4E6FFA', '#8762FF','#FF5C79','#FF7E53'],
              title: {
                  text: 'Sankey Diagram',
                  textStyle: {
                    fontWeight: 'bold',              //标题颜色
                    color: '#B7B7B7'
                  },
              },
              tooltip: {
                  trigger: 'item',
                  enterable: true,
                  triggerOn: 'mousemove',
                  formatter: function (params, ticket, callback) {
                    console.log(params);
                    console.log(params["data"]);
                    console.log(ticket);
                    if (params["dataType"] != "node"){
                      return params["data"]["source"]+" 到 "+params["data"]["target"]+" | 總量: "+params["data"]["value"]+" | 佔比: "+Math.round(((params["data"]["value"]/totalDataNumber)*100)/2)+"%";
                    }else{
                      if (totalNodeNumber[params["data"]["name"]] != null){
                        return "節點"+params["data"]["name"]+"總數: "+totalNodeNumber[params["data"]["name"]];
                      }else{
                        return ("還沒做好ＸＤ");
                      }
                    }
                }
        
              },
              
              series: [
                  {
                      type: 'sankey',
                      right: '10%',
                      data: sankeyJson.nodes,
                      links: sankeyJson.links,
                      focusNodeAdjacency: true,
                      
                      itemStyle: {
                          normal: {
                              borderWidth: 0,
                              borderColor: '#aaa'
                          }
                      },
                      lineStyle: {
                          normal: {
                              curveness: 0.5,
                              color: 'source',
                              opacity:0.5
                          }
                      },
                      label:{
                        color:"#ffffff"
                      }
                  }
              ]
            });
        
            
            
         }, function (error) {
           console.trace(error.message);
         });
    }
}
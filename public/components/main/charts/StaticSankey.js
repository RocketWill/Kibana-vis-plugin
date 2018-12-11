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
            //console.log(sankey);
            //創建繪製的json格式
            var sankeyJson = {nodes:[],links:[]};
        
            var item;
            
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
        
            for(itemNode in linkSrcArr){
              sankeyJson.links.push({"source":linkSrcArr[itemNode],"target":linkMidArr[itemNode],"value":linkValueArr[itemNode]});
              sankeyJson.links.push({"source":linkMidArr[itemNode],"target":linkDesArr[itemNode],"value":linkValueArr[itemNode]});
            }
        
            console.log(sankeyJson);
            var mySankey = echarts.init(document.getElementById('sankey'));
        
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
                  triggerOn: 'mousemove'
        
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
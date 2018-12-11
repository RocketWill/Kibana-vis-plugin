import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';  
import echarts from 'echarts/lib/echarts';
import 'echarts';
export default class StaticSankey {
    static create() {
        var elasticsearch = require('elasticsearch-browser/elasticsearch.js');
        var client3 = new elasticsearch.Client({
            host: 'localhost:9200'
          });
        /*********************/
    /*    真實數據桑基圖    */
    /*********************/
    var res = client3.search({
        index: 'winlogbeat5*',
          size: 1000,
          body: {
            //聚合
            "aggs" : {
              "table": {
                "composite" : {
                  "size": 80,
                  "sources": [
                    {"stk1": {"terms": {"field": "host.name.keyword"}}},
                    {"stk2": {"terms": {"field": "source_name.keyword"}}},
                    {"stk3": {"terms": {"field": "level.keyword"}}}
                  ]
                }
              } 
            }
          }
      }).then(function (body) {
        var realDataArray = body.aggregations.table.buckets;
  
        console.log(realDataArray);
        //創建繪製的json格式
        var sankeyJsonRealData = {nodes:[],links:[]};
    
        var realDataItem;
        
        var realDataNodeArray = [];
        for(realDataItem in realDataArray){
          
          if (realDataNodeArray.includes(realDataArray[realDataItem]["key"]["stk1"]) == false){
            realDataNodeArray.push(realDataArray[realDataItem]["key"]["stk1"]);
          }
          if (realDataNodeArray.includes(realDataArray[realDataItem]["key"]["stk2"]) == false){
            realDataNodeArray.push(realDataArray[realDataItem]["key"]["stk2"]);
          }
          if (realDataNodeArray.includes(realDataArray[realDataItem]["key"]["stk3"]) == false){
            realDataNodeArray.push(realDataArray[realDataItem]["key"]["stk3"]);
          }
          
        }
    
        
        for(realDataItem in realDataNodeArray){
          sankeyJsonRealData.nodes.push({"name":realDataNodeArray[realDataItem]});
        }
    
        var realDataLinkSrcArr = [];
        var realDataLinkMidArr = [];
        var realDataLinkDesArr = [];
        var realDataLinkValueArr = [];
        for(realDataItem in realDataArray){
          realDataLinkSrcArr.push(realDataArray[realDataItem]["key"]["stk1"]);
          realDataLinkMidArr.push(realDataArray[realDataItem]["key"]["stk2"]);
          realDataLinkDesArr.push(realDataArray[realDataItem]["key"]["stk3"]);
          realDataLinkValueArr.push(realDataArray[realDataItem]["doc_count"]);
        }
    
        for(realDataItem in realDataArray){
          sankeyJsonRealData.links.push({"source":realDataLinkSrcArr[realDataItem],"target":realDataLinkMidArr[realDataItem],"value":realDataLinkValueArr[realDataItem]});
          sankeyJsonRealData.links.push({"source":realDataLinkMidArr[realDataItem],"target":realDataLinkDesArr[realDataItem],"value":realDataLinkValueArr[realDataItem]});
        }
    
        //console.log(sankeyJson);
        var myRealSankey = echarts.init(document.getElementById('real-sankey'));
  
        console.log(sankeyJsonRealData);
    
        //開始繪製桑基圖
        myRealSankey.setOption({
          color: ['#4E6FFA', '#8762FF','#FF5C79','#FF7E53'],
          title: {
              text: 'Real Data Sankey Diagram',
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
                  data: sankeyJsonRealData.nodes,
                  links: sankeyJsonRealData.links,
                  right: '10%',
                  focusNodeAdjacency: true,
                  layoutIterations:50,
                  nodeWidth:30, //图中每个矩形节点的宽度。
                  // nodeGap: 10, //图中每一列任意两个矩形节点之间的间隔。
                  // silent:true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                  animationEasing:'sinusoidalOut',
                  itemStyle: {
                      normal: {
                          borderWidth: 0,
                          borderColor: '#aaa',
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
                    color:"#ffffff",
                    fontWeight: 200, 
                    padding:13,
                  }
              }
          ]
        });
     }, function (error) {
       console.trace(error.message);
     });
    }
}
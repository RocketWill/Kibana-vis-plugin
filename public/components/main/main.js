
//import React from 'react';
import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

//引入es
var elasticsearch = require('elasticsearch-browser/elasticsearch.js');
//創建 bar chart client
var client = new elasticsearch.Client({
  host: 'localhost:9200'
});
//創建 sankey diagram client
var client2 = new elasticsearch.Client({
  host: 'localhost:9200'
});

//console.log(client2);
//console.log(client);

import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText
} from '@elastic/eui';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/echarts_test2/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
    
    /*
      銀行帳戶存款 Bar 圖
    */
    client.search({
      // query
      index: 'bank',
        size: 20,
        body: {
        "query":
            {
                "match": {
                    "gender":"M"
                }   
            },
        }
    }).then(function (body) {
       var a = body.hits.hits;
       //console.log(a);
       var dataNameArr = [];
       var dataBalanceArr = [];
       var item;
       for (item in a){
         var name = (a[item]["_source"]["firstname"]);
         var balance = a[item]["_source"]["balance"];
         dataNameArr.push(name);
         dataBalanceArr.push(balance);
       }

       console.log(dataNameArr);
       console.log(dataBalanceArr);

       var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 銀行存款' },
            tooltip: {},
            xAxis: {
                data: dataNameArr
            },
            yAxis: {},
            series: [{
                name: '存款額',
                type: 'bar',
                data: dataBalanceArr
            }]
        });


    }, function (error) {
      console.trace(error.message);
    });


    /*
      桑基圖
    */
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

    //console.log(sankeyJson);
    var mySankey = echarts.init(document.getElementById('sankey'));

    //開始繪製桑基圖
    mySankey.setOption({
      title: {
          text: 'Sankey Diagram'
      },
      tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'

      },
      series: [
          {
              type: 'sankey',
              data: sankeyJson.nodes,
              links: sankeyJson.links,
              focusNodeAdjacency: true,
              itemStyle: {
                  normal: {
                      borderWidth: 1,
                      borderColor: '#aaa'
                  }
              },
              lineStyle: {
                  normal: {
                      curveness: 0.5
                  }
              }
          }
      ]
    });

    
    
 }, function (error) {
   console.trace(error.message);
 });

  console.log(res);
    
    /*
    var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    */
  }
  render() {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>{title} Hello World!</h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Congratulations</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
              <div id="main" style={{ width: 600, height: 400 }}></div>
              <div id="sankey" style={{ width: 600, height: 400 }}></div>
              </EuiText>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}

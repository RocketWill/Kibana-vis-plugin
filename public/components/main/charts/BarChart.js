import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';  
import echarts from 'echarts/lib/echarts';
import 'echarts';
export default class BarChart {
    static create() {
    var elasticsearch = require('elasticsearch-browser/elasticsearch.js');
     
    /*********************/
    /* 銀行帳戶存款 Bar 圖 */
    /*********************/
    var client5 = new elasticsearch.Client({
        host: 'localhost:9200'
      });
    client5.search({
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
              title: 
              { text: 'Bank Balance Bar Chart',
                textStyle: {
                  fontWeight: 'bold',              //标题颜色
                  color: '#B7B7B7'
                },
              },
              tooltip: {},
              xAxis: {
                  data: dataNameArr,
                  nameTextStyle: {
                    color: ['#ffffff']
                  },
                  axisLine:{
                    lineStyle:{
                        color:'#A892FE'
                    }
                  }

              },
              yAxis: {
                splitLine: {
							    lineStyle: {
							        // 使用深浅的间隔色
							        color: ['#453893']
							    }
                },
                nameTextStyle: {
                  color: ['#453893']
                },
                axisLine:{
                  lineStyle:{
                      color:'#A892FE'
                  }
                }
              },
              series: [{
                  name: '存款額',
                  type: 'bar',
                  data: dataBalanceArr,
                  color:'#A892FE',
                  itemStyle:{
                   /* 
                    color:"#7ec2bb"
                    */
                   
                   normal: {
                     /*
                      color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                          "#4E6FFA","#8762FF"
                        ];
                        if (params.dataIndex % 2 === 0){
                          return colorList[0];
                        }else{
                          return colorList[1];
                        }
                        
                      }
                      */
                     color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                        [
                          {offset: 0, color: '#8762FF'},
                          {offset: 1, color: '#4E6FFA'}
                        ]
                    )
                  },
                    
                }
              }]
          });
  
  
      }, function (error) {
        console.trace(error.message);
      });
    }
  }
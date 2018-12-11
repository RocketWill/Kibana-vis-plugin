import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';  
import echarts from 'echarts/lib/echarts';
import 'echarts';
export default class StaticSankey {
    static create() {
        var elasticsearch = require('elasticsearch-browser/elasticsearch.js');
        
        /*********************/
        /*      靜態3D圖      */
        /*********************/
 var my3D = echarts.init(document.getElementById('threeD'));
 var indices = {
  name: 0,
  group: 1,
  id: 16
};
var schema = [
  {name: 'name', index: 0},
  {name: 'group', index: 1},
  {name: 'protein', index: 2},
  {name: 'calcium', index: 3},
  {name: 'sodium', index: 4},
  {name: 'fiber', index: 5},
  {name: 'vitaminc', index: 6},
  {name: 'potassium', index: 7},
  {name: 'carbohydrate', index: 8},
  {name: 'sugars', index: 9},
  {name: 'fat', index: 10},
  {name: 'water', index: 11},
  {name: 'calories', index: 12},
  {name: 'saturated', index: 13},
  {name: 'monounsat', index: 14},
  {name: 'polyunsat', index: 15},
  {name: 'id', index: 16}
];
var data;

var fieldIndices = schema.reduce(function (obj, item) {
  obj[item.name] = item.index;
  return obj;
}, {});

var groupCategories = [];
var groupColors = [];
var data;
var fieldNames = schema.map(function (item) {
  return item.name;
});
fieldNames = fieldNames.slice(2, fieldNames.length - 2);

function getMaxOnExtent(data) {
  var colorMax = -Infinity;
  var symbolSizeMax = -Infinity;
  for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var colorVal = item[fieldIndices[config.color]];
      var symbolSizeVal = item[fieldIndices[config.symbolSize]];
      colorMax = Math.max(colorVal, colorMax);
      symbolSizeMax = Math.max(symbolSizeVal, symbolSizeMax);
  }
  return {
      color: colorMax,
      symbolSize: symbolSizeMax
  };
}
var app={config:{},configParameters:{}};
var config = app.config = {
  xAxis3D: 'protein',
  yAxis3D: 'fiber',
  zAxis3D: 'sodium',
  color: 'fiber',
  symbolSize: 'vitaminc',

  onChange: function () {
      var max = getMaxOnExtent(data);
      if (data) {
          myChart.setOption({
              visualMap: [{
                  max: max.color / 2
              }, {
                  max: max.symbolSize / 2
              }],
              xAxis3D: {
                  name: config.xAxis3D
              },
              yAxis3D: {
                  name: config.yAxis3D
              },
              zAxis3D: {
                  name: config.zAxis3D
              },
              series: {
                  dimensions: [
                      config.xAxis3D,
                      config.yAxis3D,
                      config.yAxis3D,
                      config.color,
                      config.symbolSiz
                  ],
                  data: data.map(function (item, idx) {
                      return [
                          item[fieldIndices[config.xAxis3D]],
                          item[fieldIndices[config.yAxis3D]],
                          item[fieldIndices[config.zAxis3D]],
                          item[fieldIndices[config.color]],
                          item[fieldIndices[config.symbolSize]],
                          idx
                      ];
                  })
              }
          });
      }
  }
};
app.configParameters = {};
['xAxis3D', 'yAxis3D', 'zAxis3D', 'color', 'symbolSize'].forEach(function (fieldName) {
  app.configParameters[fieldName] = {
      options: fieldNames
  };
});

data = [
  ["Beverage, instant breakfast powder, chocolate, not reconstituted","Dairy and Egg Products",19.9,0.285,0.385,0.4,0.07690000000000001,0.947,66.2,65.8,1.4,7.4,357,0.56,0.314,0.278,27481  ],
  ["Beverage, instant breakfast powder, chocolate, sugar-free, not reconstituted","Dairy and Egg Products",35.8,0.5,0.717,2,0.138,1.705,41,39,5.1,7.4,358,2.162,1.189,1.027,27482  ],
  ["Beverage, milkshake mix, dry, not chocolate","Dairy and Egg Products",23.5,0.88,0.78,1.6,0.0012,2.2,52.9,51.3,2.6,12.8,329,2.059,0.332,0.06,27483  ],
  ["Butter oil, anhydrous","Dairy and Egg Products",0.28,0.004,0.002,null,0,0.005,null,null,99.48,0.24,876,61.924,28.732,3.694,27484  ],
  ["Butter, salted","Dairy and Egg Products",0.85,0.024,0.714,null,0,0.024,0.06,0.06,81.11,15.87,717,51.368,21.021,3.043,27485  ],
  ["Butter, whipped, with salt","Dairy and Egg Products",0.85,0.024,0.827,null,0,0.026,0.06,0.06,81.11,15.87,717,50.489,23.426,3.012,27486  ],
  ["Butter, without salt","Dairy and Egg Products",0.85,0.024,0.011,null,0,0.024,0.06,0.06,81.11,17.94,717,51.368,21.021,3.043,27487  ],
  ["Cheese fondue","Dairy and Egg Products",14.23,0.476,0.132,null,0,0.105,3.77,null,13.47,61.61,229,8.721,3.563,0.484,27488  ],
  ["Cheese food, cold pack, american","Dairy and Egg Products",19.66,0.497,0.966,null,0,0.363,8.32,null,24.46,43.12,331,15.355,7.165,0.719,27489  ],
  ["Cheese food, imitation","Dairy and Egg Products",22.4,0.552,1.239,null,0,0.336,8.8,8.21,1.3,63.8,137,0.81,0.38,0.048,27490  ],
  ["Cheese food, pasteurized process, american, with di sodium phosphate","Dairy and Egg Products",19.61,0.574,1.596,null,0,0.279,7.29,7.43,24.6,43.15,328,15.443,7.206,0.723,27491  ],
  ["Cheese food, pasteurized process, american, without di sodium phosphate","Dairy and Egg Products",18.4,0.57,1.265,null,0,0.291,7.83,7.43,25.18,43.21,330,14.895,7.214,1.108,27492  ],
  ["Cheese food, pasteurized process, swiss","Dairy and Egg Products",21.92,0.723,1.552,null,0,0.284,4.5,null,24.14,43.67,323,15.487,6.801,0.6,27493  ],
  ["Cheese product, pasteurized process, american, reduced fat, fortified with vitamin D","Dairy and Egg Products",17.6,0.529,1.587,null,0,0.33,10.6,8.02,14.1,51.8,240,8.85,4.13,0.41,27494  ],
  ["Cheese product, pasteurized process, cheddar or american, reduced fat","Dairy and Egg Products",17.6,0.529,1.587,null,0,0.33,10.6,8.02,14.1,51.8,240,8.85,4.13,0.41,27495  ],
  ["Cheese sauce, prepared from recipe","Dairy and Egg Products",10.33,0.311,0.493,0.1,0.0006,0.142,5.48,0.19,14.92,66.86,197,8.034,4.735,1.397,27496  ],
  ["Cheese spread, cream cheese base","Dairy and Egg Products",7.1,0.071,0.673,null,0,0.112,3.5,3.5,28.6,58.5,295,18.02,8.071,1.033,27497  ],
  ["Cheese spread, pasteurized process, american, with di sodium phosphate","Dairy and Egg Products",16.41,0.562,1.625,null,0,0.242,8.73,null,21.23,47.65,290,13.327,6.219,0.624,27498  ],
  ["Cheese spread, pasteurized process, american, without di sodium phosphate","Dairy and Egg Products",16.41,0.562,1.345,null,0,0.242,8.73,7.32,21.23,47.65,290,13.327,6.219,0.624,27499  ],
  ["Cheese substitute, mozzarella","Dairy and Egg Products",11.47,0.61,0.685,null,0.0001,0.455,23.67,23.67,12.22,47.36,248,3.711,6.243,1.738,27500  ],
  ["Cheese, Mexican, blend, reduced fat","Dairy and Egg Products",24.69,1.146,0.776,null,0,0.093,3.41,0.56,19.4,48.2,282,11.58,5.02,0.75,27501  ],
  ["Cheese, american cheddar, imitation","Dairy and Egg Products",16.7,0.562,1.345,null,0,0.242,11.6,7.74,14,53.1,239,8.79,4.102,0.409,27502  ],
  ["Cheese, blue","Dairy and Egg Products",21.4,0.528,1.395,null,0,0.256,2.34,0.5,28.74,42.41,353,18.669,7.778,0.8,27503  ],
  ["Cheese, brick","Dairy and Egg Products",23.24,0.674,0.56,null,0,0.136,2.79,0.51,29.68,41.11,371,18.764,8.598,0.784,27504  ],
  ["Cheese, brie","Dairy and Egg Products",20.75,0.184,0.629,null,0,0.152,0.45,0.45,27.68,48.42,334,17.41,8.013,0.826,27505  ],
  ["Cheese, camembert","Dairy and Egg Products",19.8,0.388,0.842,null,0,0.187,0.46,0.46,24.26,51.8,300,15.259,7.023,0.724,27506  ],
]

var max = getMaxOnExtent(data);

    my3D.setOption({
        title: 
              { text: '3D Chart Demo',
                textStyle: {
                  fontWeight: 'bold',              //标题颜色
                  color: '#B7B7B7'
                },
              },

        tooltip: {},
        visualMap: [{
            top: 10,
            calculable: true,
            dimension: 3,
            max: max.color / 2,
            inRange: {
                color: ['#4E6FFA', '#8762FF','#FF7E53','#FF5C79']
            },
            textStyle: {
                color: '#B7B7B7'
            }
        }, {
            bottom: 10,
            calculable: true,
            dimension: 4,
            max: max.symbolSize / 2,
            inRange: {
                symbolSize: [10, 40]
            },
            textStyle: {
                color: '#B7B7B7'
            }
        }],
        xAxis3D: {
            name: config.xAxis3D,
            type: 'value',
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#453893']
                }
            },
            nameTextStyle: {
                color: ['#ffffff']
            },
            axisLine:{
                lineStyle:{
                color:'#A892FE'
                }
            }
            
        },
        yAxis3D: {
            name: config.yAxis3D,
            type: 'value',
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#453893']
                }
            },
            nameTextStyle: {
                color: ['#ffffff']
            },
            axisLine:{
                lineStyle:{
                color:'#A892FE'
                }
            }
        },
        zAxis3D: {
            name: config.zAxis3D,
            type: 'value',
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#453893']
                }
            },
            nameTextStyle: {
                color: ['#ffffff']
            },
            axisLine:{
                lineStyle:{
                color:'#A892FE'
                }
            }
        },
        grid3D: {
            axisLine: {
                lineStyle: {
                    color: '#A892FE'
                }
            },
            axisPointer: {
                lineStyle: {
                    color: '#A892FE'
                }
            },
            viewControl: {
                autoRotate: true,
                //projection: 'orthographic'
            }
        },
        series: [{
            type: 'scatter3D',
            dimensions: [
                config.xAxis3D,
                config.yAxis3D,
                config.yAxis3D,
                config.color,
                config.symbolSiz
            ],
            data: data.map(function (item, idx) {
                return [
                    item[fieldIndices[config.xAxis3D]],
                    item[fieldIndices[config.yAxis3D]],
                    item[fieldIndices[config.zAxis3D]],
                    item[fieldIndices[config.color]],
                    item[fieldIndices[config.symbolSize]],
                    idx
                ];
            }),
            symbolSize: 12,
            // symbol: 'triangle',
            itemStyle: {
                borderWidth: 0.5,
                borderColor: '#ffffff',
                opacity:0.5
            },
            emphasis: {
                itemStyle: {
                    color: '#A892FE'
                }
            }
        }]
    });
    }
}
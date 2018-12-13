import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';  
import echarts from 'echarts/lib/echarts';
import 'echarts';
import DataSource from "./data/scatter3D"

export default class StaticSankey {
    static create() {
        var elasticsearch = require('elasticsearch-browser/elasticsearch.js');
        
        /*********************/
        /*      靜態3D圖      */
        /*********************/
        // based on prepared DOM, initialize echarts instance
        var scattar3dChart = echarts.init(document.getElementById('threeDScatterPlot'));
        var processes = DataSource.load3DScatter();
        var words = DataSource.loadWords();
        console.log(processes);
        // specify chart configuration item and data
        var option = {
            color: ['#4E6FFA', '#8762FF','#FF5C79','#FF7E53'],
            title: {
                text: 'Behavior2vec',
                textStyle: {
                    fontWeight: 'bold',              //标题颜色
                    color: '#B7B7B7'
                },
            },
            tooltip: {
                formatter: (d) => {
                    return Object.keys(words)[d.dataIndex];
                }
            },
            legend: {
                data: ['文件'],
                textStyle: {
                    fontWeight: 'bold',              //标题颜色
                    color: '#B7B7B7'
                },
            },
            xAxis3D: {
                type: 'value',
                show: false,
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
                type: 'value',
                show: false,
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
                type: 'value',
                show: false,
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
                name: '文件',
                textStyle: {
                    fontWeight: 'bold',              //标题颜色
                    color: '#B7B7B7'
                },
                type: 'scatter3D',
                data: Object.values(words),
                lineStyle: {
                    width: 4
                },
                symbolSize: 5,
                // symbol: 'triangle',
                itemStyle: {
                    borderWidth: 0,
                    borderColor: '#ffffff',
                    color:"#FF7E53",
                    opacity:0.8
                },
                emphasis: {
                    itemStyle: {
                        color: '#A892FE'
                    }
                }
            }]
        };
        var line;
        // deal process data
        processes.filter((e, i) => i < 5).forEach(process => {
            line = {
                type: 'line3D',
                data: process['events'].filter(e => words[e]).map(e => words[e]),
                lineStyle: {
                    width: 4
                }
            };
            option.series.push(line);
        })

        // use configuration item and data specified to show chart
        scattar3dChart.setOption(option);
    }
}
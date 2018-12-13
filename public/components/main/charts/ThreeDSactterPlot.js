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
            title: {
                text: 'Behavior2vec'
            },
            tooltip: {
                formatter: (d) => {
                    return Object.keys(words)[d.dataIndex];
                }
            },
            legend: {
                data: ['文件']
            },
            xAxis3D: {
                type: 'value',
                show: false,
                // splitLine: {
                //     show: false
                // }
            },
            yAxis3D: {
                type: 'value',
                show: false,
                // splitLine: {
                //     show: false
                // }
            },
            zAxis3D: {
                type: 'value',
                show: false,
                // splitLine: {
                //     show: false
                // }
            },
            grid3D: {},
            series: [{
                name: '文件',
                type: 'scatter3D',
                data: Object.values(words),
                lineStyle: {
                    width: 4
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
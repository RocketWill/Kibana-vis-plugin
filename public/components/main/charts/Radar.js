import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';  
import echarts from 'echarts/lib/echarts';
import 'echarts';
export default class Radar {
    static create(radar_data = undefined){
        var radar = undefined
        if (radar_data == undefined){
            radar = [
                [0.5, 0.8, 0.6, 0.46, 0.18, 0.6, 0.1], 
            ];
        }else{
            radar = radar_data
        }
        
        var radarChart = echarts.init(document.getElementById('radar'));
        var option = {
            title: {
                text: '雷达图',
                // left: 'center',
                textStyle: {
                    fontWeight: 'bold',              //标题颜色
                    color: '#B7B7B7'
                  },
            },
            radar: {
                indicator: [
                    { name: '登录', max: 1 },
                    { name: '文件', max: 1 },
                    { name: '网络', max: 1 },
                    { name: '注册表', max: 1 },
                    { name: '进程', max: 1 },
                    { name: 'Other', max: 1 }
                ],
                shape: 'circle',
                splitNumber: 5,
                name: {
                    textStyle: {
                        color: '#B7B7B7'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ['#453893', '#504694','#635AA1','#776FAD','#8984B8','#9D98C2'].reverse(), //圓圈顏色
                        opacity:0.8
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#A892FE'//放射線顏色
                    }
                }
            },
            series: [
                {
                    name: '',
                    type: 'radar',
                    lineStyle: {
                        normal: {
                            width: 1,
                            opacity: 0.5
                        }
                    },
                    data: radar,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.RadialGradient(
                                0, 1, 1.7, [{
                                offset: 0.4,
                                color: '#FF7E53'
                            }, {
                                offset: 1,
                                color: '#FF666E'
                            }], false),
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.4
                        }
                    }
                }
            ]
        };

        radarChart.setOption(option);
    }
}
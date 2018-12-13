import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';  
import echarts from 'echarts/lib/echarts';
import 'echarts';
export default class StaticSankey {
    static create() {
        var calendar = [
            ['host1', 'user1', 1],
            ['host2', 'user1', 9],
            ['host5', 'user3', 3],
            ['host2', 'user2', 2]
        ]
        var calendarChart = echarts.init(document.getElementById('calendar'));
        var option = {
            //color: ['#4E6FFA', '#8762FF','#FF5C79','#FF7E53'],
            title: {
                // top: 30,
                text: 'Calendar',
                textStyle: {
                    fontWeight: 'bold',              //标题颜色
                    color: '#B7B7B7'
                  },
            },
            // legend: {
            //     top: '30',
            //     left: '300',
            //     data: ['异常值', '大于0.8'],
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            xAxis: {
                type: 'category',
                data: ['host1', 'host2', 'host3', 'host4',
                       'host5', 'host6', 'host7', 'host8'],
                splitArea: {
                    show: true,
                    
                },
                nameTextStyle: {
                    color: ['#ffffff']
                  },
                  axisLine:{
                    lineStyle:{
                        color:'#A892FE'
                    }
                  },
                  itemStyle: {
                    normal: {
                        color: '#323c48',
                        borderWidth: 1,
                        borderColor: '#111'
                    },
                    //backgroundColor:"rgba(12,34,56,0.9)"
                }
            },
            yAxis: {
                type: 'category',
                data: ['user1', 'user2', 'user3', 'user4'],
                splitArea: {
                    show: true,
                    areaStyle:{
                        color:[
                            "#453893","#362c79"
                        ]
                    }
                },
                nameTextStyle: {
                    color: ['#ffffff']
                  },
                  axisLine:{
                    lineStyle:{
                        color:'#A892FE'
                    }
                  },
                  

            },
            
            // calendar: {
            //     left: 'center',
            //     splitLine: {
            //         show: true,
            //         lineStyle: {
            //             color: '#000',
            //             width: 4,
            //             type: 'solid'
            //         }
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: '#323c48',
            //             borderWidth: 1,
            //             borderColor: '#111'
            //         }
            //     }
            // },

            series: [
                {
                    name: '登录事件',
                    type: 'scatter',
                    // coordinateSystem: 'calendar',
                    data: calendar,
                    symbolSize: function (val) {
                        return 20 / val[2];
                    },
                    itemStyle: {
                        normal: {
                            color:'#ff5c79', //普通點點顏色
                        }
                    },
                    
                },
                {
                    name: '稀少事件',
                    color: '#B7B7B7',
                    
                    type: 'effectScatter',
                    // coordinateSystem: 'calendar',
                    data: calendar.filter(e => e[2] <= 2),
                    symbolSize: function (val) {
                        return 20 / val[2];
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#ff7e53',
                            shadowBlur: 10,
                            shadowColor: '#453893'
                        }
                    },
                    zlevel: 1,
                    
                },
                
            ]
        };
        calendarChart.setOption(option);
    }
}
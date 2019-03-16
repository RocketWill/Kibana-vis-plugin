import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';  
import echarts from 'echarts/lib/echarts';
import 'echarts';


import UserRadar from '../charts/Radar';
import UserParallel from '../charts/Parallel';

//引入jQuery
import $ from 'jquery';
import "../jquery"
export default class Calendar {
    static create() {
        var calendar = [
            [new Date("2017/11/9 12:00:00"), 'user1', 1],
            [new Date("2017/11/10 12:00:00"), 'user1', 9],
            [new Date("2017/11/16 12:00:00"), 'user3', 10],
            [new Date("2017/11/10 12:00:00"), 'user2', 2],
            [new Date("2017/11/12 12:00:00"), 'user3', 1],
            [new Date("2017/11/16 12:00:00"), 'user1', 2],
            [new Date("2017/11/17 12:00:00"), 'user3', 20],
            [new Date("2017/11/23 12:00:00"), 'user4', 7]
        ]

        //使用者發生錯誤事件總覽（靜態數據）
        var user_event_info = {
            'user1':[
                "WINDOWS_FILE:Execute[temp]",
                "WINDOWS_PROCESS:Spawn[temp]",
                "WINDOWS_FILE:Write[cuckoo]",
                "WINDOWS_FILE:Permissions[cuckoo]",
                "WINDOWS_FILE:Writing file to temporary directory",
                "WINDOWS_FILE:Write[cuckoo]",
                "WINDOWS_FILE:Permissions[cuckoo]",
                "WINDOWS_FILE:Writing file to temporary directory",
                "WINDOWS_FILE:Permissions[cuckoo]",
                "WINDOWS_FILE:Writing file to temporary directory",
            ],
            'user2':[
                "WINDOWS_FILE:Write[appdata (local)].db",
                "WINDOWS_FILE:Write[appdata (local)].db",
                "WINDOWS_FILE:Write[appdata (local)].db",
                "WINDOWS_FILE:Write[appdata (local)].db",
                "WINDOWS_FILE:Write[appdata (local)].db",
                "WINDOWS_FILE:Write[appdata (local)].db",
                "WINDOWS_FILE:Write[appdata (local)].db",
                "WINDOWS_FILE:Execute[system].dll",
                "WINDOWS_FILE:Execute[system].dll",
                "WINDOWS_FILE:Execute[system].dll"
            ],
            'user3':[
                "WINDOWS_FILE:Execute[winsxs].dll",
                "WINDOWS_FILE:Execute[system].dll",
                "WINDOWS_FILE:Execute[system].dll",
                "WINDOWS_FILE:Execute[system].dll",
                "WINDOWS_FILE:Execute[system].dll",
                "WINDOWS_FILE:Permissions[program data].dat",
                "WINDOWS_FILE:Writing file to temporary directory"
            ],
            'user4':[
                "WINDOWS_FILE:Execute[system].dll",
                "WINDOWS_FILE:Permissions[windows error reporting report queue]",
                "WINDOWS_FILE:Write[windows error reporting report queue]",
                "WINDOWS_FILE:Deleting edited file",
                "WINDOWS_FILE:Write[windows error reporting report queue]",
                "WINDOWS_FILE:Permissions[program data]",
                "WINDOWS_FILE:Write[program data]",
                "WINDOWS_FILE:Deleting edited file",
                "WINDOWS_FILE:Write[program data]",
            ],
        }

        var user_radar_info = {
            'user1':[[0.5, 0.8, 0.6, 0.46, 0.18, 0.6, 0.1]],
            'user2':[[0.2, 0.4, 0.7, 0.1, 0.7, 0.2]],
            'user3':[[0.12, 0.45, 0.72, 0.19, 0.56,0.34]],
            'user4':[[0.67, 0.98, 0.12, 0.34, 0.61,0.11]]
        }

        var user_parallel_info = {
            'user1':[['user1', 1,55,9,0.3,0.9]],
            'user2':[['user2', 0.5,5,30,0.9, 0.4]],
            'user3':[['user3', 0.1,3,92,0.3, 0.2]],
            'user4':[['user4', 0.8, 30, 0.28, 33,0.3]]
        }
        

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
                // data: [new Date("2017/11/9 12:00:00"), new Date("2017/11/10 12:00:00"), new Date("2017/11/11 12:00:00"), new Date("2017/11/12 12:00:00"),
                // new Date("2017/11/13 12:00:00"), new Date("2017/11/14 12:00:00"), new Date("2017/11/15 12:00:00"), new Date("2017/11/16 12:00:00")],
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
                // data: ['user1', 'user2', 'user3', 'user4'],
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
            dataZoom: [
                {
                    type: 'slider',
                    textStyle: {color: '#b7b7b7'},
                    backgroundColor: '#201546',
                    borderColor: 'rgba(255,255,255,0.2)',
                    fillerColor:'rgba(255,255,255,0.2)',
                    start: 0
                }
            ],
            
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



            series: [ //根據事件數量設置不同點點大小
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

        //設置點擊事件
        calendarChart.on('click',function(params){
            var name = params.data[1];
            //日誌模塊//
            //獲取主頁面的日誌模塊
            var des = $('#description');
            var event_list = user_event_info[name]

            des.empty();
            des.append("<p>"+name+"@localhost"+"</p>");

            //獲取單一用戶事件
            for( var i = 0; i < event_list.length; i += 1 ){
                //console.log(event_list[i]);
                var append = $("<p id='fade_in'>"+event_list[i]+"</p>");
                des.append(append.fadeIn(800));
            }



            //雷達模塊//
            //獲取主頁面的雷達模塊
            UserRadar.create(user_radar_info[name]);
            console.log(user_radar_info[name]);


            //平行座標軸模塊//
            UserParallel.create(user_parallel_info[name]);
            console.log(user_parallel_info[name]);
        })
    }
}
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';  
import echarts from 'echarts/lib/echarts';
import 'echarts';
import DataSource from "./data/scatter3D"

export default class Parallel {
    static create(parallel_data=undefined) {

        var parallel = undefined

        if(parallel_data==undefined){
            parallel = [
                ['user1', 1,55,9,0.3,0.9],
                ['user2', 0.5,5,30,0.9, 0.4],
                ['user3', 0.1,3,92,0.3, 0.2],
                ['user4', 0.8, 30, 0.28, 33,0.3]
            ];
            
        }else{
            parallel = parallel_data;
        }

        //添加parallel的用戶標籤
        const category_data = []
        for (let i=0; i<parallel.length; i++){
            category_data.push(parallel[i][0]);
        }

        var parallelChart = echarts.init(document.getElementById('parallel'));
        var option = {
            color: ['#FF5C79','#FF7E53'],
            title: 
              { text: 'Parallel',
                textStyle: {
                  fontWeight: 'bold',              //标题颜色
                  color: '#B7B7B7'
                },
              },
            parallelAxis: [
                {
                    dim: 0,
                    name: '使用者',
                    type: 'category',
                    data:category_data
                },
                { dim: 1, name: '登录', inverse: true, nameLocation: 'start' },
                { dim: 2, name: '进程' },
                { dim: 3, name: '文件' },
                { dim: 4, name: '注册表' },
                { dim: 5, name: '网络' }
            ],
            parallel: {
                left: '5%',
                right: '10%',
                bottom: 20,
                parallelAxisDefault: {
                    type: 'value',
                    name: 'AQI指数',
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        color: ['#B7B7B7']
                      },
                      axisLine:{
                        lineStyle:{
                            color:'#A892FE'
                        }
                      },
                    axisTick: {
                        lineStyle: {
                            color: "#A892FE"
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#B7B7B7'
                        }
                    },
                    triggerEvent:true
                }
            },
            
            series: [
                {
                    name: '',
                    type: 'parallel',
                    lineStyle: {
                        normal: {
                            width: 2,
                            opacity: 0.9,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                  [
                                    {offset: 0, color: '#FF5C79'},
                                    {offset: 1, color: '#FF7E53'}
                                  ]
                              )
                        },

                    },
                    data: parallel
                }
            ]
        };
        parallelChart.setOption(option);
        parallelChart.on('click',function(params){
            console.log(params.value);
        })
    }
}
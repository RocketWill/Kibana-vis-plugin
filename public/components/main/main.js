
//import React from 'react';
import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//引入 ECharts 3D 模塊
import 'echarts-gl';
import 'echarts';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// 引入d3
import * as d3 from "d3";

//引入jQuery
import $ from 'jquery';
import "./jquery"

//引入es
var elasticsearch = require('elasticsearch-browser/elasticsearch.js');

//引入 bar chart
import BarChart from "./charts/BarChart";
//引入 桑基圖
import StaticSankey from "./charts/StaticSankey";
//引入 桑基圖
import ThreeD from "./charts/ThreeD";
//創建真實數據 sankey diagram client
import RealSankey from "./charts/RealSankey";

import ThreeDScatterPlot from "./charts/ThreeDSactterPlot";
import Radar from "./charts/Radar";
import Calendar from './charts/Calendar';
import Parallel from './charts/Parallel';
import BarChartTest from "./charts/BarChartTest";
import ScatterPlot from './charts/ScatterPlot';


import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

//引入 es 自定義 html tag
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiCard,
  EuiIcon,
  EuiCode,
  EuiPanel,
  EuiFlexGrid
} from '@elastic/eui';





export class Main extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  static defaultProps = {
    numberOfMonths: 2,
  };
  
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }
  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }
  handleResetClick() {
    this.setState(this.getInitialState());
    BarChartTest.create();
    RealSankey.create();
  }

  // $("#submit").click(function(){
  //   var res = $('#res').text();
  //   console.log(res);
  // });

  show(){
    var s = $('#time-start').text();
    var e = $('#time-end').text();
    BarChartTest.create(s,e);
    RealSankey.create(s,e);
  }

  componentDidMount() {
    // 時間選擇器 toggle
    // $("#tf-btn").click(function(){
    //   $("#tf-panel").toggle();
    // });

    $( "#tf-btn" ).click(function() {
      $( "#tf-panel" ).slideToggle( "slow", function() {
        // Animation complete.
      });
    });


    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    // const { httpClient } = this.props;
    // httpClient.get('../api/echarts_test2/example').then((resp) => {
    //   this.setState({ time: resp.data.time });
    // });

    
    BarChartTest.create();
    /*********************/
    /* 銀行帳戶存款 Bar 圖 */
    /*********************/
    BarChart.create();

    /*********************/
    /*       桑基圖       */
    /*********************/
    StaticSankey.create();

    /*********************/
    /*    真實數據桑基圖    */
    /*********************/
    RealSankey.create();
  
    /*********************/
    /*      靜態3D圖      */
    /*********************/
    ThreeD.create();

    /* 3D圖 */    
    ThreeDScatterPlot.create();

    Radar.create();

    Calendar.create();

    Parallel.create();

    ScatterPlot.create();
  
  }
  render() {
    const { title } = this.props;

    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      
      <EuiPage id="custom-bg">
        <EuiPageBody id="page-body">
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1 id="font-white">Security Analysis<span class="author font-white"> created by 程詠 and 周旺</span></h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent id="page-content">
            <EuiPageContentHeader>
              <EuiTitle>
                <h2 id="font-white">Security Analysis Dashboard <span id="tf-btn">Time Filter</span></h2>
              </EuiTitle>
              
            </EuiPageContentHeader>
            <EuiPageContentBody>


            <EuiFlexItem id="tf-panel" style={{ maxWidth: 520 }}>
            <div className="RangeExample">
          
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <p id="res">
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
        </p>
        
        <p id="time-start">
          {from &&
            to &&
            `${from.toLocaleDateString()}`}
        </p>

        <p id="time-end">
          {from &&
            to &&
            `${to.toLocaleDateString()}`}
        </p>

        {from &&
            to && (
              <button className="link" id="reset-btn" onClick={this.handleResetClick}>
                Reset
              </button>
            )}
        <br></br>
        {from &&
            to && (
              <button id="submit" onClick={this.show}>Submit</button>
            )}
        
        <Helmet>
          <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff;
    color: #FF7E53;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
        </Helmet>
      </div>
      <div class="clear"></div>
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiPanel grow={false} id="bar-chart-test" style={{ maxWidth: 1300 }}>
                <div id="main2" style={{ width: "100%", height: 600 }}></div>
              </EuiPanel>
            </EuiFlexItem> 

            <EuiFlexGroup>
            <EuiFlexItem grow={2} style={{ maxWidth: 900 }}>  
              
              <EuiPanel grow={false} id="real-sankey-panel" >
                <div id="real-sankey" style={{ width: "100%", height: 600 }}></div>
              </EuiPanel>
            </EuiFlexItem>

            <EuiFlexItem grow={1} style={{ maxWidth: 450 }}>
              <EuiPanel grow={false} id="sankey-panel">
                <div id="sankey" style={{ width: "100%", height: 400 }}></div>
              </EuiPanel>
              <EuiPanel grow={false} id="error-report-panel">
                <div id="error-report" style={{ width: "100%", height: 600 }}></div>
              </EuiPanel>
            </EuiFlexItem>
            </EuiFlexGroup>

            <EuiSpacer size="l" />


          
            <EuiFlexGroup>
            
            <EuiFlexItem style={{ maxWidth: 650 }} id='none'>
              <EuiPanel grow={false} id="threeD-panel">
                <div id="threeD" style={{ width: "100%", height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem grow={8} style={{ maxWidth: 1370 }}>
              <EuiPanel grow={false} id="threeDScatterPlot-panel">
                <div id="threeDScatterPlot" style={{ width: "100%", height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem>
            </EuiFlexGroup>

            <EuiSpacer size="l" />
            
            <EuiFlexGroup>
            <EuiFlexItem style={{ maxWidth: 675 }}>
              <EuiPanel grow={false} id="radar-panel">
                <div id="radar" style={{ width: "100%", height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem style={{ maxWidth: 675 }}>
              <EuiPanel grow={false} id="calendar-panel">
                <div id="calendar" style={{ width: "100%", height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem>
            </EuiFlexGroup>
            
            <EuiSpacer size="l" />
            <EuiFlexItem grow={8} style={{ maxWidth: 1370 }}>
              <EuiPanel grow={false} id="parallel-panel">
                <div id="parallel" style={{ width: "100%", height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem> 
                 


            <EuiSpacer size="l" />
            


            


            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
      
     /*
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel grow={false}>
            Another <EuiCode>EuiPanel</EuiCode>,
            <div id="main" style={{ width: 600, height: 400 }}></div>
            with <EuiCode>grow=&#123;false&#125;</EuiCode>.
          </EuiPanel>
        </EuiFlexItem>
    
        <EuiFlexItem>
          <EuiPanel grow={false}>
            Another <EuiCode>EuiPanel</EuiCode>,
            <div id="sankey" style={{ width: 600, height: 400 }}></div>
            with <EuiCode>grow=&#123;false&#125;</EuiCode>.
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      */
    );
  }
}

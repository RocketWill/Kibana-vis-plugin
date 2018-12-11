
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
  EuiPanel
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
  
  }
  render() {
    const { title } = this.props;
    return (
      
      <EuiPage id="custom-bg">
        <EuiPageBody id="page-body">
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1 id="font-white">Custom Dashboard<span class="author font-white"> created by 程詠 and 周旺</span></h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent id="page-content">
            <EuiPageContentHeader>
              <EuiTitle>
                <h2 id="font-white">Dashboard Example</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>


            <EuiFlexGroup>

            <EuiFlexItem style={{ maxWidth: 700 }}>
              <EuiPanel grow={false} id="bar-panel">
                <div id="main" style={{ width: "100%", height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem>

            <EuiFlexItem style={{ maxWidth: 700 }}>
              <EuiPanel grow={false} id="sankey-panel">
                <div id="sankey" style={{ width: "100%", height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem>


            </EuiFlexGroup>

            <EuiSpacer size="l" />
            <EuiFlexItem>
              <EuiPanel grow={false} id="threeD-panel" style={{ maxWidth: 1300 }}>
                <div id="threeD" style={{ width: "100%", height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem>    


            <EuiSpacer size="l" />
            <EuiFlexItem>
              <EuiPanel grow={false} id="real-sankey-panel" style={{ maxWidth: 1300 }}>
                <div id="real-sankey" style={{ width: "100%", height: 600 }}></div>
              </EuiPanel>
            </EuiFlexItem> 

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

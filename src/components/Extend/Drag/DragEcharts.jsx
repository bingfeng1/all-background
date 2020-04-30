import React from 'react'
import { Row, Col, List } from 'antd'
import * as echarts from 'echarts'
const { Item } = List

const drawLine = {
    title: {
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]

}
const drawPie = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
            ]
        }
    ]
}

let myEchart;

const DragEcharts = () => {
    const lists = new Map()
        .set('line', drawLine)
        .set('pie', drawPie)

    // 拖放结束的操作
    const drop = (ev) => {
        ev.preventDefault();
        // 通过getData获取关键id，直接进行echarts的方法操作即可
        if (!myEchart) {
            myEchart = echarts.init(ev.target)
        }
        myEchart.clear()
        myEchart.setOption(lists.get(ev.dataTransfer.getData("text/plain")))
    }

    // 必须设置，否则无法拖拽
    const dragover = (e) => {
        e.preventDefault()
    }

    // 将拖拽的关键id存入
    const dragstart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.dataset.item)
    }


    return (
        <div data-dragecharts>
            <Row>
                <Col span={6}>
                    <List
                        bordered
                        dataSource={lists.keys()}
                        renderItem={item => (
                            <Item>
                                <div
                                    draggable="true"
                                    onDragStart={dragstart}
                                    data-item={item}>
                                    {item}
                                </div>
                            </Item>
                        )}>

                    </List>
                </Col>
                <Col span={18}>
                    <div
                        className="drag-area"
                        onDragOver={dragover}
                        onDrop={drop}>

                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DragEcharts
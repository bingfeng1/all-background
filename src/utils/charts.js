import React from 'react';
import * as echarts from 'echarts'
import 'echarts/map/js/china'

// 省市与echarts引入文件的匹配
const importEchartsMap = new Map()
    .set('上海', 'shanghai')
    .set('湖北', 'hubei')
    .set('香港', 'xianggang')
    .set('台湾', 'taiwan')
    .set('北京', 'beijing')
    .set('广东', 'guangdong')
    .set('福建', 'fujian')
    .set('澳门', 'aomen')
    .set('浙江', 'zhejiang')
    .set('天津', 'tianjin')
    .set('内蒙古', 'neimenggu')
    .set('山东', 'shandong')
    .set('江苏', 'jiangsu')
    .set('甘肃', 'gansu')
    .set('四川', 'sichuan')
    .set('陕西', 'shanxi1')
    .set('云南', 'yunnan')
    .set('辽宁', 'liaoning')
    .set('吉林', 'jilin')
    .set('河北', 'hebei')
    .set('河南', 'henan')
    .set('广西', 'guangxi')
    .set('重庆', 'chongqing')
    .set('山西', 'shanxi')
    .set('黑龙江', 'heilongjiang')
    .set('江西', 'jiangxi')
    .set('海南', 'hainan')
    .set('青海', 'qinghai')
    .set('湖南', 'hunan')
    .set('贵州', 'guizhou')
    .set('新疆', 'xinjiang')
    .set('宁夏', 'ningxia')
    .set('西藏', 'xizang')
    .set('安徽', 'anhui')


// 转换地图
async function changeAreaMap(name) {
    if (importEchartsMap.has(name)) {
        if (importEchartsMap.get(name) !== name) {
            await import(`echarts/map/js/province/${importEchartsMap.get(name)}`)
            importEchartsMap.set(name, name)
        }
        return name
    } else {
        return 'china'
    }
}

// 纠正api和echarts的地区名称不匹配问题
const changeAreaNameForEchart = arr => {
    if (arr.name !== '中国') {
        for (let v of arr.children) {
            switch (arr.name) {
                // 如果是上海，基本都加上区
                case '上海':
                    if (v.name === '浦东') {
                        v.name = '浦东新区'
                    } else if (!v.name.endsWith('区')) {
                        v.name = v.name + '区'
                    }
                    break;
                case '北京':
                    if (!v.name.endsWith('区')) {
                        v.name = v.name + '区'
                    }
                    break;
                case '天津':

                    break;
                case '海南':
                    if (!v.name.endsWith('县')) {
                        v.name = v.name + '市'
                    }
                    break;
                default:
                    if (!v.name.endsWith('市')) {
                        v.name = v.name + '市'
                    }
                    break;
            }
        }
    }
    return arr.children
}


let oldData;
/**
 * 
 * @param {dom} dom 节点
 * @param {Object} data 
 */
const ncovInfoMapChart = async (dom, {
    chartData,
    time,
    setDetail,   // 获取当前的详细情况
}) => {
    const { name: areaName, detail } = chartData
    oldData = oldData ?? chartData
    setDetail(detail)
    const myEchart = echarts.init(dom)

    const option = {
        title: {
            text: `${areaName}疫情`,
            subtext: `数据时间：${time}\n数据来源于腾讯新闻`,
            left: 'center',
            textStyle: {
                color: "#fff"
            }
        },
        toolbox: {
            feature: {
                myTool: {
                    show: true,
                    title: '还原',
                    icon: 'path://M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5',
                    onclick() {
                        setDetail(detail)
                        option.series.map = 'china'
                        option.series.data = changeAreaNameForEchart(oldData)
                        myEchart.setOption(option)
                    },
                    iconStyle: {
                        borderColor: 'white'
                    }
                }
            }
        },
        tooltip: {
            show: true,
            formatter(params) {
                return `
                            <div style="text-align:left;">
                                <p>地区：${params.name}</p>
                                <p>确诊：${params.value}</p>
                            </div>
                        `
            }
        },
        visualMap: {
            type: 'piecewise',
            pieces: [
                {
                    gte: 10000,
                    label: "≥ 10000",
                    color: "rgb(102,2,8)"
                }, {
                    gte: 1000,
                    lte: 9999,
                    label: "1000-9999",
                    color: "rgb(140,13,13)"
                }, {
                    gte: 100,
                    lte: 999,
                    label: "100-999",
                    color: "rgb(204,41,41)"
                }, {
                    gte: 10,
                    lte: 99,
                    label: "10-99",
                    color: "rgb(255,123,105)"
                }, {
                    gte: 1,
                    lte: 9,
                    label: "1-9",
                    color: "rgb(255,170,133)"
                }, {
                    value: 0,
                    color: "#ffffff"
                }
            ],
            textStyle: {
                color: "#fff"
            }
        },
        series: {
            name: 'ncov',
            type: 'map',
            map: await changeAreaMap(areaName),
            roam: false,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data: changeAreaNameForEchart(chartData)
        }
    };
    myEchart.setOption(option)
    myEchart.on('click', 'series', async ({ data = {} }) => {
        if (data.children) {
            myEchart.showLoading()
            setDetail(data.detail)
            option.series.map = await changeAreaMap(data.name)
            option.series.data = changeAreaNameForEchart(data)
            myEchart.setOption(option)
            myEchart.hideLoading()
        }
    })
    return myEchart
}

// 仪表板
const drawGauge = async (dom, {
    data
}) => {
    const myEchart = echarts.init(dom)
    const option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: 'CPU',
                type: 'gauge',
                data: [{ value: data, name: '使用率' }],
                radius: '90%',
                axisLine: {
                    lineStyle: {
                        width: 10,
                        color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitNumber: 5,
                splitLine: {
                    length: 20
                },
                axisTick: {
                    splitNumber: 2
                },
                pointer: {
                    width: 5
                },
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                center: ['50%', '60%']
            }
        ]
    }
    myEchart.setOption(option)
    return myEchart
}

const drawPie = async (dom, {
    data
}) => {
    const myEchart = echarts.init(dom)
    const option = {
        dataset: {
            source: data
        },
        color: ['#ff4500', 'lime'],
        series: [
            {
                type: 'pie',
                radius: ['60%', '80%'],
                avoidLabelOverlap: false,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    label: {
                        show: true,
                        fontWeight: 'bold',
                        formatter: '{c}'
                    }
                },
                label: {
                    show: false,
                    position: 'center'
                },
                itemStyle: {
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            }
        ]
    }
    myEchart.setOption(option)
    return myEchart
}

const IsFullContext = React.createContext(false)

export {
    ncovInfoMapChart,
    IsFullContext,
    drawGauge,
    drawPie
}
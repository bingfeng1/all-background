import React, { useState, useEffect, useRef, useContext } from 'react'
import { reqGetNcovDetail } from '../../api'
import { ncovInfoMapChart, IsFullContext } from '../../utils/charts'

// 疫情信息
const NcovInfo = () => {
    const [chart, setChart] = useState(undefined)
    const map_ref = useRef(undefined)
    const isFull = useContext(IsFullContext)

    useEffect(() => {
        getChinaInfo()
    }, [])

    useEffect(() => {
        if (chart) {
            setTimeout(async () => {
                chart.then(v=>v.resize())
            }, 100)
        }
    }, [isFull])

    // 从第三方获取在线疫情
    const getChinaInfo = async () => {
        // 获取全国数据
        const result = await reqGetNcovDetail()
        // 处理数据
        const { data } = result
        const {
            lastUpdateTime, //数据更新时间
            areaTree,   // 数据树
        } = data

        // 处理区域树
        function dealAreaTree(areaTree, list = []) {
            for (let v of areaTree) {
                const { name, today, total, children } = v
                let temp = {
                    name,
                    value: total.nowConfirm
                }
                // 递归处理
                if (children) {
                    temp.children = []
                    dealAreaTree(children, temp.children)
                }
                list.push(temp)

            }
            return list
        }

        const chartData = dealAreaTree(areaTree)
        setChart(ncovInfoMapChart(map_ref.current, {
            chartData: chartData[0],
            time: lastUpdateTime
        }))
    }

    return (
        <>
            <div style={{ height: '100%' }} ref={map_ref}>

            </div>
        </>
    )
}

export default NcovInfo
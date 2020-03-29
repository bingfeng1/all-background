import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'

// 疫情信息
const NcovInfoDetail = ({ detail }) => {
    // 处理详情信息，将其分解组装为list
    const dealDetail = (detail) => {
        const { total = {} } = detail
        const list = []
        // 拼接现有确证
        list.push({
            title: '现有确诊',
            data: total.nowConfirm,
            color: 'rgb(255, 106, 87)'
        })
        // 拼接累计确诊
        list.push({
            title: '累计确诊',
            data: total.confirm,
            color: 'rgb(232,49,50)'
        })
        // 拼接累计治愈
        list.push({
            title: '累计治愈',
            data: total.heal,
            color: 'rgb(16,174,181)'
        })
        // 拼接累计死亡
        list.push({
            title: '累计死亡',
            data: total.dead,
            color: 'black'
        })

        return {
            list
        }
    }

    const [cardList, setCardList] = useState([])

    useEffect(() => {
        setCardList(dealDetail(detail).list)
    }, [detail])

    const Card = ({ title, data, color }) => {
        return (
            <Col span={12}>
                <div className="data_card">
                    <div className="title">{title}</div>
                    <hr />
                    <div className="data" style={{ color }}>{data ?? 0}</div>
                </div>
            </Col>
        )
    }
    return (
        <div>
            <Row>
                {
                    cardList.map(v => (
                        <Card {...v} key={v.title} />
                    ))
                }
                {
                    detail?.today?.tip && (
                        <Col span={24}>
                            <div className="data_card">
                                <div className="tip">{detail.today.tip}</div>
                            </div>
                        </Col>
                    )
                }
            </Row>
        </div>
    )
}

export default NcovInfoDetail
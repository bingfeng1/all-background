import React from 'react'
import { Card, Row, Col } from 'antd'
import PerformanceDetail from '../../../components/Extend/W3C/PerformanceDetail'

const W3capi = ()=>{
    return (
        <section className="">
            <Row
                gutter={[10]}>
                <Col xl={12} xs={24} sm={24} md={24}>
                    <Card title="">
                        <PerformanceDetail></PerformanceDetail>
                    </Card>
                </Col>
            </Row>
        </section>
    )
}

export default W3capi
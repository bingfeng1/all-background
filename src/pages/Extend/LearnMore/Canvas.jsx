import React from 'react'
import { Card, Row, Col } from 'antd'
import PointToLine from '../../../components/Extend/Canvas/PointToLine'
import './canvas.less'

const Canvas = ()=>{
    return (
        <section className="canvas">
            <Row
                gutter={[10]}>
                <Col xl={12} xs={24} sm={24} md={24}>
                    <Card title="多点移动">
                        <PointToLine></PointToLine>
                    </Card>
                </Col>
            </Row>
        </section>
    )
}

export default Canvas
import React, { useEffect, useRef } from 'react'

// 点移动，自动画线
const PointToLine = ({
    // 点的数量
    num = 50,
    // 点移动速度
    speed = 2,
    // 查找点连接线
    len = 100,
}) => {
    const canvas = useRef(undefined)
    useEffect(() => {
        setTimeout(() => {
            let c = canvas.current
            let ctx = c.getContext('2d')
            // 存放点位
            let points = []

            // 获取父级宽高
            let { clientWidth: parentWidth, clientHeight: parentHeight } = c?.parentElement ?? document.documentElement
            c.width = parentWidth
            c.height = parentHeight

            // 增加随机点位
            for (let i = 0; i < num; i++) {
                let v = {
                    x: Math.random() * parentWidth,
                    y: Math.random() * parentHeight,
                    speedX: (Math.random() - .5) * speed,
                    speedY: (Math.random() - .5) * speed
                }
                points.push(v)

                // 将点放入canvas中
                ctx.beginPath()
                ctx.arc(v.x, v.y, .5, 0, Math.PI * 2)
                ctx.fill()
            }

            // 点连线
            function pointOfLine(points) {
                for (let i = 0; i < points.length - 1; i++) {
                    // 利用类似冒泡排序的方式，但还需要进一步排重
                    for (let j = i + 1; j < points.length; j++) {
                        let length = Math.sqrt((points[i].x - points[j].x) ** 2 + (points[i].y - points[j].y) ** 2)
                        // 将小于这个标准的点，变为线
                        if (length < len) {
                            ctx.beginPath()
                            ctx.save()
                            ctx.globalAlpha = 1 - length / len
                            ctx.moveTo(points[i].x, points[i].y)
                            ctx.lineTo(points[j].x, points[j].y)
                            ctx.stroke()
                            ctx.restore()
                            ctx.closePath()
                        }
                    }
                }
            }

            pointOfLine(points)

            function animate() {
                ctx.clearRect(0, 0, parentWidth, parentHeight)
                for (let v of points) {
                    if (v.x > parentWidth || v.x < 0) {
                        v.speedX = -v.speedX
                    }
                    if (v.y > parentHeight || v.y < 0) {
                        v.speedY = -v.speedY
                    }
                    v.x += v.speedX
                    v.y += v.speedY

                    ctx.beginPath()
                    ctx.arc(v.x, v.y, 1, 0, Math.PI * 2)
                    ctx.fill()
                }
                pointOfLine(points)
                requestAnimationFrame(() => {
                    animate()
                })
            }

            animate()
        })
    }, [])

    return (
        <canvas ref={canvas}></canvas>
    )
}

export default PointToLine
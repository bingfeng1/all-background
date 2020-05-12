import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'

// 前端性能监控
const PerformanceDetail = () => {
    const [perf, setPerf] = useState({})

    useEffect(() => {
        // 正常来讲应该在onload之后执行
        setTimeout(() => {

            setPerf(() => {
                const {
                    memory, // 其是 Chrome 添加的一个非标准扩展，这个属性提供了一个可以获取到基本内存使用情况的对象。不应该使用这个非标准的 API。
                    navigation, // 对象提供了在指定的时间段里发生的操作相关信息，包括页面是加载还是刷新、发生了多少次重定向等等。Not available in workers.
                    timing, // 对象包含延迟相关的性能信息。Not available in workers.
                    timeOrigin  // 返回性能测量开始时的时间的高精度时间戳。
                } = performance

                const {
                    // jsHeapSizeLimit,    // 内存大小的限制
                    totalJSHeapSize,    //表示 总内存的大小。
                    usedJSHeapSize  // 表示可使用的内存的大小。
                } = memory

                // const {
                //     type,   // 表示的页面打开的方式。默认为0. 可取值为0、1、2、255
                //     redirectCount   // 如果有重定向的话，页面通过几次重定向跳转而来，默认为0
                // } = navigation

                const {
                    navigationStart,    // 同一个浏览器上一个页面卸载结束时的时间戳。如果没有上一个页面的话，那么该值会和fetchStart的值相同。
                    redirectStart,  //是第一个http重定向开始的时间戳，如果没有重定向，或者重定向到一个不同源的话，那么该值返回为0.
                    redirectEnd,    // 最后一个HTTP重定向完成时的时间戳。如果没有重定向，或者重定向到一个不同的源，该值也返回为0.
                    fetchStart, //浏览器准备好使用http请求抓取文档的时间(发生在检查本地缓存之前)。
                    domainLookupStart,  //DNS域名查询开始的时间，如果使用了本地缓存话，或 持久链接，该值则与fetchStart值相同。
                    domainLookupEnd,    //DNS域名查询完成的时间，如果使用了本地缓存话，或 持久链接，该值则与fetchStart值相同。
                    connectStart,   //HTTP 开始建立连接的时间，如果是持久链接的话，该值则和fetchStart值相同，如果在传输层发生了错误且需要重新建立连接的话，那么在这里显示的是新建立的链接开始时间。
                    secureConnectionStart,  //HTTPS 连接开始的时间，如果不是安全连接，则值为 0
                    connectEnd, //HTTP完成建立连接的时间(完成握手)。如果是持久链接的话，该值则和fetchStart值相同，如果在传输层发生了错误且需要重新建立连接的话，那么在这里显示的是新建立的链接完成时间。
                    requestStart,   //http请求读取真实文档开始的时间，包括从本地读取缓存，链接错误重连时。
                    responseStart,  //开始接收到响应的时间(获取到第一个字节的那个时候)。包括从本地读取缓存。
                    responseEnd,    //HTTP响应全部接收完成时的时间(获取到最后一个字节)。包括从本地读取缓存。
                    unloadEventStart,   // 前一个网页（和当前页面同域）unload的时间戳，如果没有前一个网页或前一个网页是不同的域的话，那么该值为0.
                    unloadEventEnd, //和 unloadEventStart 相对应，返回是前一个网页unload事件绑定的回调函数执行完毕的时间戳。
                    domLoading, //开始解析渲染DOM树的时间。
                    domInteractive, //完成解析DOM树的时间（只是DOM树解析完成，但是并没有开始加载网页的资源）。
                    domContentLoadedEventStart, //DOM解析完成后，网页内资源加载开始的时间。
                    domContentLoadedEventEnd,   //DOM解析完成后，网页内资源加载完成的时间。
                    domComplete,    //DOM树解析完成，且资源也准备就绪的时间。Document.readyState 变为 complete，并将抛出 readystatechange 相关事件。
                    loadEventStart, //load事件发送给文档。也即load回调函数开始执行的时间，如果没有绑定load事件，则该值为0.
                    loadEventEnd,   //load事件的回调函数执行完毕的时间，如果没有绑定load事件，该值为0.
                } = timing

                // 内存是否泄漏
                let memoryUse = "内存情况正常";
                if ((usedJSHeapSize - totalJSHeapSize) > 0) {
                    memoryUse = "发生内存泄漏"
                }

                let redirectTime = redirectEnd - redirectStart,   //重定向耗时
                    DNSTime = domainLookupEnd - domainLookupStart,  // DNS查询耗时
                    TCPTime = connectEnd - connectStart,    //TCP连接耗时
                    HTTPTime = responseEnd - responseStart, // HTTP请求耗时
                    DomTreeTime = domComplete - domInteractive, // 解析DOM树耗时
                    writeScreenTime = responseStart - navigationStart,  //白屏时间
                    DomReadyTime = domContentLoadedEventEnd - navigationStart,  // DOMready时间
                    onloadTime = loadEventEnd - navigationStart;    // onload时间

                return {
                    memoryUse,
                    totalJSHeapSize:(totalJSHeapSize/1024/1024).toFixed(2),
                    usedJSHeapSize:(usedJSHeapSize/1024/1024).toFixed(2),
                    redirectTime,
                    DNSTime,
                    TCPTime,
                    HTTPTime,
                    DomTreeTime,
                    writeScreenTime,
                    DomReadyTime,
                    onloadTime
                }
            })
        }, 500)
    }, [])

    return (
        <div>
            <p>总内存的大小：{perf.totalJSHeapSize}MB。可使用内存大小：{perf.usedJSHeapSize}MB。内存情况：{perf.memoryUse}</p>
            <Row>
                <Col span={12}>
                    <p>重定向耗时：{perf.redirectTime}ms</p>
                </Col>
                <Col span={12}>
                    <p>DNS查询耗时：{perf.DNSTime}ms</p>
                </Col>
                <Col span={12}>
                    <p>TCP链接耗时：{perf.TCPTime}ms</p>
                </Col>
                <Col span={12}>
                    <p> HTTP请求耗时：{perf.HTTPTime}ms</p>
                </Col>
                <Col span={12}>
                    <p>解析DOM树耗时：{perf.DomTreeTime}ms</p>
                </Col>
                <Col span={12}>
                    <p>白屏时间：{perf.writeScreenTime}ms</p>
                </Col>
                <Col span={12}>
                    <p>DOMready时间：{perf.DomReadyTime}ms</p>
                </Col>
                <Col span={12}>
                    <p>onload时间：{perf.onloadTime}ms</p>
                </Col>
            </Row>
        </div>
    )
}

export default PerformanceDetail;
import React, { Component, PropTypes } from 'react'
import Pics from '../components/Pics'
import MsgBox from '../components/MsgBox'
// import WS from '../components/wsutils'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.refreshClick = this.refreshClick.bind(this)
        this.initIndex = this.initIndex.bind(this)
        this.queryTimeout = this.queryTimeout.bind(this)
        this.ws = window.ws
        this.state = {list:[]}
    }
    
    componentDidMount() {
        this.initIndex()
        this.queryTimeout()
    }
    queryTimeout() {
        let msg = JSON.stringify({type:'INDEX', pageIndex:1})
        setTimeout(() => this.ws.readyState == 1?this.ws.send(msg):this.queryTimeout(), 1000)
    }
    initIndex() {
        this.ws.onmessage = msg => {
            console.log(msg)
            let tmp = msg.data
            try {
            tmp = JSON.parse(tmp)
            } catch (error) {
               console.log(error) 
            }
            switch(tmp.type) {
                case 'list':
                this.setState({list:tmp.docs})
                break;
                case 'message':
                break;
            }
        }
    }
    refreshClick() {
        
    }
    render(){
        return (
            <Pics items={this.state.list}/>
        )
    }
}
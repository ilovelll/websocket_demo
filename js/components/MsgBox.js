import React, {Component, PropTypes} from 'react'

export default class MsgBox extends Component {
    render() {
        return (
            <ul>
                {this.props.items.map((item, index) => 
                    <li data-pid={item.pid} key={index}><img alt={item.title} src={item.srcs[0]} /></li>
                )}
            </ul>
        )
    }
}

MsgBox.PropTypes = {
    items: PropTypes.array||PropTypes.object,
}

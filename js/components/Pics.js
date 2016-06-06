import React, { PropTypes, Component} from 'react'

export default class Pics extends Component {
    render() {
        return (
            <ul>
                {this.props.items.map((item, index) => <li data-pid={item.pid} key={index}><img alt={item.title} src={item.srcs[0]} /></li>)}
            </ul>
        )
    }
}

Pics.PropTypes = {
    items: PropTypes.array||PropTypes.object,
    type: PropTypes.string
}
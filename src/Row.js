import React, {Component} from 'react'


class Row extends Component{

render(){
    console.log(this.props)
    return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.country}</td>

                <td>{this.props.new_cases}</td>

                <td>{this.props.total_cases}</td>

                <td>{this.props.new_deaths}</td>

                <td>{this.props.total_deaths}</td>

                <td>{this.props.new_recoveries}</td>

                <td>{this.props.total_recoveries}</td>

                </tr>
        )
    }
}    

export default Row

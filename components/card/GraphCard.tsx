import React, { Component } from 'react'
import { Text, View, ViewStyle } from 'react-native'
import Graph from '../../components/graph/Graph'
import { Data } from '../../interfaces/Data'
import Card from './Card';

interface Props {
    data: Data,
    cardStyle?: ViewStyle,
    graphStyle?: ViewStyle
}

export class GraphCard extends Component<Props> {
    render() {
        return (
            <Card
                data={this.props.data}
                graph={true}
                style={this.props.cardStyle}
            >
                <Graph 
                    style={this.props.graphStyle}
                    data={this.props.data}
                />
            </Card>
        )
    }
}

export default GraphCard

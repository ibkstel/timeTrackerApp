import React, { Component } from 'react'
import {BarChart} from 'react-native-svg-charts';
import { Data } from '../../interfaces/Data';
import { getDiff } from '../../utils/time/duration';
import { lightColor } from '../../screens/colors';
import { ViewStyle } from 'react-native';

interface Props {
    data: Data,
    style?: ViewStyle
}

export class Graph extends Component<Props>{
    render() {
        return (
            <BarChart
                style={{ height: 200, ...this.props.style }}
                svg={{ fill: lightColor }} 
                contentInset={{ top: 30, bottom: 30 }} 
                data={this.props.data.Durations.map((i) => getDiff(i.startDate, i.endDate))}
            />
        )
    }
}

export default Graph

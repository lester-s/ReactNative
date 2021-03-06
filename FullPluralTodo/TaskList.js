import React from 'react';
import {
    View,
    StyleSheet,
    ListView,
    PropTypes,
    TouchableNativeFeedback,
    Text
} from 'react-native';

import TaskRow from './TaskRow/Component'

class TaskList extends React.Component {

    constructor(props, context) {
        super(props, context);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.todos),
        }
    }

    renderRow(todo) {
        return (
            <TaskRow todo={todo}
                     onDone={this.props.onDone}
            />
        );
    }

    componentWillReceiveProps(nextProps) {
        const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos);

        this.setState({dataSource});

    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    key={this.props.todos}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}/>

                <TouchableNativeFeedback
                    onPress={this.props.onAddStarted}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Add one</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        );
    }
}

TaskList.propTypes = {
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onAddStarted: React.PropTypes.func.isRequired,
    onDone: React.PropTypes.func.isRequired,
}


var styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#F7F7F7',
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        height: 60,
        borderColor: '#05A5D1',
        borderWidth: 2,
        backgroundColor: '#333',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600',

    }
})

export default TaskList;

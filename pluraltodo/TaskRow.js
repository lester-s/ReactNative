import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';


class TaskRow extends  React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.label}>{this.props.todo.task}</Text>

                <TouchableNativeFeedback
                    onPress = {this.onDonePressed.bind(this)}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.doneButton}>
                        <Text>Done</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        );
    }

    onDonePressed(){
        this.props.onDone(this.props.todo);
    }
}

TaskRow.propTypes = {
    onDone: React.PropTypes.func.isRequired,
    todo: React.PropTypes.shape({
        task: React.PropTypes.string.isRequired,
    }).isRequired,
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        borderWidth: 1,
        borderColor: '#E7E7E7',
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    label:{
        fontSize: 20,
        fontWeight: '300',
    },
    doneButton:{
        borderRadius:5,
        backgroundColor: '#EAEAEA',
        padding:5,
    }
})

export default TaskRow;
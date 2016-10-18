import Exponent from 'exponent';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
} from 'react-native';

import TaskList from './TaskList';
import TaskForm from './TaskForm';

class PluralTodo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: [
                {
                    task: 'learn react native',
                },
                {
                    task: 'learn redux',
                }
            ]

        };
    }

    render() {
        return (
            <Navigator initialRoute={{name: 'tasklist', index: 0}}
                       renderScene={this.renderScene.bind(this)}
                       ref = {((nav) => {
                           this.nav = nav;
                       })}
                       configureScene={this.configureScene}
            />


        );
    }

    renderScene(route, nav) {
        switch (route.name){
            case 'taskform':
                return (
                    <TaskForm onCancel={this.onCancel.bind(this)}
                              onAdd={this.onAdd.bind(this)}
                    />
                    );
                break;
            default:
                return(
                    <TaskList todos={this.state.todos}
                              onDone={this.onDone.bind(this)}
                              onAddStarted={this.onAddStarted.bind(this)}/>
                );
                break;
        }
    }

    onAddStarted(){
        this.nav.push({
            name: 'taskform',
        })
    }

    configureScene(){
        return Navigator.SceneConfigs.FloatFromBottomAndroid;
    }

    onCancel(){
        console.log('cancel click');
        this.nav.pop();
    }

    onAdd(task){
        console.log('task added:', task);
        this.state.todos.push({
            task: task,
        });

        this.setState({todos: this.state.todos});
        this.nav.pop();
    }

    onDone(todo){
        console.log('Task completed', todo);
        const filteredTodos = this.state.todos.filter((filterTodo) => {
            return filterTodo !== todo;
        });

        this.setState({todos: filteredTodos});
    }

}


Exponent.registerRootComponent(PluralTodo);

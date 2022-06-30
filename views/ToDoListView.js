import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, ShadowPropTypesIOS, ScrollView, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Task = (data) => (
  <View style={styles.taskWrapper}>
    <TouchableOpacity onPress={() => data.setChecked()}>
      <Icon
        name={data.completed ? "check" : "square"}
        size={20}
        color="blue"
        style={{ marginLeft: 15 }}
      />
    </TouchableOpacity>

    <View>
      <Text
        style={[styles.task, data.completed && styles.verticalLine]}>
        {data.title}</Text>
    </View>
    <Icon
      name="trash-2"
      size={20}
      color="blue"
      style={{ marginLeft: 'auto' }}
      onPress={data.delete}
    />
  </View>
)

const ToDoListView = (props) => {
  const { goForFetch, fromFetch, renderItem, FlatListItemSeparator, dataSource, loading } = props
  const [todos, setTodos] = useState(dataSource)

  handleUpdateTodo = () => {
    console.log("dataSource", dataSource)
    setTodos(dataSource)
  }

  handleDeleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        if (todo.id !== id) return true
      })
    )
  }

  handleChecked = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) todo.completed = !todo.completed;
        return todo;
      })
    )
  }
  return (
    <View>
      <View style={{ margin: 18 }}>
        <Button
          title={'Get To Do List'}
          onPress={handleUpdateTodo}
          color='blue'
        />
      </View>

      <View style={{ margin: 18, textAlign: 'center' }}>
        {fromFetch ?
          <View style={styles.container}>
            <ScrollView>
              {
                todos.map((task) => (
                  <Task
                    title={task.title}
                    id={task.id}
                    completed={task.completed}
                    setChecked={() => handleChecked(task.id)}
                    delete={() => handleDeleteTodo(task.id)}
                  />
                ))

              }
            </ScrollView>
          </View> : <Text>no data yet</Text>
        }
        {loading &&
          <View>
            <ActivityIndicator size="large" color="#0c9" />
            <Text>Fetching Data</Text>
          </View>
        }
      </View>
    </View>
  )
}
export default ToDoListView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  taskWrapper: {
    marginTop: '5%',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    width: '100%',
    alignItems: 'stretch',
    minHeight: 40,
  },
  task: {
    paddingBottom: 20,
    paddingLeft: 10,
    marginTop: 6,
    borderColor: '#F0F0F0',
    borderBottomWidth: 1,
    textDecorationLine: 'none',
    flexShrink: 1,
    height: 'auto',
    maxWidth: 200
  },
  verticalLine: {
    textDecorationLine: 'line-through',
  }
});
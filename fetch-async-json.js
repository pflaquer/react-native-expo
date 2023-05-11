import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
//fetch request to API..then execute 
//fetch for API or to render raw content

export default class App extends Component {

state = {
  loading: true,
  error: false,
  posts: []
}
data = 'hello';
  UNSAFE_componentWillMount = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const posts = await response.json()

      this.setState({loading:false, posts});
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  renderPost = ({id, title, body}, i) => {
    return (
      <View
        key={id}
        style={styles.post}
      >
        <View style={styles.postNumber}>
          <Text>
            {i**2}
          </Text>
        </View>
        <View style={styles.postContent}>
          <Text>
            {title}
          </Text>
          <Text style={styles.postBody}>
            {body}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const {posts, loading, error} = this.state

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    else if (error) {
      return (
        <View style={styles.center}>
          <Text>
            Failed to load posts!
          </Text>
        </View>
      )
    }
else {
    return (
      <ScrollView style={styles.container}>
        {posts.map(this.renderPost)}
      </ScrollView>
    )
  }
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000'
  },
  post: {
    flexDirection: 'row',
  },
  postNumber: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25,
    paddingRight: 15,
    backgroundColor: 'yellow',
  },
  postBody: {
    marginTop: 10,
    fontSize: 12,
    color: 'lightgray',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

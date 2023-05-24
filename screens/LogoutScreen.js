import * as React from 'react'
import firebase from 'firebase'
import {
Text,
View,
} from 'react-native'

export default class Logout extends React.Component {
    componentDidMount(){
        firebase.auth().signOut();
        this.props.navigation.navitage("Login")
    }
    render() {
        return (
            <View>
                <Text>Logout</Text>
            </View>
        )
    }


}

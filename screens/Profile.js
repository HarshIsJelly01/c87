import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    Switch
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import firebase from "firebase";
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';


export default class Profile extends Component {

    constructor(){
        super()
        this.state={
            isEnabled:false,
            light_theme:true,
            
        }
        
    }

    toggleSwitch() {
        const previous_state = this.state.isEnabled;
        const theme = !this.state.isEnabled ? "dark" : "light";
        var updates = {};
        updates[
            "/users/" + firebase.auth().currentUser.uid + "/current_theme"
        ] = theme;
        firebase
            .database()
            .ref()
            .update(updates);
        this.setState({ isEnabled: !previous_state, light_theme: previous_state });
    }

    async fetchUser(){
        let theme, name, image;
        await firebase.database().ref("/users/"+ firebase.auth().currentUser.uid)
        .on("value", (index)=>{
            theme = index.val().current_theme;
        })
        this.setState({light_theme : theme=='light' ? true : false ,  isEnabled: theme === "light" ? false : true,});
    }
    componentDidMount(){
        this.fetchUser();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    
                }}>
                  <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>Spectagram</Text>
                    </View>
                    <View style={styles.themeContainer}>
                        <Switch
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={this.state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleSwitch()}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28)
    },
    screenContainer: {
        flex: 0.85
    },
    profileImageContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage: {
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70)
    },
    nameText: {
        color: "white",
        fontSize: RFValue(40),
        marginTop: RFValue(10)
    },
    themeContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: RFValue(20)
    },
    themeText: {
        color: "white",
        fontSize: RFValue(20),
        marginRight: RFValue(15)
    }
});
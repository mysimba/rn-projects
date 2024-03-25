import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({name, bgColor}) => {
    return (
        <TouchableOpacity hitSlop={{top:10, bottom: 10}} style={{paddingHorizontal: 6, backgroundColor: bgColor}}>
            <Ionicons name={name} size={24} color="black" />
        </TouchableOpacity>
    )
}

const Header = () => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>친구</Text>

            <View style={{flexDirection: "row"}}>
                <IconButton name="search-outline"/>
                <IconButton name="person-add-outline"/>
                <IconButton name="musical-notes-outline"/>
                <IconButton name="settings-outline"/>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    title: {
        fontSize: 22,
        fontWeight: "bold"
    }
})
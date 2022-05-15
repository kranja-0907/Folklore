import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, StatusBar } from "react-native";
import PostGridTile from "../components/home/PostGridTile";
import EndPoints from '../constants/endPoints'

export default function HomeScreen({ navigation }) {
    const [postItems, setPostItems] = useState([])

    useEffect(() => {
        getAllPosts()
    }, [])

    async function getAllPosts() {
        await fetch(EndPoints.getStoriesEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    setPostItems(result)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    function renderPostItem(itemData) {
        const postItemProps = {
            idStory: itemData.item.IDStory,
            title: itemData.item.StoryName,
            summary: itemData.item.Summary,
            pubDate: itemData.item.PubDate,
            imageBlob: itemData.item.ImageBlob,
            idUser: itemData.item.UserID,
            commentNbr: itemData.item.CommentNbr,
            score: itemData.item.Score,
            username: itemData.item.Username
        }

        return <PostGridTile
            {...postItemProps}
            onPress={pressHandler} />

        function pressHandler() {
            navigation.navigate("PostFullScreen", { idStory: itemData.item.IDStory })
        }
    }



    return (
            <View style={styles.rootContainer}>
                <FlatList data={postItems} renderItem={renderPostItem}
                    keyExtractor={(item, index) => {
                        return item.IDStory
                    }}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'black'
    },
})
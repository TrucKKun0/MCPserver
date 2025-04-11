import {config} from "dotenv";
import {TwitterApi} from "twitter-api-v2";
config();

const twitterClient = new TwitterApi({
    appKey: process.env.Twitter_Api_Key,
    appSecret: process.env.Twitter_Api_Secret_Key,
    accessToken: process.env.Twitter_Access_Token,
    accessSecret: process.env.Twitter_Access_Secret,
});

export async function createPost(status) {
    try {
        const newPost = await twitterClient.v2.tweet(status);
        return {
            content: [
                {
                    type: "text",
                    text: `The post has been created with id ${newPost.data.id}`
                }
            ]
        };
    } catch (error) {
        console.error('Twitter API Error:', error);
        return {
            content: [
                {
                    type: "text",
                    text: `Error creating post: ${error.message}`
                }
            ]
        };
    }
}

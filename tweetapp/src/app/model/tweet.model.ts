import { TweetReply } from "./tweet-reply.model";

export interface Tweet {
    tweetId:String
	tweet:String;
    reply:TweetReply[];
    userName:String;
    likes:String[];
    date:Date;

}

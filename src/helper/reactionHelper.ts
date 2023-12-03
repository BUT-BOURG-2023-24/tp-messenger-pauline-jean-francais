import msgReaction from "../msgReact";

export class ReactionHelper {
    public static setReaction (reaction: string): msgReaction | null
    {
        switch (reaction) {
            case "HAPPY":
                return msgReaction.HAPPY;
            case "SAD":
                return msgReaction.SAD;
            case "THUMBSUP":
                return msgReaction.THUMBSUP;
            case "THUMBSDOWN":
                return msgReaction.THUMBSDOWN;
            case "LOVE":
                return msgReaction.LOVE;
            default:
                return null;
        }
    }
}
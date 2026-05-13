const messageRouter = Router();
messageRouter.post("/send",
    multer_local({
        custom_path: "messages",
        custom_types: multer_enum.image
    }).array("attachments", 3),
    validation(MV.sendMessageSchema),
    MS.sendMessage
);
messageRouter.get("/",
    authentication,
    MS.getMessages
);
messageRouter.get("/:messageId",
    authentication,
    validation(MV.getMessageSchema),
    MS.getMessage
);
export default messageRouter;
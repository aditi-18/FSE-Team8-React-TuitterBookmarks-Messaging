import {api, userDeletesAMessage, deleteConversation, createConversation, userMessagesAnotherUser, findMessageFromConversation} from "../services/message-service";

describe('MESSAGE API SERVICE', () => {
    const BASE_URL = "http://localhost:4000";
    const MESSAGES_API = `${BASE_URL}/api/users`;

    const MOCKED_USERS = [
        {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
        {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
      ]

      const mockMessage = [
        {
            "from": MOCKED_USERS[0],
            "conversation": "12",
            "message": "Hello",
            "sentOn": "2022-04-10T16:33:57.490+00:00",
            "_id": "abc12"
        }
    ]

    const mockConversation = {
       
        members: [MOCKED_USERS[0],MOCKED_USERS[1]],
        id: '625',
    };

    const mockDeletedConversation = {
        id: '625',
        members: [
            '123',
            '234'
        ],
    };

    const mockMessagesByConversation = [
        {
            "from": MOCKED_USERS[0],
            "conversation": "625",
            "message": "bro",
            "sentOn": "2022-04-10T16:34:37.690+00:00",
            "_id": "abc12"
        }
    ]

    const mockDeletedMessage = {
        id: 'def345',
        message: 'Test',
        from: MOCKED_USERS[0],
        conversation: '625',
    };

    it('can send a message', async () => {
        const mockAxios = jest.spyOn(api, 'post');
        api.post.mockImplementation(() =>
            Promise.resolve({data: mockMessage})
        );
        const userId = '123';
        const message = 'Hello';

        const newMessage = await userMessagesAnotherUser(userId, message);

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/message`,
            message
        );
        expect(newMessage).toStrictEqual(mockMessage);
        mockAxios.mockRestore();
    });

    it('can create a conversation', async () => {
        const mockPost = jest.spyOn(api, 'post');
        api.post.mockImplementation(() =>
            Promise.resolve({data: mockConversation})
        );
        const uid1 = '123';
        const uid2 = '234';
        const conversation = await createConversation(
            uid1,uid2
        );
        expect(mockPost).toHaveBeenCalledWith(
            `${MESSAGES_API}/conversation`,
            uid1,uid2
        );
        expect(conversation).toStrictEqual(
            mockConversation
        );
        mockPost.mockRestore();
    });

    it('delete a conversation for a user', async () => {
        const mockAxios = jest.spyOn(api, 'delete');
        api.delete.mockImplementation(() =>
            Promise.resolve({data: mockDeletedConversation})
        );
        const conversationId = '625';
        const conversationToBeDeleted = await deleteConversation(
            conversationId
        );

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/deleteConversation/${conversationId}`
        );
        expect(conversationToBeDeleted).toStrictEqual(
            mockDeletedConversation
        );
        mockAxios.mockRestore();
    });

    it('delete a message for a user', async () => {
        const mockAxios = jest.spyOn(api, 'delete');
        api.delete.mockImplementation(() =>
            Promise.resolve({data: mockDeletedMessage})
        );
        const userId = '123';
        const messageId = 'def345';
        const messageToBeDeleted = await userDeletesAMessage(userId, messageId);

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/${userId}/deletemessage/${messageId}`
        );
        expect(messageToBeDeleted).toStrictEqual(mockDeletedMessage);
        mockAxios.mockRestore();
    });

    it('fetch messages in a conversation', async () => {
        const mockAxios = jest.spyOn(api, 'get');
        api.get.mockImplementation(() =>
            Promise.resolve({data: mockMessagesByConversation})
        );
        const conversationId = '625';
        const messagesToBeFound = await findMessageFromConversation(
            conversationId
        );

        expect(mockAxios).toHaveBeenCalledWith(
            `${MESSAGES_API}/findMessages/${conversationId}`
        );
        expect(messagesToBeFound.data).toStrictEqual(mockMessagesByConversation);
        mockAxios.mockRestore();
    });
})
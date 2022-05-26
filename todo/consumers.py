from sqlite3 import Timestamp
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json

class CollaborateToDoConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.user = self.scope['user']
        if not self.user.is_authenticated:
            await self.close()
        self.todo_id =  self.scope['url_route']['kwargs']['todo_id']
        self.group_name = f'todo_{self.todo_id}'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'new_user',
                'username': self.user.username
            }
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive_json(self, content):
        content.update({
            'modified_by': self.user.username
        })
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'update_todo',
                'message': content
            }
        )

    async def new_user(self, event):
        await self.send_json({
            'operation': 'NEW USER',
            'username': event['username']
        })

    async def update_todo(self, event):
        await self.send_json(event['message'])


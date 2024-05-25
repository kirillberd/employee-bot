from aiogram import Router, F
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.types.web_app_info import WebAppInfo
from keyboards.miniapps_keyboards import addEmployeeKeyboard
# message router used with main dispatcher
message_router = Router()

# /start command handler in private messages
@message_router.message(F.chat.type == 'private', CommandStart())
async def command_start_handler(message: Message):
    await message.answer('Приветствую!\n')
# add user command
@message_router.message(Command('add'))
async def add_handler(message: Message):
    await message.answer('Форма для добавления пользователя:\n', reply_markup=addEmployeeKeyboard())

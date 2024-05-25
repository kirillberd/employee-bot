from aiogram import types
def addEmployeeKeyboard():
    my_web_app = types.web_app_info.WebAppInfo(url="https://9c76-195-19-48-107.ngrok-free.app")
    kb = [[types.KeyboardButton(text='Тест', web_app=my_web_app)]]
    keyboard = types.ReplyKeyboardMarkup(row_width=1, inline_keyboard=kb)
    return keyboard

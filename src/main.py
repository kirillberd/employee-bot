import asyncio
import logging
import sys
from os import getenv
from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from dotenv import load_dotenv
load_dotenv()

# main dispatcher
dp = Dispatcher()

TOKEN = getenv('BOT_TOKEN')

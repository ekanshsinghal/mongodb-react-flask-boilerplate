from mongoengine import *

class User(Document):
	email		= StringField(max_length=255, unique=True)
	password	= StringField(max_length=255, required=True)
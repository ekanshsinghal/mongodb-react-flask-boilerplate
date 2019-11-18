class BaseConfig(object):
	DEBUG = True
	DEVELOPMENT = True
	SECRET_KEY = "MAKE_THIS_SECURE"
	MONGODB_SETTINGS = {
		# 'USERNAME': None,
		# 'PASSWORD': None,
		# 'HOST': None,
		'PORT': 27017,
		'DB': 'database_name'
	}

class ProductionConfig(object):
	DEBUG = False
	DEVELOPMENT = False
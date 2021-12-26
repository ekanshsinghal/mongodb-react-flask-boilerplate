import os
from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, SignatureExpired, BadSignature)

from config import BaseConfig
from models import *

FORTNIGHTLY = 1296000
app = Flask(__name__, static_folder="./frontend/build")

try:
	# Database connection
	app.config.from_object(BaseConfig)
	db = MongoEngine(app)
except Exception as e:
	print(e)

# Salt user password
bcrypt = Bcrypt(app)

def generate_token(user, expiration=FORTNIGHTLY):
	s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
	token = s.dumps({ 'id': str(user.id) }).decode('utf-8')
	return token


def verify_token(token):
	s = Serializer(app.config['SECRET_KEY'])
	try:
		data = s.loads(token)
	except (BadSignature, SignatureExpired):
		return None
	return data

@app.route('/api/create_user', methods=['POST'])
def create_user():
	try:
		req = request.get_json()
		email = req['email']
		password = req['password']
	except:
		return jsonify()
	try:
		password_hash = bcrypt.generate_password_hash(password)
		new_user = User(email=email, password=password_hash)
		new_user.save()
	except db.NotUniqueError:
		return jsonify(message='User with that email already exists'), 409
	user = User.objects.get(email=email)
	return jsonify(token=generate_token(user=user))

@app.route("/api/get_token", methods=["POST"])
def get_token():
	req = request.get_json()
	try :
		user = User.objects.get(email=req["email"])
		if user:
			if bcrypt.check_password_hash(user.password, req["password"]):
				return jsonify(token=generate_token(user=user))
			return jsonify(message='wrong password')
	except DoesNotExist:
		return jsonify(error=True, message='user does not exist'), 403

@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
	req = request.get_json()
	is_valid = verify_token(req["token"])
	if is_valid:
		return jsonify(token_is_valid=True)
	else:
		return jsonify(token_is_valid=False), 403

if __name__ == "__main__":
	port = int(os.environ.get('PORT', 5000))
	app.run(host='localhost', port=port)
from functools import wraps

import jwt
from flask import request, jsonify

from base import SECRET_KEY

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return jsonify({
                'status': 'error',
                'message': 'Token is missing!'
            }), 401

        try:
            # ✅ Expect: "Bearer <token>"
            token = auth_header.split(" ")[1]

            payload = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=['HS256']
            )

            current_user = {
                'user_id': payload['user_id'],
                'user_role': payload['user_role']
            }

        except IndexError:
            return jsonify({
                'status': 'error',
                'message': 'Token format is invalid!'
            }), 401

        except jwt.ExpiredSignatureError:
            return jsonify({
                'status': 'error',
                'message': 'Token has expired!'
            }), 401

        except jwt.InvalidTokenError:
            return jsonify({
                'status': 'error',
                'message': 'Invalid token!'
            }), 401

        return f(current_user, *args, **kwargs)

    return decorated


def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user['user_role'] != 'admin':
            return jsonify(
                {'status': 'error', 'message': 'Admin access required!'}), 403
        return f(current_user, *args, **kwargs)

    return decorated


def user_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user['user_role'] != 'user':
            return jsonify(
                {'status': 'error', 'message': 'User access required!'}), 403
        return f(current_user, *args, **kwargs)

    return decorated


def get_current_user():
    token = request.headers.get('Authorization')
    if not token:
        return None

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return {
            'user_id': payload['user_id'],
            'user_role': payload['user_role']
        }
    except:
        return None

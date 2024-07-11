from flask import Flask, render_template, request, redirect, url_for, session
from datetime import timedelta
from model import *

app = Flask(__name__)
app.permanent_session_lifetime = timedelta(days=5)
app.secret_key = "sample_key"

@app.route('/')
def index():
    return redirect('/login')

@app.route('/login', methods=['POST', 'GET'])
def login():
    if 'users' in session:
        return redirect('/landing')
    else:
        if request.method == 'POST':
            username = request.form.get('uname')
            password = request.form.get('pass')
            if username == 'fyke' and password == '123':
                session.permanent = True
                session['users'] = username
                return redirect('/logging')
            elif username == '' and password == '' or username == '' or password == '': 
                return render_template('login.html', error=1)
            else:
                return render_template('login.html', error=2)
        else:
            return render_template('login.html')

@app.route('/logging')
def loading():
    return render_template('loading.html')

@app.route('/landing')
def landing():
    if 'users' in session:
        return render_template('landing.html')
    return redirect('/login')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')

@app.route('/settings')
def settings():
    if 'users' in session:
        return render_template('settings.html')
    else:
        return redirect('/login')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

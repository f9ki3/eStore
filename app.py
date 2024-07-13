from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from datetime import timedelta
from model import *

app = Flask(__name__)
app.permanent_session_lifetime = timedelta(days=5)
app.secret_key = "sample_key"


#THESE ARE ROUTES SECTIONS ONLY ROUTES
@app.route('/')
def index():
    return redirect('/login')

@app.route('/login', methods=['POST', 'GET'])
def login():
    if 'users' in session:
        return redirect('/estore')
    else:
        if request.method == 'POST':
            username = request.form.get('uname')
            password = request.form.get('pass')

            if username == '' and password == '' or username == '' or password == '': 
                return render_template('login.html', error=1)
            else:
                try: 
                    id, uname, passw = Accounts().login(username,password)
                    if username == uname and password == passw:
                        session.permanent = True
                        session['users'] = username
                        session['id'] = id
                        return redirect('/logging')
                    else:
                        return render_template('login.html', error=2)
                except TypeError:
                    return render_template('login.html', error=2)
                
        else:
            return render_template('login.html')

@app.route('/logging')
def loading():
    return render_template('loading.html')

@app.route('/estore')
def estore():
    if 'users' in session:
        return render_template('estore.html')
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


#These are API ENDPOINT SECTION
#API to get the information of account
@app.route('/get_account_info')
def get_account_info():
    if 'users' in session:
        id = session['id']
        account_info = Accounts().get_account(id)
        return jsonify(account_info)
    return '200'

if __name__ == '__main__':
    Database().createTables()
    app.run(debug=True, host='0.0.0.0')

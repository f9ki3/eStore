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
        return redirect('/landing')
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

@app.route('/app')
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

#These are API ENDPOINT SECTION
#API to get the information of account
@app.route('/get_account_info')
def get_account_info():
    if 'users' in session:
        id = session['id']
        account_info = Accounts().get_account(id)
        return jsonify(account_info)
    return '200'

@app.route('/upload-banner', methods=['POST'])
def updateBanner():
    if request.method == 'POST':
        if 'fileCover' in request.files:
            file = request.files['fileCover']
            # Handle the file processing here
            # Example: Save the file to a directory
            file.save('static/uploads/' + file.filename)
            id = session['id']
            cover = file.filename
            Accounts().updateCover(id, cover)
            return 'File uploaded successfully'
        else:
            return 'No file part in the request', 400
    else:
        return 'Method Not Allowed', 405

@app.route('/upload-profile', methods=['POST'])
def updateProfile():
    if request.method == 'POST':
        if 'fileProfile' in request.files:
            file = request.files['fileProfile']
            # Handle the file processing here
            # Example: Save the file to a directory
            file.save('static/uploads/' + file.filename)
            id = session['id']
            cover = file.filename
            Accounts().updateProfile(id, cover)
            return 'File uploaded successfully'
        else:
            return 'No file part in the request', 400
    else:
        return 'Method Not Allowed', 405

if __name__ == '__main__':
    Database().createTables()
    app.run(debug=True, host='0.0.0.0')

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

@app.route('/table')
def table():
    return render_template('tables.html')

@app.route('/login', methods=['POST', 'GET'])
def login():
    if 'users' in session:
        return redirect('/app')
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

from flask import request, session, jsonify

@app.route('/update_about', methods=['POST'])
def update_about():
    if request.method == 'POST':
        if 'id' in session:
            id = session['id']
            about = request.form.get('about')  # Retrieve 'about' from form data
            firstname = request.form.get('firstname')  
            lastname = request.form.get('lastname') 
            address = request.form.get('address')  # Retrieve 'address' from form data
            email = request.form.get('email')  # Retrieve 'email' from form data
            contact = request.form.get('contact')  # Retrieve 'contact' from form data
            Accounts().updateProfileInfo(id, about, firstname, lastname, address, email, contact)
            return 'Profile updated successfully'
        else:
            return 'Unauthorized', 401  # Handle case where session['id'] is not set
    else:
        return 'Method Not Allowed', 405

@app.route('/update_privacy', methods=['POST'])
def update_privacy():
    if request.method == 'POST':
        if 'id' in session:
            id = session['id']
            username = request.form.get('username')  # Retrieve 'about' from form data
            password = request.form.get('password')  
            Accounts().updatePrivacy(id, username, password)
            return 'Privacy updated successfully'
        else:
            return 'Unauthorized', 401  # Handle case where session['id'] is not set
    else:
        return 'Method Not Allowed', 405

@app.route('/insert_store', methods=['POST'])
def insert_Store():
    if request.method == 'POST':
        if 'id' in session:
            id = session['id']
            #file of store image upload
            file = request.files['storeImage']
            file.save('static/store/' + file.filename)
            storeLogo = file.filename
            storeName = request.form.get('storeName')
            storeOwner = request.form.get('storeOwner')
            storeEmail = request.form.get('storeEmail')
            storeAddress = request.form.get('storeAddress')
            managerFirstname = request.form.get('managerFirstname')
            managerLastname = request.form.get('managerLastname')
            managerContact = request.form.get('managerContact')
            managerEmail = request.form.get('managerEmail')
            result = Store().insertStore(storeLogo, storeName, storeOwner, storeEmail, storeAddress, managerFirstname, managerLastname, managerContact, managerEmail)
            return result
        else:
            return 'Unauthorized', 401  # Handle case where session['id'] is not set
    else:
        return 'Method Not Allowed', 405


if __name__ == '__main__':
    Database().createTables()
    app.run(debug=True, host='0.0.0.0')

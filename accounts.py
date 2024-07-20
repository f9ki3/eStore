from database import Database

class Accounts():
    #method to add new account
    def addAccount(self, accounts_date_created, accounts_username , accounts_password , accounts_fname , accounts_lname , accounts_email, accounts_contact, accounts_profile, accounts_address, accounts_status, accounts_about, accounts_cover, accounts_type, accounts_store_id ):
        conn = Database().conn
        data = accounts_date_created, accounts_username , accounts_password , accounts_fname , accounts_lname , accounts_email, accounts_contact, accounts_profile, accounts_address, accounts_status, accounts_about, accounts_cover, accounts_type, accounts_store_id 
        conn.cursor().execute('''
        INSERT INTO accounts (accounts_date_created, accounts_username , accounts_password , accounts_fname , accounts_lname , accounts_email, accounts_contact, accounts_profile, accounts_address, accounts_status, accounts_about, accounts_cover, accounts_type, accounts_store_id )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ''', data)
        conn.commit()
        print('Added a new account')
        conn.close()
    
    def login(self, username, password):
        data = username, password
        conn = Database().conn
        result = conn.cursor().execute('''SELECT id, accounts_username, accounts_password FROM accounts WHERE accounts_username = ? and accounts_password = ?''', data).fetchone()
        conn.close()
        return result

    def get_account(self, id):
        conn = Database().conn
        result = conn.cursor().execute(f'SELECT * FROM accounts WHERE id = {id}').fetchone()
        conn.close()
        return result
    
    def updateCover(self, id, cover):
        data = cover, id
        conn = Database().conn
        conn.cursor().execute('UPDATE accounts SET accounts_cover = ? WHERE id = ?', data)
        conn.commit()
        conn.close()
    
    def updateProfile(self, id, profile):
        data = profile, id
        conn = Database().conn
        conn.cursor().execute('UPDATE accounts SET accounts_profile = ? WHERE id = ?', data)
        conn.commit()
        conn.close()
    
    def updateProfileInfo(self, id, about, firstname, lastname, address, email, contact):
        data = about, firstname, lastname, address, email, contact, id
        conn = Database().conn
        conn.cursor().execute('UPDATE accounts SET accounts_about = ?, accounts_fname = ?, accounts_lname = ?, accounts_address = ?, accounts_email = ?, accounts_contact = ? WHERE id = ?', data)
        conn.commit()
        conn.close()
    
    def updatePrivacy(self, id, username, password):
        data = username, password, id
        conn = Database().conn
        conn.cursor().execute('UPDATE accounts SET accounts_username = ?, accounts_password = ? WHERE id = ?', data)
        conn.commit()
        conn.close()
    

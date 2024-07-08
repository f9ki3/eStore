from database import Database
from datetime import date

#Global connection
conn = Database().conn

class Accounts():
    #method to add new account
    def addAccount(self, accounts_date_created, accounts_username, accounts_password, accounts_fname, accounts_lname, accounts_email, accounts_contact, accounts_profile, accounts_address, accounts_status):
        data = accounts_date_created, accounts_username, accounts_password, accounts_fname, accounts_lname, accounts_email, accounts_contact, accounts_profile, accounts_address, accounts_status
        conn.cursor().execute('''
        INSERT INTO accounts (accounts_date_created, accounts_username, accounts_password, accounts_fname, accounts_lname, accounts_email, accounts_contact, accounts_profile, accounts_address, accounts_status)
        VALUES (?,?,?,?,?,?,?,?,?,?)
        ''', data)
        conn.commit()
        print('Added a new account')
        conn.close()
    
    



#Accounts().addAccount(date.today(), 'f9ki3', '123', 'Fyke', 'Lleva', 'floterina@gmail.com', '09120912091', 'profile.jpg', 'Block 5 Lot 3 Platinum Village, Loma De Gato, Marilao, Bulacan', 'active')
import sqlite3
from datetime import date

class Database:
    def __init__(self):
        self.conn = sqlite3.connect('estore.db')
    
    def createTables(self):
        self.createTableAccount()
        self.createTableProduct()
        self.createTableCategory()
        self.createTableUnit()
        self.createTableDelivery()
        self.createTableSupplier()
        self.createTableStore()
        self.createTableManager()
        self.conn.close()
        

    def createTableAccount(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            accounts_date_created TEXT,
            accounts_username TEXT, 
            accounts_password TEXT, 
            accounts_fname TEXT,
            accounts_lname TEXT,
            accounts_email TEXT,
            accounts_contact TEXT,
            accounts_profile TEXT,
            accounts_address TEXT,
            accounts_status TEXT,
            accounts_about TEXT,
            accounts_cover TEXT,
            accounts_type TEXT,
            accounts_store_id INTEGER,
            FOREIGN KEY (accounts_store_id) REFERENCES store(id)
        )
        ''')

    def createTableProduct(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_date_added TEXT,
            product_name TEXT,
            product_description TEXT,
            product_category_id INTEGER,
            product_unit_id INTEGER,
            product_unit TEXT,
            product_cost REAL,
            product_price REAL,
            FOREIGN KEY (product_category_id) REFERENCES category(id),
            FOREIGN KEY (product_unit_id) REFERENCES unit(id)
        )                
        ''')

    def createTableCategory(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_date_added TEXT,
            category_name TEXT,
            category_description TEXT,
            category_image TEXT
        )                
        ''')

    def createTableUnit(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS unit (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            unit_date_added TEXT,
            unit_name TEXT,
            unit_description TEXT
        )                
        ''')

    def createTableDelivery(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS delivery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            delivery_added_date TEXT,
            delivery_product TEXT,
            delivery_cost REAL,
            delivery_price REAL,
            delivery_qty INTEGER,
            delivery_expiration TEXT,
            delivery_company TEXT, 
            delivery_name TEXT,  
            delivery_email TEXT, 
            delivery_contact TEXT, 
            delivery_address TEXT
        )                
        ''')
    
    def createTableSupplier(self):
        cursor = self.conn.cursor()
        cursor.execute(''' 
        CREATE TABLE IF NOT EXISTS supplier ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            supplier_company TEXT, 
            supplier_name TEXT,  
            supplier_email TEXT, 
            supplier_contact TEXT, 
            supplier_address TEXT 
        )                
        ''')

    def createTableStore(self):
        cursor = self.conn.cursor()
        cursor.execute(''' 
        CREATE TABLE IF NOT EXISTS store ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            store_logo TEXT,
            store_name TEXT,
            store_owner TEXT,
            store_address TEXT,
            store_email,
            store_manager_id INTEGER,
            FOREIGN KEY (store_manager_id) REFERENCES manager(id)
        )                
        ''')

    def createTableManager(self):
        cursor = self.conn.cursor()
        cursor.execute(''' 
        CREATE TABLE IF NOT EXISTS manager ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            manager_firstname TEXT,
            manager_lastname TEXT,
            manager_contact TEXT,
            manager_email TEXT
        )                
        ''')


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
    



class Product():
    ...

class Categories():
    ...

class Units():
    ...

class Delivery():
    ...

class Supplier():
    ...

class Store:
    def insertStore(self, storeLogo, storeName, storeOwner, storeEmail, storeAddress, managerFirstname, managerLastname, managerContact, managerEmail):
        conn = Database().conn
        
        try:
            cursor = conn.cursor()
            dataManager = (managerFirstname, managerLastname, managerContact, managerEmail)
            
            cursor.execute('''
            INSERT INTO manager (manager_firstname, manager_lastname, manager_contact, manager_email)
            VALUES (?, ?, ?, ?)
            ''', dataManager)
            conn.commit()
            print('Inserted manager')
            
            cursor.execute('''
            SELECT id FROM manager WHERE manager_firstname = ? AND manager_lastname = ? AND manager_contact = ? AND manager_email = ?
            ''', dataManager)
            manager_id_row = cursor.fetchone()
            
            if manager_id_row:
                manager_id = manager_id_row[0]
                dataStore = (storeLogo, storeName, storeOwner, storeEmail, storeAddress, manager_id)
                
                cursor.execute('''
                INSERT INTO store (store_logo, store_name, store_owner, store_email, store_address, store_manager_id)
                VALUES (?, ?, ?, ?, ?, ?)
                ''', dataStore)
                conn.commit()
                print('Inserted store record!')
            else:
                print('Manager ID not found, insertion failed.')
        
        except Exception as e:
            conn.rollback()
            print(f'An error occurred: {e}')
        
        finally:
            conn.close()



class Manager():
    ...


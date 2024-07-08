import sqlite3


class Database:
    def __init__(self):
        self.conn = sqlite3.connect('estore.db')
    
    def createTables(self):
        self.createTableAccount()
        self.createTableProduct()
        self.createTableCategory()
        self.createTableUnit()
        self.createTableStocks()
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
            accounts_status TEXT
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

    def createTableStocks(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS stocks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            stock_added_date TEXT,
            stock_qty INTEGER,
            stock_expiration TEXT
        )                
        ''')


if __name__ == "__main__":
    db = Database()
    db.createTables()

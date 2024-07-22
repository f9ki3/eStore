from database import Database

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
                return 'Inserted store record!'
            else:
                print('Manager ID not found, insertion failed.')
        
        except Exception as e:
            conn.rollback()
            print(f'An error occurred: {e}')
        
        finally:
            conn.close()
    
    def insertStoreID(self, storeLogo, storeName, storeOwner, storeEmail, storeAddress, managerID):
        conn = Database().conn
        try:
            dataStore = (storeLogo, storeName, storeOwner, storeEmail, storeAddress, managerID)
            conn.cursor().execute('''
            INSERT INTO store (store_logo, store_name, store_owner, store_email, store_address, store_manager_id)
            VALUES (?, ?, ?, ?, ?, ?)
            ''', dataStore)
            conn.commit()
            return 'Inserted store record!'
        except Exception as e:
            conn.rollback()
            print(f'An error occurred: {e}')
        finally:
            conn.close()

    def getStoreInfo(self):
        conn = Database().conn
        data = conn.cursor().execute('SELECT * FROM store').fetchall()
        conn.close()
        # Define the keys for the dictionaries
        keys = ['id', 'image', 'store_name', 'owner_name', 'address', 'email', 'manager_id']
        # Convert list of tuples to list of dictionaries
        data_dicts = [dict(zip(keys, item)) for item in data]
        jsonData = []
        # Print the result
        for entry in data_dicts:
            jsonData.append(entry)
        return jsonData
    
    def deleteStore(self, store_delete_id):
        conn = Database().conn
        conn.cursor().execute('DELETE FROM store WHERE id = ?', (store_delete_id,))
        conn.commit()
    
    def viewStore(self, store_view_id):
        conn = Database().conn
        data = conn.cursor().execute('SELECT * FROM store WHERE id = ?', (store_view_id,)).fetchone()
        conn.commit()
        return data
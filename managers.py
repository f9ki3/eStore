from database import Database

class Manager():
    def getSelectManagers(self):
        conn = Database().conn
        data = conn.cursor().execute('SELECT id, manager_firstname, manager_lastname FROM manager').fetchall()
        conn.close()
        keys = ['id', 'manager_firstname', 'manager_lastname']
        jsonData = []
        data_dicts = [dict(zip(keys, item)) for item in data]
        for entry in data_dicts:
            jsonData.append(entry)
        return jsonData
import * as SQLite from 'expo-sqlite';

import Account from '../model/Account';

class Database {
    constructor() {
        this.db = SQLite.openDatabase('igmanager.db');
    }

    static getInstance() {
        if (!this.instance)
            this.instance = new Database();
        return this.instance;
    }

    async initialize() {
        return new Promise((resolve, reject) => {
            this.db.transaction(transaction => {
                transaction.executeSql(`
                    CREATE TABLE IF NOT EXISTS account (
                        id TEXT PRIMARY KEY NOT NULL,
                        username TEXT,
                        picture_url TEXT,
                        access_token TEXT
                    );`, 
                    [], () => resolve(),
                    (transaction, error) => reject(error));
            });
        });
    }

    async insertAccount(account) {
        return new Promise((resolve, reject) => {
            this.db.transaction(transaction => {
                transaction.executeSql(`
                    REPLACE INTO account (
                        id,
                        username,
                        picture_url,
                        access_token
                    ) VALUES (?, ?, ?, ?);`, [
                        account.id,
                        account.username,
                        account.pictureUrl,
                        account.accessToken
                    ], () => resolve(),
                    (transaction, error) => reject(error));
            });
        });
    }

    async loadAccounts() {
        return new Promise((resolve, reject) => {
            this.db.transaction(transaction => {
                transaction.executeSql(`
                    SELECT *
                    FROM account;`,
                    [], (transaction, resultSet) => resolve(convertAccountList(resultSet.rows._array)),
                    (transaction, error) => reject(error));
            });
        });
    }

    async removeAccount(account) {
        return new Promise((resolve, reject) => {
            this.db.transaction(transaction => {
                transaction.executeSql(`
                    DELETE FROM account
                    WHERE id = ?`, [account.id],
                    () => resolve(),
                    (transaction, error) => reject(error));
            });
        });
    }
}

function convertAccountList(dataList) {
    let output = [];
    for (let dataObject of dataList)
        output.push(convertAccount(dataObject));
    return output;
}

function convertAccount(dataObject) {
    return new Account(
        dataObject['id'],
        dataObject['username'],
        dataObject['picture_url'],
        dataObject['access_token']
    );
}

export default Database;
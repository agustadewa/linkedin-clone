import {db} from "/firebase";

const accountsDB = db.collection("accounts");

const addAccount = async ({uid, photoURL}) => await accountsDB.add({uid: uid, photoURL: photoURL});

const getAccount = async (accountID = "", setter) => {
  try {
    const account = await accountsDB.doc(accountID).get();
    setter(account.data());
  } catch (err) {
    return err;
  }
}

const getAccountsByUIDs = async (UIDs, setter) => {
  try {
    const fetchAccounts = await accountsDB.where("uid", "in", UIDs).get();
    fetchAccounts.docs.forEach((account, idx) => {
      setter(account.data(), idx);
    });
  } catch (err) {
    return err;
  }
}

export {getAccount, addAccount, getAccountsByUIDs}

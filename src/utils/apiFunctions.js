import shorthash from 'shorthash';
import mainServerApi from '../api/mainServerApi';
import * as firebase from 'firebase';

export const uploadDownloadUrlDB = (downloadURL, caption) => {
  return new Promise(async (resolve, reject) => {
    try {
      await mainServerApi.post(
        '/addNewPost',
        {
          caption,
          downloadURL,
          pid: shorthash.unique(downloadURL),
        },
        {
          headers: {
            Authorization: firebase.auth().currentUser.uid,
          },
        },
      );
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const getActivePosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await mainServerApi.get('/activePost', {
        headers: {
          Authorization: firebase.auth().currentUser.uid,
        },
      });
      resolve(resp.data.payload.posts);
    } catch (err) {
      console.log(err);
      reject();
    }
  });
};
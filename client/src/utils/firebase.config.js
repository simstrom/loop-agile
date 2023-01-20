import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

/**
 * Used to connect or firebase for image handling. From a security perspective it is not ideal
 * to store on client but easier and quicler for this assignment.
 */
const firebaseConfig = {
	apiKey: 'AIzaSyDd_EB4xHpIbv23N49ZFC5AMfCg3ix1Tu8',
	authDomain: 'loopagile.firebaseapp.com',
	projectId: 'loopagile',
	storageBucket: 'loopagile.appspot.com',
	messagingSenderId: '552664756432',
	appId: '1:552664756432:web:2acb4ddaa0194665ea6ed5',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;

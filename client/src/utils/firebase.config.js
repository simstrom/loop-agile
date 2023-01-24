import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.BUCKET,
	messagingSenderId: process.env.SENDER_ID,
	appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;

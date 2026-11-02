import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        const baseUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!baseUrl) {
            throw new Error('API_URL must be set in the .env file.');
        }

        super(baseUrl, apiKey ? { apiKey } : {});
    }
}

export default AppLoader;

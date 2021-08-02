/**
 * The main client for interacting with Ch1ll API.
*/
class Client {
    /**
     * @param {ClientOptions} options Options for the Ch1ll API client.
     */
    constructor(options = {}) {
        /**
         * The options for the Ch1ll API client.
         * @type {ClientOptions}
         */
        this.options = options;

        /**
         * The client's API Token for Ch1ll API.
         * @type {Token}
         */
        this.token = null;
    }

    /**
     * Logs the client in and connects to Ch1ll API.
     * @param {string} [token=this.token] API Token from the client to log into.
     * @returns {Promise<string>} API Token from the client.
     * @example
     * client.login('Ch1llAPIToken')
     */
    async login(token) {
        if (!token || typeof token !== 'string') {
            throw new Error("Uh oh! You didn't supply a token, or the token wasn't a string.");
        }

        try {
            // In the future, this will allow the user to log in.
            fetch(`https://ch1ll.dev/api/status`, { method: 'GET', headers: {} })
                .then(async response => {
                    if (response.status === 401) {
                        throw new Error('[Ch1ll API] Uh oh! While trying to fetch, we recived a status of 401 (Forbidden). Please try again later.');
                    }

                    if (response.status < 200 || response.status >= 300) {
                        return true;
                    } else if (response.status === 503) {
                        throw new Error('[Ch1ll API] Uh oh! While trying to fetch, we recived a status of 503 (). Please try again later.');
                    }
                }, async err => {
                    if (err.name === 'AbortError') {
                        throw new Error('[Ch1ll API] Uh oh! While trying to fetch, we recived AbortError. Please try again later.');
                    } else {
                        throw new Error(`[Ch1ll API] Uh oh! While trying to fetch, we recived an error. Please try again later. ${err}`);
                    }
                });

            return this.token;
        } catch (err) {
            this.logout();
            throw err;
        }
    }

    /**
     * Logs out and removes the client object.
     * @returns {void}
     */
    logout() {
        this.token = null;
    }
}

module.exports = Client;

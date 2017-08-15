import i18next from 'i18next';

import resBundle from 'i18next-resource-store-loader!./locales/index.js'; // eslint-disable-line

/**
 * LandsWarLocales is an handler for i18next.
 */
class LandsWarLocales {
	/**
	 * Initialize i18next.
	 * @return {Promise} A Promise.
	 */
	init() {
		return new Promise((resolve, reject) => {
			i18next.init({
				ns:          ['translations'],
				defaultNS:   'translations',
				lng:         'en',
				fallbackLng: 'en',
				debug:       true,
				resources:   resBundle,
			}, (error) => {
				if (error) {
					reject(error);
					return;
				}
				resolve();
			});
		});
	}

	/**
	 * Get the translation of the key.
	 * @param {String} key - The locale key.
	 * @return {String} The translation.
	 */
	t(key) {
		return i18next.t(key);
	}
}

export default new LandsWarLocales();

const apiUrl = "https://kontentmodelling.azurewebsites.net/api/ContentTypeNavigationV2";

import axios from "axios";

function getKontentModelInfo(projectId, apiKey) {
    let client = axios.create({
        baseURL: `${apiUrl}`,
        timeout: 100000,
        headers: { "Content-Type": "application/json", "X-Key": apiKey }
    });

    return client.post(`?code=ksmfaNyEUmnu0KVHanNpWH4wJqSWZvLCgSKaUduVpIfBIlqaml1WNQ==&projectId=${projectId}`);
}

export {
    getKontentModelInfo
}
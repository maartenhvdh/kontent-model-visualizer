import { ManagementClient } from '@kontent-ai/management-sdk';

async function getKontentModelInfo(projectId, apiKey) {
    
    const client = new ManagementClient({
      projectId: projectId,
      apiKey: apiKey
    });

    const response = await client.listContentTypes().toAllPromise();
    let result = [];
    for(let item of response.data.items) {
        console.log(item);
        let contentType = {
            codename: item.codename,
            id: item.id,
            name: item.name,
            elements: []
        };

        for(let el of item.elements) {
            let element = {
                codename: el.codename,
                type: el.type
            };
            
            if(el.name) element.name = el.name;
            if(el.is_required) element.required = el.is_required;

            if(el.type == "modular_content") {
                element.allowedTypes = [];

                for(let ael of el.allowed_content_types) {
                    let found = response.data.items.filter(i => i.id == ael.id);
                    if(found != null) {
                        element.allowedTypes.push({
                            id: found[0].id,
                            codename: found[0].codename,
                            name: found[0].name
                        });
                    }
                }
            }

            contentType.elements.push(element);
        }
        result.push(contentType);
    }
    return result;
}

export {
    getKontentModelInfo
}
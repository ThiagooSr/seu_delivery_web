import { Tenant } from "../types/Tenant";


export const useApi = () => ({

    getTenant: (tenantSlug: string): boolean | Tenant => {
        switch (tenantSlug) {
            case 'b7burger':
                return {
                    slug: 'b7burger',
                    name: 'B7burger',
                    mainColor: '#FF0000',
                    secondColor: '#00FFF0'
                }

                break;
            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7Pizza',
                    mainColor: '#0000FF',
                    secondColor: '#0000FF'
                }

            break;
            default: return false;
        }

        
    }

});
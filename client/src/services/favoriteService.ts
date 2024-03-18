import { startupsById } from "./startupService";
import { getCurrentUser, profile } from "./userAuthService";

export const favorites = async () => {
    const userStr = getCurrentUser();
    const token = userStr.token;
    const user: any = await profile();
    const response = await fetch(`http://localhost:8080/utilizadores/${user.id}/favoritos`, {
        method: 'GET', 
        headers: {
        'Content-Type': 'application/json', 
        'token': token,
        },
    });
    const data = await response.json();
    const startups = [];

    for (const item of data) {
        if (item.hasOwnProperty('id_startup')) {
            const startup = await startupsById(item.id_startup);
            startups.push(startup);
        }
    }
    
    return startups
};

export const addFavorite = async (startupId: number | string) => {
    const userStr = getCurrentUser();
    const token = userStr.token;
    const user: any = await profile();
    const response = await fetch(`http://localhost:8080/utilizadores/${user.id}/favoritos/${startupId}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            'token': token,
        },
        body: JSON.stringify({})
    });
    const data = await response.json();
    console.log(data)
};

export const deleteFavorite = async (startupId: number | string) => {
    const userStr = getCurrentUser();
    const token = userStr.token;
    const user: any = await profile();
    const response = await fetch(`http://localhost:8080/utilizadores/${user.id}/favoritos/${startupId}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json', 
            'token': token,
        },
        body: JSON.stringify({})
    });
    const data = await response.json();
    return data
};
import { getCurrentUser } from "./userAuthService";

export const startups = async () => {
    const userStr = getCurrentUser()
    const token = userStr.token;
    const response = await fetch('http://localhost:8080/startups', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
            'token': token,
        },
    });
    const data = await response.json();
    return data;
};


export const startupsById = async (id: string | number) => {
    const userStr = getCurrentUser()
    const token = userStr.token;
    const response = await fetch(`http://localhost:8080/startups/${id}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
            'token': token,
        },
    });
    const data = await response.json();
    return data;
};

export const addStartup = async (nome: string) => {
    const userStr = getCurrentUser();
    const token = userStr.token;
    const response = await fetch(`http://localhost:8080/startups`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            'token': token,
            'nome': nome
        },
        body: JSON.stringify({})
    });
    const data = await response.json();
    return data;
};

export const updateStartup = async (nome: string, id: string | number) => {
    const userStr = getCurrentUser();
    const token = userStr.token;
    const response = await fetch(`http://localhost:8080/startups/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json', 
            'token': token,
            'nome': nome
        },
        body: JSON.stringify({})
    });
    console.log(response)
    // const data = await response.json();
    // return data;
};

export const deleteStartup = async (startupId: number | string) => {
    const userStr = getCurrentUser();
    const token = userStr.token;
    const response = await fetch(`http://localhost:8080/startups/${startupId}`, {
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
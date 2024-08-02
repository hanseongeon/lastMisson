import { getAPI } from "./asiosApi";

export const UserApi = getAPI();
interface ArticleRq {
    title: string,
    content: string;
}
export const createArtcle = async (data: ArticleRq) => {

    const response = await UserApi.post('/api', data);
    return response.data;
};

export const getArtcle = async (page: number) => {

    const response = await UserApi.get('/api', {
        headers: {
            page: page
        }
    });
    return response.data;
};

export const updateArtcle = async (data:ArticleRq,id:number) => {

    const response = await UserApi.put('/api',data, {
        headers: {
            id:id
        }
    });
    return response.data;
};
export const deleteArtciel = async (id:number) => {

    const response = await UserApi.delete('/api', {
        headers: {
            id:id
        }
    });
    return response.data;
};

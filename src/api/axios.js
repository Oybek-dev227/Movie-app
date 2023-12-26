import axios from "axios";

export const apiRequest = async (endpoint, params) => {
    const options = {
        method: 'GET',
        //endpoint-bu '/movie/' yoki shunga uxshash narsalar
        url: endpoint,
        params: params ? params : {},
    };

    try {
        //surov yuborish
        const { data } = await axios.request(options);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

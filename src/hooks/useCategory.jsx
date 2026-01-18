import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const { data } = await axios.get('https://api-to2k.onrender.com/api/v1/category/categories');
            if (data.success) {
                setCategories(data?.category)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}
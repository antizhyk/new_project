import React, { useCallback, useState, Fragment, useEffect } from "react";
import {ColorPicker} from "@shopify/polaris";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";


export default function Products() {
    // Product fields
    const [color, setColor] = useState({
        hue: 0,
        brightness: 1,
        saturation: 1,
    });
    const handleChange = useCallback(setColor, []);


    const { success, error } = useLog();

    const handleTypeSelectChange = useCallback((type) => setType(type), []);

    const { id } = useParams();

    // Make a request to get product types
    const [typeOptions, setTypeOptions] = useState([]);

    useEffect(() => {
        async function fetchTypes() {
            const data = await axios.get("/api/product_type");
            const options = [];

            data.data.forEach((option) => {
                options.push({
                    label: option.name,
                    value: option.id.toString(),
                });
            });

            setTypeOptions(options);
            setType(options[0].value);
        }

        async function fetchProduct(id) {
            try {
                const product = (await axios.get(`/api/products/${id}`)).data;

                const hlv = convert.hex.hsv(product.color);

                const resColor = Object.assign({}, color);
                resColor.hue = hlv[0];
                resColor.saturation = hlv[1] / 100;
                resColor.brightness = hlv[2] / 100;

                setColor(resColor);
            } catch (e) {
                if (e.response.status === 404)
                    error("Product with the given id doesn't exist");
                else error("Failed to display this product");
                history.push("/");
            }
            setLoading(false);
        }

        async function fetch() {
            fetchTypes();
            fetchProduct(id);
        }

        fetch();
    }, []);

    // Submit handler
    async function saveProduct() {
        setLoading(true);
        const rgb = convert.hsv.hex(
            color.hue,
            color.saturation * 100,
            color.brightness * 100
        );

        setErrors([]);

        const options = { weight, price, name, type_id: type, color: rgb };

        try {
            const res = await axios({
                method: "put",
                url: `/api/products/${id}`,
                data: options,
            });
            success("Product has been saved!");
        } catch (e) {
            console.log(e.response);
            setErrors(e.response.data.errors);
        }
        setLoading(false);
    }

    async function deleteProduct() {
        setLoading(true);
        const res = await axios({
            method: "delete",
            url: `/api/products/${id}`,
        });
        success("Successfully deleted item");
        setRedirect(true);
        setLoading(false);
    }



    return (
                            <ColorPicker
                                onChange={handleChange}
                                color={color}
    );
}

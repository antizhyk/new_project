import React, { useState } from "react";
import { Button, Card, Form, FormLayout } from "@shopify/polaris";
import { PolarisFormBuilder } from "@additionapps/polaris-form-builder";
import { fields } from "./fields";

export const ValidationOnSubmitForm = () => {
    const [model, setModel] = useState({
        username: null,
        email: null
    });
    const [errors, setErrors] = useState({});
    const [focus, setFocus] = useState(null);

    const onSubmit = () => {
        setTimeout(() => {
            setFocus(null);
            setErrors({
                username: "This username is already taken"
            });
        }, 1000);
    };

    return (
        <Card title="Validation on submit">
            <Card.Section>
                <Form onSubmit={onSubmit}>
                    <FormLayout>
                        <PolarisFormBuilder
                            model={model}
                            fields={fields}
                            errors={errors}
                            focus={focus}
                            onModelUpdate={setModel}
                            onErrorUpdate={setErrors}
                            onFocusUpdate={setFocus}
                        />
                        <Button submit primary>
                            Submit
                        </Button>
                    </FormLayout>
                </Form>
            </Card.Section>
        </Card>
    );
};

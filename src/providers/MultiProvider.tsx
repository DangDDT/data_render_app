import React from "react";

type MultiProviderProps = {
    providers: React.ReactElement[];
    children: React.ReactNode;
}


const MultiProvider = ({ providers, children }: MultiProviderProps) => {
    if (!providers) {
        throw new Error("MultiProvider: Missing providers prop");
    }

    if (!children) {
        throw new Error("MultiProvider: Missing children prop");
    }

    let content = children;

    const numbersOfProviders = providers.length;


    if (!numbersOfProviders) {
        return content;
    }

    providers.forEach((provider) => {
        content = React.createElement(provider.type, provider.props, content);
    });

    return content;

}


export default MultiProvider;

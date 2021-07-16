module.exports = {

    // root path for the project structure
    roots: ["<rootDir>/src"],

    setupFilesAfterEnv: [
        "@testing-library/react/cleanup-after-each", //clean up components
        "@testing-library/jest-dom/extend-expect" //add special extended assertions to Jest
    ],

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "json"]
}
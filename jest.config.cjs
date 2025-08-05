module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.js$': 'babel-jest'
    },
    moduleFileExtensions: ['js', 'json', 'vue'],
    moduleNameMapper: {
        '^axios$': 'axios/dist/node/axios.cjs',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(png|jpg|jpeg|gif|webp|svg)$': 'jest-transform-stub'
    },
};

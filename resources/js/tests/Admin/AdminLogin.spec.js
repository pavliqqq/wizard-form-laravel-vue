import { flushPromises, mount } from "@vue/test-utils";
import router from "../../router.js";
import AdminLogin from "../../components/Admin/AdminLogin.vue";
import BaseInput from "../../components/UI/Form/BaseInput.vue";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

const mockCheckUser = jest.fn();
const mockShowErrors = jest.fn();
const mockClearErrors = jest.fn();

jest.mock("axios");

jest.mock("../../router.js", () => ({
    __esModule: true,
    default: {
        push: jest.fn(),
    },
}));

jest.mock("../../stores/errorStore.js", () => ({
    useErrorStore: () => ({
        errors: {},
        showErrors: mockShowErrors,
        clearErrors: mockClearErrors,
    }),
}));

jest.mock("../../stores/adminStore.js", () => ({
    useAdminStore: () => ({
        checkUser: mockCheckUser,
    }),
}));

describe("AdminLogin.vue", () => {
    let wrapper;
    beforeEach(() => {
        setActivePinia(createPinia());

        jest.clearAllMocks();

        wrapper = mount(AdminLogin, {
            global: defaultGlobal,
        });
    });

    const defaultGlobal = {
        stubs: { BaseInput: true },
    };

    it("renders login form", () => {
        const baseInputs = wrapper.findAllComponents(BaseInput);
        baseInputs.forEach((input) => {
            expect(input.exists()).toBe(true);
        });

        const expectedNames = ["email", "password"];

        const names = baseInputs.map((input) => input.props("name"));

        expectedNames.forEach((name) => {
            expect(names).toContain(name);
        });

        const submitButton = wrapper.find('[data-testid="submitButton"]');
        expect(submitButton.exists()).toBe(true);
    });

    it("logs in admin", async () => {
        const value = {
            email: "admin@example.com",
            password: "12345678",
        };
        wrapper.vm.Data = value;

        await wrapper.vm.login();
        await flushPromises();

        expect(axios.get).toHaveBeenCalledWith("/sanctum/csrf-cookie");
        expect(axios.post).toHaveBeenCalledWith("/api/login", value);
        expect(mockCheckUser).toHaveBeenCalled();
        const routePush = { name: "all.members" };
        expect(router.push).toHaveBeenCalledWith(routePush);
    });

    // it('error while logs in', async () => {
    //     const error = {
    //         response: {
    //             status:
    //         }
    //     }
    // })
});

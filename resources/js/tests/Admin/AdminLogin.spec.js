import {flushPromises, mount} from "@vue/test-utils";
import router from "../../router.js";
import AdminLogin from "../../components/Admin/AdminLogin.vue";
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

describe("Admin login form", () => {
    let wrapper;

    const defaultGlobal = {
        stubs: { BaseInput: true },
    };

    beforeEach(() => {
        setActivePinia(createPinia());

        jest.clearAllMocks();

        wrapper = mount(AdminLogin, {
            global: defaultGlobal,
        });
    });

    it("renders login form", () => {
        const componentNames = ['emailInput', 'passwordInput', 'submitButton'];

        componentNames.forEach((name) => {
            const component = wrapper.find(`[data-testid="${name}"]`);
            expect(component.exists()).toBe(true)
        })
    });

    it("redirects to members page after successful login", async () => {
        axios.get.mockResolvedValue({});
        axios.post.mockResolvedValue({ success: true });

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

    it('shows errors if login fails', async () => {
        const errors = {
            email: ["Email is required"],
        };

        axios.post.mockRejectedValue({
            response: { status: 422, data: { errors } },
        });

        await wrapper.vm.login();

        await flushPromises();

        expect(mockShowErrors).toHaveBeenCalledWith(errors);
    })
});

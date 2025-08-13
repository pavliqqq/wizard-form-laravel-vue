import {flushPromises, mount} from "@vue/test-utils";
import router from "../../router.js";
import LogoutButton from "../../components/Admin/LogoutButton.vue";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

const mockReset = jest.fn();

jest.mock("axios");

jest.mock("../../router.js", () => ({
    __esModule: true,
    default: {
        go: jest.fn(),
    },
}));

jest.mock("../../stores/adminStore.js", () => ({
    useAdminStore: () => ({
        reset: mockReset,
    }),
}));

describe("Logout button", () => {
    let wrapper, logoutButton;
    beforeEach(() => {
        setActivePinia(createPinia());

        jest.clearAllMocks();

        wrapper = mount(LogoutButton);
        logoutButton = wrapper.find('[data-testid="logoutButton"]')
    });

    it("renders logout button", () => {
        expect(logoutButton.exists()).toBe(true);
    });

    it("logs out user and refresh page", async () => {
        axios.get.mockResolvedValue({});
        axios.post.mockResolvedValue({ success: true });

        await logoutButton.trigger("click");

        await flushPromises();

        expect(axios.get).toHaveBeenCalledWith("/sanctum/csrf-cookie");
        expect(axios.post).toHaveBeenCalledWith("/api/logout", null);
        expect(mockReset).toHaveBeenCalled();

        expect(router.go).toHaveBeenCalledWith(0);
    });

    it("does not reset value and reload page on logout error", async() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        axios.post.mockRejectedValue(new Error("Network error"));

        await logoutButton.trigger("click");

        await flushPromises();

        expect(mockReset).not.toHaveBeenCalled();
        expect(router.go).not.toHaveBeenCalled();
    })
});

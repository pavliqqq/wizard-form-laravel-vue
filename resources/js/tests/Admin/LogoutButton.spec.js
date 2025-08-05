import { mount } from "@vue/test-utils";
import router from "../../router.js";
import LogoutButton from "../../components/Admin/LogoutButton.vue";
import { createPinia, setActivePinia } from "pinia";
import { nextTick } from "vue";
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

describe("LogoutButton.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia());

        jest.clearAllMocks();
    });

    it("renders logout button", () => {
        const wrapper = mount(LogoutButton);

        const button = wrapper.find('[data-testid="logoutButton"]');
        expect(button.exists()).toBe(true);
    });

    it("logs out user and reloads page on success", async () => {
        const wrapper = mount(LogoutButton);

        const button = wrapper.find('[data-testid="logoutButton"]');
        await button.trigger("click");

        await nextTick();

        expect(axios.get).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalled();
        expect(mockReset).toHaveBeenCalled();
        expect(router.go).toHaveBeenCalled();
    });
});

import { mount } from "@vue/test-utils";
import router from "../../../router.js";
import ThirdStep from "../../../components/Form/Pages/ThirdStep.vue";
import axios from "axios";

jest.mock("axios");

jest.mock("../../../router.js", () => ({
    __esModule: true,
    default: {
        go: jest.fn(),
        push: jest.fn(),
    },
}));

describe("ThirdStep.vue", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        axios.get.mockResolvedValue({
            data: {
                facebookUrl: "fb/url",
                twitterUrl: "tw/url",
            },
        });
    });

    it("renders third step of form", async () => {
        const wrapper = mount(ThirdStep);

        const links = ["facebookLink", "twitterLink", "allMembersLink"];
        links.forEach((link) => {
            const found = wrapper.findAll(`[data-testid=${link}]`);
            expect(found.length).toBeGreaterThan(0);
        });

        const startOverButton = wrapper.find('[data-testid="startOver"]');
        expect(startOverButton.exists()).toBe(true);
    });

    it("starts over when click startOver button", () => {
        const wrapper = mount(ThirdStep);

        const localStorageSpy = jest.spyOn(
            window.localStorage.__proto__,
            "clear",
        );

        wrapper.vm.startOver();

        expect(localStorageSpy).toHaveBeenCalled();
        expect(router.go).toHaveBeenCalledWith(0);
    });

    it("goes to allMembers", () => {
        const wrapper = mount(ThirdStep);

        wrapper.vm.goToAllMembers();

        const routePush = { name: "all.members" };
        expect(router.push).toHaveBeenCalledWith(routePush);
    });
});

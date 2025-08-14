import {flushPromises, mount} from "@vue/test-utils";
import router from "../../../router.js";
import ThirdStep from "../../../components/Form/Pages/ThirdStep.vue";
import axios from "axios";
import {renderElementsCheck} from "../../helpers/renderHelpers.js";

jest.mock("axios");

const mockFacebookUrl = "fb/url";
const mockTwitterUrl = "tw/url";
jest.mock("../../../router.js", () => ({
    __esModule: true,
    default: {
        go: jest.fn(),
        push: jest.fn(),
    },
}));

describe("Third step of main form", () => {
    let wrapper, getMock;
    beforeEach(async () => {
        jest.clearAllMocks();

        getMock = axios.get.mockResolvedValue({
            data: {
                facebookUrl: mockFacebookUrl,
                twitterUrl: mockTwitterUrl,
            },
        });
        wrapper = mount(ThirdStep);
        await flushPromises();
    });

    it("renders third step of form", async () => {
        const links = ["facebookLink", "twitterLink", "allMembersLink"];
        renderElementsCheck(links, wrapper);

        const startOverButton = wrapper.find('[data-testid="startOver"]');
        expect(startOverButton.exists()).toBe(true);
    });

    it("sets correct links for facebook and twitter", async () => {
        const facebookLink = wrapper.find('[data-testid="facebookLink"]')
        const twitterLink = wrapper.find('[data-testid="twitterLink"]')

        expect(facebookLink.attributes('href')).toBe(mockFacebookUrl);
        expect(twitterLink.attributes('href')).toBe(mockTwitterUrl);
    });

    it("proceeds to first step and resets form when button is clicked", async() => {
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, "clear");

        const startOverButton = wrapper.find('[data-testid="startOver"]');
        startOverButton.trigger('click');

        expect(localStorageSpy).toHaveBeenCalled();
        expect(router.go).toHaveBeenCalledWith(0);
    });

    it("proceeds to members table when the link is clicked", () => {
        const allMembersLink = wrapper.find('[data-testid="allMembersLink"]');
        allMembersLink.trigger('click');

        const routePush = { name: "all.members" };
        expect(router.push).toHaveBeenCalledWith(routePush);
    });

    it("does not set social links if request fails", async () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        getMock.mockRejectedValue(new Error("Network error"));

        wrapper = mount(ThirdStep);
        await flushPromises();

        expect(getMock).toHaveBeenCalledWith("/api/members/share");
        expect(wrapper.vm.facebookUrl).toBeFalsy();
        expect(wrapper.vm.twitterUrl).toBeFalsy();
    })
});

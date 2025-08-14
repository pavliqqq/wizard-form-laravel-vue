import {flushPromises, mount} from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import SecondStep from "../../../components/Form/Pages/SecondStep.vue";
import {renderElementsCheck} from "../../helpers/renderHelpers.js";

jest.mock("axios");
const mockUpdate = jest.fn();
describe("Second step of main form", () => {
    const defaultGlobal = {
        stubs: {
            BaseInput: true,
            BaseTextArea: true,
            FileInput: true,
        },
    };

    const testData = {
        id: 11,
        company: "Test company",
        position: "Manager",
        aboutMe: "Something about me",
        photo: null,
    };

    let wrapper;
    beforeEach(() => {
        setActivePinia(createPinia());
        jest.clearAllMocks();
        localStorage.clear();

        wrapper = mount(SecondStep, {
            props: { update: mockUpdate, errors: {} },
            global: defaultGlobal,
        });
    });

    it("renders second step of form", () => {
        const components = [
            'companyInput', 'positionInput',
            'aboutMeInput', 'photoInput'
        ];

        renderElementsCheck(components, wrapper);

        const nextButton = wrapper.find('[data-testid="nextButton"]');
        const backButton = wrapper.find('[data-testid="backButton"]');

        expect(nextButton.exists()).toBe(true);
        expect(backButton.exists()).toBe(true);
    });

    it("restores previously saved data from localStorage on mount",() => {
        localStorage.setItem("secondStep", JSON.stringify(testData));

        wrapper = mount(SecondStep, {
            props: { update: mockUpdate, errors: {} },
            global: defaultGlobal,
        });

        expect(wrapper.vm.Data).toEqual(testData);
    });

    it("returns to the previous step when back button is clicked", async () => {
        const backButton = wrapper.find('[data-testid="backButton"]');
        await backButton.trigger('click');

        expect(wrapper.emitted("prev")).toBeTruthy();
    });

    it("proceeds to next step when form submission succeeds", async () => {
        const count = 42;

        mockUpdate.mockResolvedValue({ data: { count: count } });
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, "setItem");

        wrapper = mount(SecondStep, {
            props: { update: mockUpdate, errors: {} },
            global: defaultGlobal,
        });

        await flushPromises();

        const data = wrapper.vm.Data;

        const nextButton = wrapper.find('[data-testid="nextButton"]');
        await nextButton.trigger('click');

        expect(localStorageSpy).toHaveBeenCalledWith("secondStep", JSON.stringify(data));
        expect(mockUpdate).toHaveBeenCalledWith(data);
        expect(localStorageSpy).toHaveBeenCalledWith("count", count);
        expect(wrapper.emitted("next")).toBeTruthy();
    });

    it("does not proceed to next step if update request fails", async () => {
        const count = 42;
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, "setItem");

        wrapper = mount(SecondStep, {
            props: { update: mockUpdate, errors: {} },
            global: defaultGlobal,
        });

        await flushPromises();

        const data = wrapper.vm.Data;

        jest.spyOn(console, "error").mockImplementation(() => {});

        mockUpdate.mockRejectedValue(new Error("Network error"));

        const nextButton = wrapper.find('[data-testid="nextButton"]');
        await nextButton.trigger('click');

        expect(localStorageSpy).toHaveBeenCalledWith("secondStep", JSON.stringify(data));
        expect(mockUpdate).toHaveBeenCalledWith(data);
        expect(localStorageSpy).not.toHaveBeenCalledWith("count", count);
        expect(wrapper.emitted("next")).toBeFalsy();
    });
});

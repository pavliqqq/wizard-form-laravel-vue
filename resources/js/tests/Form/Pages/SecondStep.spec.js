import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import SecondStep from "../../../components/Form/Pages/SecondStep.vue";
import BaseInput from "../../../components/UI/Form/BaseInput.vue";
import BaseTextArea from "../../../components/UI/Form/BaseTextArea.vue";
import FileInput from "../../../components/UI/Form/FileInput.vue";

jest.mock("axios");

describe("SecondStep.vue", () => {
    const defaultGlobal = {
        stubs: {
            BaseInput: true,
            BaseTextArea: true,
            FileInput: true,
        },
    };

    const saved = {
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
            props: { errors: {} },
            global: defaultGlobal,
        });
    });

    it("renders second step of form", async () => {
        const components = [BaseInput, BaseTextArea, FileInput];
        components.forEach((component) => {
            const found = wrapper.findAllComponents(component);
            expect(found.length).toBeGreaterThan(0);
        });

        const nextButton = wrapper.find('[data-testid="nextButton"]');
        expect(nextButton.exists()).toBe(true);
        const backButton = wrapper.find('[data-testid="backButton"]');
        expect(backButton.exists()).toBe(true);
    });

    it("stores data in localStorage", async () => {
        localStorage.setItem("secondStep", JSON.stringify(saved));

        const wrapper = mount(SecondStep, {
            props: { errors: {} },
            global: defaultGlobal,
        });

        expect(wrapper.vm.Data).toEqual(saved);
    });

    it("sumbits form", async () => {
        localStorage.setItem("secondStep", JSON.stringify(saved));

        const count = 42;
        const mockUpdate = jest.fn().mockResolvedValue({ data: { count: count } });
        const localStorageSpy = jest.spyOn(
            window.localStorage.__proto__,
            "setItem",
        );

        const wrapper = mount(SecondStep, {
            props: { update: mockUpdate, errors: {} },
            global: defaultGlobal,
        });

        const data = {
            ...wrapper.vm.Data,
        };

        await wrapper.vm.submitService.submit();

        expect(mockUpdate).toHaveBeenCalledWith(data);
        expect(localStorageSpy).toHaveBeenCalledWith("count", count);
        expect(wrapper.emitted("next")).toBeTruthy();
    });
});

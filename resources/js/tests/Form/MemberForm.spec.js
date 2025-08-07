import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import FirstStep from "../../components/Form/Pages/FirstStep.vue";
import SecondStep from "../../components/Form/Pages/SecondStep.vue";
import ThirdStep from "../../components/Form/Pages/ThirdStep.vue";
import MemberForm from "../../components/Form/MemberForm.vue";
import axios from "axios";
import * as requestHelpers from "../../helpers/request";

const mockClearErrors = jest.fn();
const mockShowErrors = jest.fn();

jest.mock("axios");

jest.mock("../../stores/errorStore.js", () => ({
    useErrorStore: () => ({
        errors: {},
        clearErrors: mockClearErrors,
        showErrors: mockShowErrors,
    }),
}));

describe("MemberForm.vue", () => {
    const defaultGlobal = {
        stubs: {
            FirstStep: true,
            SecondStep: true,
            ThirdStep: true,
        },
    };

    let wrapper;
    beforeEach(() => {
        setActivePinia(createPinia());
        jest.clearAllMocks();
        localStorage.clear();

        wrapper = mount(MemberForm, { global: defaultGlobal });
    });

    it("renders FirstStep by default", () => {
        expect(wrapper.findComponent(FirstStep).exists()).toBe(true);
    });

    const steps = [FirstStep, SecondStep, ThirdStep];

    it("reads current step from localStorage on mount", async () => {
        for (let index = 0; index < steps.length; index++) {
            localStorage.setItem("currentStep", index);
            const wrapper = mount(MemberForm, { global: defaultGlobal });

            await flushPromises();

            expect(wrapper.findComponent(steps[index]).exists()).toBe(true);

            wrapper.unmount();
            localStorage.clear();
        }
    });

    it("goes to next step on next event", async () => {
        for (let index = 0; index < steps.length - 1; index++) {
            expect(wrapper.vm.currentIndex).toBe(index);
            await wrapper.findComponent(steps[index]).vm.$emit("next");

            expect(mockClearErrors).toHaveBeenCalled();
            expect(wrapper.vm.currentIndex).toBe(index + 1);
        }
    });

    it("goes to prev step on prev event", async () => {
        const index = 1;
        localStorage.setItem("currentStep", index.toString());

        const wrapper = mount(MemberForm, { global: defaultGlobal });

        expect(wrapper.vm.currentIndex).toBe(index);

        await flushPromises();

        await wrapper.findComponent(steps[index]).vm.$emit("prev");

        expect(mockClearErrors).toHaveBeenCalled();
        expect(wrapper.vm.currentIndex).toBe(index - 1);
    });

    it("updates member", async () => {
        const mockAppend = jest.fn();
        const fakeForm = { append: mockAppend };
        jest.spyOn(requestHelpers, "createFormData").mockReturnValue(fakeForm);

        const returnValue = { data: { status: "success" } };
        axios.post = jest.fn().mockResolvedValue(returnValue);

        const data = {
            id: 123,
            firstName: "Peter",
            lastName: "Parker",
        };

        const res = await wrapper.vm.update(data);

        expect(res).toBe(returnValue);
        expect(mockAppend).toHaveBeenCalledWith("_method", "patch");
        expect(axios.post).toHaveBeenCalledWith(
            `/api/members/${data.id}`,
            fakeForm,
        );
    });
});

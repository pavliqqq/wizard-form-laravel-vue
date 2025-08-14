import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import MemberForm from "../../components/Form/MemberForm.vue";
import axios from "axios";
import {nextTick} from "vue";
import {mockFormData} from "../helpers/mockHelpers.js";

const mockClearErrors = jest.fn();
const mockShowErrors = jest.fn();

jest.mock("axios");

jest.mock("../../stores/errorStore.js", () => ({
    useErrorStore: () => ({
        clearErrors: mockClearErrors,
        showErrors: mockShowErrors,
    }),
}));

describe("Member form", () => {
    const defaultGlobal = {
        global: {
            stubs: {
                FirstStep: true,
                SecondStep: true,
                ThirdStep: true
            },
        },
    };

    const testData = {
        id: 123,
        firstName: "Peter",
        lastName: "Parker",
    };

    let wrapper;
    beforeEach(() => {
        setActivePinia(createPinia());
        jest.clearAllMocks();
        localStorage.clear();

        wrapper = mount(MemberForm, defaultGlobal);
    });

    it("renders first step of form by default", () => {
        expect(wrapper.find('[data-testid="firstStep"]').exists()).toBe(true);
    });

    const steps = ['firstStep', 'secondStep', 'thirdStep'];

    it("restores last active step when component mounts", async () => {
        for (let index = 0; index < steps.length; index++) {
            localStorage.setItem("currentStep", index);
            const wrapper = mount(MemberForm, defaultGlobal);

            await nextTick();

            expect(wrapper.find(`[data-testid="${steps[index]}"]`).exists()).toBe(true);

            wrapper.unmount();
            localStorage.clear();
        }
    });

    it("goes to the next step when next event is triggered", async () => {
        for (let index = 0; index < steps.length - 1; index++) {
            expect(wrapper.vm.currentIndex).toBe(index);

            wrapper.vm.nextStep();
            await nextTick();

            expect(mockClearErrors).toHaveBeenCalled();
            expect(wrapper.vm.currentIndex).toBe(index + 1);
        }
    });

    it("returns to the previous step when prev event is triggered", async () => {
        const index = 1;
        localStorage.setItem("currentStep", index.toString());

        const wrapper = mount(MemberForm, defaultGlobal);

        expect(wrapper.vm.currentIndex).toBe(index);

        wrapper.vm.prevStep();
        await nextTick();

        expect(mockClearErrors).toHaveBeenCalled();
        expect(wrapper.vm.currentIndex).toBe(index - 1);
    });

    it("updates member", async () => {
        const { mockAppend, fakeForm, formDataSpy } = mockFormData(jest);

        axios.post.mockResolvedValue({ data: { status: "success" } });

        await wrapper.vm.update(testData);

        expect(formDataSpy).toHaveBeenCalledWith(testData);
        expect(mockAppend).toHaveBeenCalledWith("_method", "patch");
        expect(axios.post).toHaveBeenCalledWith(`/api/members/${testData.id}`, fakeForm);
    });

    it("does not update member if updating fails", async () => {
        const errors = {
            email: ["Email is required"],
        };

        axios.post.mockRejectedValue({
            response: { status: 422, data: { errors } },
        });

        const { mockAppend, fakeForm, formDataSpy } = mockFormData(jest);

        await wrapper.vm.update(testData);

        expect(formDataSpy).toHaveBeenCalledWith(testData);
        expect(mockAppend).toHaveBeenCalledWith("_method", "patch");
        expect(axios.post).toHaveBeenCalledWith(`/api/members/${testData.id}`, fakeForm);
        expect(mockShowErrors).toHaveBeenCalledWith(errors);
    })
});

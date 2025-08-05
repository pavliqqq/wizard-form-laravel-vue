import { mount } from "@vue/test-utils";
import FileInput from "../../../components/UI/Form/FileInput.vue";
import { createPinia, setActivePinia } from "pinia";

const mockShowErrors = jest.fn();
const mockClearErrors = jest.fn();

jest.mock("../../../stores/errorStore.js", () => ({
    useErrorStore: () => ({
        errors: {},
        showErrors: mockShowErrors,
        clearErrors: mockClearErrors,
    }),
}));

describe("FileInput.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia());

        jest.clearAllMocks();
    });

    const defaultProps = {
        name: "photo",
        modelValue: null,
        maxSizeKb: 500,
    };

    it("renders input element with correct attributes", () => {
        const wrapper = mount(FileInput, {
            props: defaultProps,
        });

        const input = wrapper.find("input");

        expect(input.exists()).toBe(true);
        expect(input.attributes("name")).toBe(defaultProps.name);
    });

    it("emits update:modelValue on input", async () => {
        const wrapper = mount(FileInput, {
            props: defaultProps,
        });

        const file = new File([new Uint8Array(300 * 1024)], "test.jpg", {
            type: "image/jpeg",
        });

        const input = wrapper.find("input");

        Object.defineProperty(input.element, "files", {
            value: [file],
        });

        await input.trigger("change");

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")[0]).toEqual([file]);
    });

    it("shows error when file size exceeds maxSizeKb", async () => {
        const wrapper = mount(FileInput, {
            props: defaultProps,
        });

        const file = new File([new Uint8Array(700 * 1024)], "test.jpg", {
            type: "image/jpeg",
        });

        const input = wrapper.find("input");

        Object.defineProperty(input.element, "files", {
            value: [file],
        });

        await input.trigger("change");

        expect(mockShowErrors).toBeCalledWith(
            expect.objectContaining({
                [defaultProps.name]: [
                    `File must be less than ${defaultProps.maxSizeKb}Kb`,
                ],
            }),
        );
    });
});

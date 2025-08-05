import { mount } from "@vue/test-utils";
import MemberRowEdit from "../../../components/UI/Form/MemberRowEdit.vue";
import BaseInput from "../../../components/UI/Form/BaseInput.vue";
import FileInput from "../../../components/UI/Form/FileInput.vue";

describe("MemberRowEdit.vue", () => {
    const defaultProps = {
        memberId: 10,
        memberPhoto: "photo/test.jpg",
        photo: null,
        photoPreview: null,
        fullName: "David Test",
        reportSubject: "Test subject",
        email: "test@example.com",
        errors: {},
    };

    const defaultGlobal = {
        stubs: {
            BaseInput: true,
            FileInput: true,
        },
    };

    it("renders all editable inputs and buttons", async () => {
        const wrapper = mount(MemberRowEdit, {
            props: defaultProps,
            global: defaultGlobal,
        });
        await wrapper.vm.$nextTick();

        const baseInputs = wrapper.findAllComponents(BaseInput);
        baseInputs.forEach((input) => {
            expect(input.exists()).toBe(true);
        });

        const modelValues = baseInputs.map((input) =>
            input.props("modelValue"),
        );
        expect(modelValues).toContain(defaultProps.fullName);
        expect(modelValues).toContain(defaultProps.reportSubject);
        expect(modelValues).toContain(defaultProps.email);

        const fileInput = wrapper.findComponent(FileInput);
        expect(fileInput.exists()).toBe(true);
        expect(fileInput.props("modelValue")).toBe(defaultProps.photo);

        const updateButton = wrapper.find('[data-testid="updateButton"]');
        expect(updateButton.exists()).toBe(true);

        const cancelButton = wrapper.find('[data-testid="cancelButton"]');
        expect(cancelButton.exists()).toBe(true);
    });

    it("renders img with photoPreview if provided", () => {
        const photoPreview = "photoPreview.jpg";

        const wrapper = mount(MemberRowEdit, {
            props: {
                ...defaultProps,
                photoPreview,
            },
            global: defaultGlobal,
        });

        const img = wrapper.find('[data-testid="photo-img"]');
        expect(img.attributes("src")).toBe(photoPreview);
    });

    it("emits update:photo", async () => {
        const wrapper = mount(MemberRowEdit, {
            props: defaultProps,
            global: defaultGlobal,
        });

        const file = new File([new Uint8Array(300 * 1024)], "test.jpg", {
            type: "image/jpeg",
        });

        const fileInput = wrapper.findComponent(FileInput);
        expect(fileInput.exists()).toBe(true);

        await fileInput.vm.$emit("update:modelValue", file);

        expect(wrapper.emitted("update:photo")).toBeTruthy();
    });

    it("emits update:fullName, update:reportSubject, update:email", async () => {
        const wrapper = mount(MemberRowEdit, {
            props: defaultProps,
            global: defaultGlobal,
        });

        const emittedValues = {
            full_name: { event: "update:fullName", value: "Updated Name" },
            report_subject: {
                event: "update:reportSubject",
                value: "Updated Subject",
            },
            email: { event: "update:email", value: "updated@example.com" },
        };

        const baseInputs = wrapper.findAllComponents(BaseInput);

        for (const input of baseInputs) {
            const name = input.props("name");
            const config = emittedValues[name];

            expect(config).toBeTruthy();

            await input.vm.$emit("update:modelValue", config.value);

            expect(wrapper.emitted(config.event)).toBeTruthy();
            expect(wrapper.emitted(config.event)[0]).toEqual([config.value]);
        }
    });

    it("emits update with memberId when update button is clicked", async () => {
        const wrapper = mount(MemberRowEdit, {
            props: defaultProps,
            global: defaultGlobal,
        });

        const updateButton = wrapper.find('[data-testid="updateButton"]');
        expect(updateButton.exists()).toBe(true);

        await updateButton.trigger("click");

        expect(wrapper.emitted("update")).toBeTruthy();
        expect(wrapper.emitted("update")[0]).toEqual([defaultProps.memberId]);
    });
});
